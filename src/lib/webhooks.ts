/**
 * Webhook Integration for Apply Wise Financial
 * Sends lead data to external CRM systems
 */

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  events: ('enquiry.created' | 'enquiry.updated' | 'enquiry.completed')[];
  enquiryTypes: ('self-employed' | 'bad-credit' | 'btl' | 'equity-release' | 'all')[];
  headers?: Record<string, string>;
  format: 'json' | 'form' | 'hubspot' | 'salesforce' | 'zapier' | 'gohighlevel';
  createdAt: string;
  lastTriggered?: string;
  lastStatus?: 'success' | 'failed';
  failureCount?: number;
}

export interface WebhookPayload {
  event: 'enquiry.created' | 'enquiry.updated' | 'enquiry.completed';
  timestamp: string;
  enquiry: {
    id: string;
    type: string;
    priority: string;
    status: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    details: Record<string, unknown>;
    submittedAt: string;
  };
  source: {
    website: string;
    page: string;
  };
}

export interface WebhookResult {
  webhookId: string;
  success: boolean;
  statusCode?: number;
  error?: string;
  responseTime?: number;
}

// In-memory webhook storage (would be database in production)
const webhookStore: Map<string, WebhookConfig> = new Map();

// Default webhook configurations for common CRMs
const DEFAULT_WEBHOOK_TEMPLATES: Partial<WebhookConfig>[] = [
  {
    name: 'GoHighLevel (GHL)',
    format: 'gohighlevel',
    events: ['enquiry.created'],
    enquiryTypes: ['all'],
    headers: {
      'Content-Type': 'application/json',
    },
  },
  {
    name: 'Zapier Webhook',
    format: 'zapier',
    events: ['enquiry.created'],
    enquiryTypes: ['all'],
  },
  {
    name: 'HubSpot Contact',
    format: 'hubspot',
    events: ['enquiry.created'],
    enquiryTypes: ['all'],
    headers: {
      'Content-Type': 'application/json',
    },
  },
  {
    name: 'Salesforce Lead',
    format: 'salesforce',
    events: ['enquiry.created'],
    enquiryTypes: ['all'],
  },
  {
    name: 'Custom JSON Webhook',
    format: 'json',
    events: ['enquiry.created', 'enquiry.updated', 'enquiry.completed'],
    enquiryTypes: ['all'],
  },
];

/**
 * Generate unique webhook ID
 */
function generateWebhookId(): string {
  return `wh_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Format payload for specific CRM
 */
function formatPayload(config: WebhookConfig, payload: WebhookPayload): unknown {
  const { enquiry } = payload;

  switch (config.format) {
    case 'hubspot':
      // HubSpot contact/deal format
      return {
        properties: {
          email: enquiry.customerEmail,
          firstname: enquiry.customerName.split(' ')[0],
          lastname: enquiry.customerName.split(' ').slice(1).join(' ') || '',
          phone: enquiry.customerPhone,
          hs_lead_status: 'NEW',
          lead_source: 'Website',
          enquiry_type: enquiry.type,
          enquiry_priority: enquiry.priority,
          enquiry_id: enquiry.id,
          ...Object.fromEntries(
            Object.entries(enquiry.details)
              .filter(([_, v]) => v !== null && v !== undefined)
              .map(([k, v]) => [`enquiry_${k.toLowerCase().replace(/\s+/g, '_')}`, String(v)])
          ),
        },
      };

    case 'salesforce':
      // Salesforce lead format
      return {
        FirstName: enquiry.customerName.split(' ')[0],
        LastName: enquiry.customerName.split(' ').slice(1).join(' ') || enquiry.customerName,
        Email: enquiry.customerEmail,
        Phone: enquiry.customerPhone,
        LeadSource: 'Website',
        Status: 'New',
        Company: 'Individual',
        Description: `Enquiry Type: ${enquiry.type}\nPriority: ${enquiry.priority}\n\n${
          Object.entries(enquiry.details)
            .filter(([_, v]) => v !== null && v !== undefined)
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n')
        }`,
        Enquiry_ID__c: enquiry.id,
        Enquiry_Type__c: enquiry.type,
        Priority__c: enquiry.priority,
      };

    case 'gohighlevel':
      // GoHighLevel contact format
      // GHL expects specific field names for contact creation
      const nameParts = enquiry.customerName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Map enquiry type to GHL tags
      const typeTagMap: Record<string, string> = {
        'self-employed': 'Self-Employed Mortgage',
        'bad-credit': 'Bad Credit Mortgage',
        'btl': 'Buy-to-Let',
        'equity-release': 'Equity Release',
      };

      return {
        // Standard GHL contact fields
        firstName,
        lastName,
        name: enquiry.customerName,
        email: enquiry.customerEmail,
        phone: enquiry.customerPhone,
        // Source tracking
        source: 'Apply Wise Website',
        // Tags for segmentation
        tags: [
          typeTagMap[enquiry.type] || enquiry.type,
          `Priority: ${enquiry.priority}`,
          'Website Lead',
        ],
        // Custom fields - these map to GHL custom fields
        customField: {
          enquiry_id: enquiry.id,
          enquiry_type: enquiry.type,
          priority: enquiry.priority,
          submitted_at: enquiry.submittedAt,
          source_page: payload.source.page,
          // Include all enquiry details as custom fields
          ...Object.fromEntries(
            Object.entries(enquiry.details)
              .filter(([_, v]) => v !== null && v !== undefined)
              .map(([k, v]) => [k.replace(/([A-Z])/g, '_$1').toLowerCase(), String(v)])
          ),
        },
        // Notes for the contact
        notes: `New ${typeTagMap[enquiry.type] || enquiry.type} enquiry from website.\n\nPriority: ${enquiry.priority}\nEnquiry ID: ${enquiry.id}\n\nDetails:\n${
          Object.entries(enquiry.details)
            .filter(([_, v]) => v !== null && v !== undefined)
            .map(([k, v]) => `• ${k.replace(/([A-Z])/g, ' $1').trim()}: ${v}`)
            .join('\n')
        }`,
      };

    case 'zapier':
      // Zapier-friendly flat format
      return {
        event: payload.event,
        timestamp: payload.timestamp,
        enquiry_id: enquiry.id,
        enquiry_type: enquiry.type,
        priority: enquiry.priority,
        status: enquiry.status,
        customer_name: enquiry.customerName,
        customer_email: enquiry.customerEmail,
        customer_phone: enquiry.customerPhone,
        submitted_at: enquiry.submittedAt,
        source_website: payload.source.website,
        source_page: payload.source.page,
        ...Object.fromEntries(
          Object.entries(enquiry.details)
            .filter(([_, v]) => v !== null && v !== undefined)
            .map(([k, v]) => [k.toLowerCase().replace(/\s+/g, '_'), v])
        ),
      };

    case 'form':
      // URL-encoded form data
      const formData = new URLSearchParams();
      formData.append('event', payload.event);
      formData.append('enquiry_id', enquiry.id);
      formData.append('customer_name', enquiry.customerName);
      formData.append('customer_email', enquiry.customerEmail);
      formData.append('customer_phone', enquiry.customerPhone);
      formData.append('enquiry_type', enquiry.type);
      formData.append('priority', enquiry.priority);
      Object.entries(enquiry.details)
        .filter(([_, v]) => v !== null && v !== undefined)
        .forEach(([k, v]) => formData.append(k, String(v)));
      return formData.toString();

    case 'json':
    default:
      // Full JSON payload
      return payload;
  }
}

/**
 * Send webhook request
 */
async function sendWebhookRequest(
  config: WebhookConfig,
  payload: WebhookPayload
): Promise<WebhookResult> {
  const startTime = Date.now();

  try {
    const formattedPayload = formatPayload(config, payload);
    const isForm = config.format === 'form';

    const headers: Record<string, string> = {
      'User-Agent': 'ApplyWise-Webhook/1.0',
      ...(config.headers || {}),
    };

    if (!isForm) {
      headers['Content-Type'] = 'application/json';
    } else {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    const response = await fetch(config.url, {
      method: 'POST',
      headers,
      body: isForm ? formattedPayload as string : JSON.stringify(formattedPayload),
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      return {
        webhookId: config.id,
        success: false,
        statusCode: response.status,
        error: `HTTP ${response.status}: ${response.statusText}`,
        responseTime,
      };
    }

    return {
      webhookId: config.id,
      success: true,
      statusCode: response.status,
      responseTime,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      webhookId: config.id,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      responseTime,
    };
  }
}

/**
 * Trigger webhooks for an event
 */
export async function triggerWebhooks(
  event: 'enquiry.created' | 'enquiry.updated' | 'enquiry.completed',
  enquiry: {
    id: string;
    type: string;
    priority: string;
    status: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    details: Record<string, unknown>;
    submittedAt: string;
  },
  source: { page: string } = { page: 'unknown' }
): Promise<WebhookResult[]> {
  const results: WebhookResult[] = [];
  const webhooks = getAllWebhooks();

  const payload: WebhookPayload = {
    event,
    timestamp: new Date().toISOString(),
    enquiry,
    source: {
      website: process.env.NEXT_PUBLIC_APP_URL || 'https://applywise.co.uk',
      page: source.page,
    },
  };

  for (const webhook of webhooks) {
    // Check if webhook is enabled and matches event/type
    if (!webhook.enabled) continue;
    if (!webhook.events.includes(event)) continue;
    if (!webhook.enquiryTypes.includes('all') && !webhook.enquiryTypes.includes(enquiry.type as never)) continue;

    console.log(`[WEBHOOK] Triggering ${webhook.name} for ${event}`);

    const result = await sendWebhookRequest(webhook, payload);
    results.push(result);

    // Update webhook status
    webhook.lastTriggered = new Date().toISOString();
    webhook.lastStatus = result.success ? 'success' : 'failed';
    if (!result.success) {
      webhook.failureCount = (webhook.failureCount || 0) + 1;
    } else {
      webhook.failureCount = 0;
    }
    webhookStore.set(webhook.id, webhook);

    console.log(`[WEBHOOK] ${webhook.name}: ${result.success ? 'SUCCESS' : 'FAILED'} (${result.responseTime}ms)`);
  }

  return results;
}

/**
 * Add a new webhook
 */
export function addWebhook(config: Omit<WebhookConfig, 'id' | 'createdAt'>): WebhookConfig {
  const webhook: WebhookConfig = {
    ...config,
    id: generateWebhookId(),
    createdAt: new Date().toISOString(),
  };
  webhookStore.set(webhook.id, webhook);
  return webhook;
}

/**
 * Update a webhook
 */
export function updateWebhook(id: string, updates: Partial<WebhookConfig>): WebhookConfig | null {
  const webhook = webhookStore.get(id);
  if (!webhook) return null;

  const updated = { ...webhook, ...updates, id: webhook.id };
  webhookStore.set(id, updated);
  return updated;
}

/**
 * Delete a webhook
 */
export function deleteWebhook(id: string): boolean {
  return webhookStore.delete(id);
}

/**
 * Get a webhook by ID
 */
export function getWebhook(id: string): WebhookConfig | undefined {
  return webhookStore.get(id);
}

/**
 * Get all webhooks
 */
export function getAllWebhooks(): WebhookConfig[] {
  return Array.from(webhookStore.values());
}

/**
 * Get webhook templates for UI
 */
export function getWebhookTemplates() {
  return DEFAULT_WEBHOOK_TEMPLATES;
}

/**
 * Test a webhook with sample data
 */
export async function testWebhook(id: string): Promise<WebhookResult> {
  const webhook = webhookStore.get(id);
  if (!webhook) {
    return { webhookId: id, success: false, error: 'Webhook not found' };
  }

  const testPayload: WebhookPayload = {
    event: 'enquiry.created',
    timestamp: new Date().toISOString(),
    enquiry: {
      id: 'TEST-123456',
      type: 'self-employed',
      priority: 'MEDIUM',
      status: 'new',
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      customerPhone: '07123456789',
      details: {
        companyType: 'Limited Company (Sole Director)',
        yearsTrading: '2-3 years',
        netProfit: '£100,000',
        propertyValue: '£400,000',
      },
      submittedAt: new Date().toISOString(),
    },
    source: {
      website: process.env.NEXT_PUBLIC_APP_URL || 'https://applywise.co.uk',
      page: 'webhook-test',
    },
  };

  return sendWebhookRequest(webhook, testPayload);
}

// Initialize with a sample webhook for testing (remove in production)
if (process.env.NODE_ENV !== 'production' && webhookStore.size === 0) {
  // Don't add any default webhooks - user will configure them
}
