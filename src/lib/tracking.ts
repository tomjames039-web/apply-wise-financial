/**
 * Client-side Tracking Utilities
 * Captures UTM parameters and referrer for lead attribution
 */

export interface TrackingData {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrer: string | null;
}

/**
 * Get UTM parameters from current URL
 */
export function getUTMParams(): Omit<TrackingData, 'referrer'> {
  if (typeof window === 'undefined') {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
  };
}

/**
 * Get the referring URL
 */
export function getReferrer(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return document.referrer || null;
}

/**
 * Get all tracking data for form submissions
 */
export function getTrackingData(): TrackingData {
  const utm = getUTMParams();
  return {
    ...utm,
    referrer: getReferrer(),
  };
}

/**
 * Store tracking data in sessionStorage (persist across page navigations)
 */
export function storeTrackingData(): void {
  if (typeof window === 'undefined') return;

  // Only store if we have UTM params (don't overwrite on subsequent page views)
  const existing = sessionStorage.getItem('trackingData');
  if (existing) return;

  const tracking = getTrackingData();

  // Only store if we have at least one UTM param
  if (tracking.utmSource || tracking.utmMedium || tracking.utmCampaign || tracking.referrer) {
    sessionStorage.setItem('trackingData', JSON.stringify(tracking));
  }
}

/**
 * Get stored tracking data (combines current URL params with stored data)
 */
export function getStoredTrackingData(): TrackingData {
  if (typeof window === 'undefined') {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      referrer: null,
    };
  }

  // First check current URL for UTM params
  const currentParams = getUTMParams();
  const currentReferrer = getReferrer();

  // Then check sessionStorage for previously stored params
  const stored = sessionStorage.getItem('trackingData');
  const storedData: TrackingData = stored ? JSON.parse(stored) : {};

  // Merge: current URL params take precedence, fall back to stored
  return {
    utmSource: currentParams.utmSource || storedData.utmSource || null,
    utmMedium: currentParams.utmMedium || storedData.utmMedium || null,
    utmCampaign: currentParams.utmCampaign || storedData.utmCampaign || null,
    referrer: currentReferrer || storedData.referrer || null,
  };
}
