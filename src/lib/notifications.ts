/**
 * Notification Service for Apply Wise Financial
 * Handles email notifications for all enquiry types
 * Uses Resend for email delivery in production
 */

import { Resend } from 'resend';

// Initialize Resend client - will use RESEND_API_KEY from environment
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email configuration
const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'Apply Wise <noreply@applywise.co.uk>',
  replyTo: process.env.EMAIL_REPLY_TO || 'info@applywise.co.uk',
  isDevelopment: process.env.NODE_ENV !== 'production',
  // Primary notification email - all enquiries go here
  primaryEmail: process.env.NOTIFICATION_EMAIL || 'leads@applywise.co.uk',
};

export interface NotificationPayload {
  type: 'self-employed' | 'bad-credit' | 'btl' | 'equity-release' | 'general';
  priority: 'HIGH' | 'MEDIUM' | 'STANDARD';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  enquiryId: string;
  subject: string;
  details: Record<string, string | number | null | undefined>;
  submittedAt: string;
}

export interface EmailTemplate {
  to: string[];
  subject: string;
  html: string;
  text: string;
}

export interface EmailResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

// Team email addresses by enquiry type
// Uses NOTIFICATION_EMAIL env var as primary, with fallbacks
const getTeamEmails = (type: string): string[] => {
  const primaryEmail = EMAIL_CONFIG.primaryEmail;

  // If a specific email is set via env, use it for all types
  if (process.env.NOTIFICATION_EMAIL) {
    return [primaryEmail];
  }

  // Default fallback emails by type
  const typeEmails: Record<string, string[]> = {
    'self-employed': [primaryEmail, 'selfemployed@applywise.co.uk'],
    'bad-credit': [primaryEmail, 'adversecredit@applywise.co.uk'],
    'btl': [primaryEmail, 'btl@applywise.co.uk'],
    'equity-release': [primaryEmail, 'equityrelease@applywise.co.uk'],
    'general': [primaryEmail],
  };

  return typeEmails[type] || [primaryEmail];
};

// In development, send all emails to a test address
const DEV_EMAIL = process.env.DEV_EMAIL || 'dev@applywise.co.uk';

// Priority colors for email styling
const PRIORITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  HIGH: { bg: '#DC2626', text: '#FFFFFF', border: '#B91C1C' },
  MEDIUM: { bg: '#F59E0B', text: '#1F2937', border: '#D97706' },
  STANDARD: { bg: '#10B981', text: '#FFFFFF', border: '#059669' },
};

// Type labels for display
const TYPE_LABELS: Record<string, string> = {
  'self-employed': 'Self-Employed / Company Director',
  'bad-credit': 'Bad Credit / Adverse',
  'btl': 'Buy-to-Let',
  'equity-release': 'Equity Release',
  'general': 'General Enquiry',
};

/**
 * Generate HTML email template for team notifications
 */
export function generateTeamEmailTemplate(payload: NotificationPayload): EmailTemplate {
  const priorityStyle = PRIORITY_COLORS[payload.priority];
  const typeLabel = TYPE_LABELS[payload.type] || 'General Enquiry';

  const detailsRows = Object.entries(payload.details)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      return `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%;">${formattedKey}</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${value}</td>
        </tr>
      `;
    })
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${payload.subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F3F4F6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF;">
        <!-- Header -->
        <tr>
          <td style="background-color: #0F172A; padding: 24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <h1 style="margin: 0; color: #D4A524; font-size: 24px; font-weight: bold;">Apply Wise</h1>
                  <p style="margin: 4px 0 0 0; color: #94A3B8; font-size: 12px;">New ${typeLabel} Enquiry</p>
                </td>
                <td style="text-align: right;">
                  <span style="display: inline-block; padding: 8px 20px; background-color: ${priorityStyle.bg}; color: ${priorityStyle.text}; border-radius: 9999px; font-size: 12px; font-weight: bold; border: 2px solid ${priorityStyle.border};">${payload.priority} PRIORITY</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Customer Info -->
        <tr>
          <td style="padding: 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FEF3C7; border-radius: 12px; border: 2px solid #FCD34D;">
              <tr>
                <td style="padding: 24px;">
                  <h2 style="margin: 0 0 16px 0; color: #92400E; font-size: 16px; font-weight: 600;">Customer Contact Details</h2>
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="padding: 8px 0;">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width: 24px; vertical-align: middle;">
                              <span style="display: inline-block; width: 20px; height: 20px; background-color: #D97706; border-radius: 50%; text-align: center; line-height: 20px; color: white; font-size: 12px;">👤</span>
                            </td>
                            <td style="padding-left: 12px;">
                              <strong style="color: #78350F; font-size: 14px;">Name:</strong>
                              <span style="color: #92400E; margin-left: 8px; font-size: 16px; font-weight: 600;">${payload.customerName}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width: 24px; vertical-align: middle;">
                              <span style="display: inline-block; width: 20px; height: 20px; background-color: #D97706; border-radius: 50%; text-align: center; line-height: 20px; color: white; font-size: 12px;">📞</span>
                            </td>
                            <td style="padding-left: 12px;">
                              <strong style="color: #78350F; font-size: 14px;">Phone:</strong>
                              <a href="tel:${payload.customerPhone}" style="color: #D97706; margin-left: 8px; text-decoration: none; font-size: 16px; font-weight: 600;">${payload.customerPhone}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width: 24px; vertical-align: middle;">
                              <span style="display: inline-block; width: 20px; height: 20px; background-color: #D97706; border-radius: 50%; text-align: center; line-height: 20px; color: white; font-size: 12px;">✉️</span>
                            </td>
                            <td style="padding-left: 12px;">
                              <strong style="color: #78350F; font-size: 14px;">Email:</strong>
                              <a href="mailto:${payload.customerEmail}" style="color: #D97706; margin-left: 8px; text-decoration: none; font-size: 14px;">${payload.customerEmail}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #FCD34D;">
                    <a href="tel:${payload.customerPhone}" style="display: inline-block; padding: 12px 24px; background-color: #D97706; color: white; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">📞 Call Customer Now</a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Enquiry Details -->
        <tr>
          <td style="padding: 0 32px 32px;">
            <h2 style="margin: 0 0 16px 0; color: #1F2937; font-size: 16px; font-weight: 600;">Enquiry Details</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden;">
              <tbody>
                ${detailsRows}
              </tbody>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #F9FAFB; padding: 24px 32px; border-top: 1px solid #E5E7EB;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin: 0; color: #6B7280; font-size: 12px;">Enquiry ID: <code style="background-color: #E5E7EB; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${payload.enquiryId}</code></p>
                  <p style="margin: 4px 0 0 0; color: #9CA3AF; font-size: 11px;">Submitted: ${new Date(payload.submittedAt).toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</p>
                </td>
                <td style="text-align: right;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://applywise.co.uk'}/admin/enquiries/${payload.enquiryId}" style="display: inline-block; padding: 12px 24px; background-color: #0F172A; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 500;">View in Dashboard</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Unsubscribe footer -->
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td style="padding: 16px 32px; text-align: center;">
            <p style="margin: 0; color: #9CA3AF; font-size: 11px;">
              This is an internal notification from Apply Wise Financial CRM.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Plain text version
  const text = `
NEW ${typeLabel.toUpperCase()} ENQUIRY - ${payload.priority} PRIORITY
${'='.repeat(50)}

CUSTOMER CONTACT DETAILS
------------------------
Name: ${payload.customerName}
Phone: ${payload.customerPhone}
Email: ${payload.customerEmail}

ENQUIRY DETAILS
---------------
${Object.entries(payload.details)
  .filter(([_, value]) => value !== null && value !== undefined && value !== '')
  .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}`)
  .join('\n')}

---
Enquiry ID: ${payload.enquiryId}
Submitted: ${new Date(payload.submittedAt).toLocaleString('en-GB')}
View in Dashboard: ${process.env.NEXT_PUBLIC_APP_URL || 'https://applywise.co.uk'}/admin/enquiries/${payload.enquiryId}
  `.trim();

  // Determine recipients
  const recipients = EMAIL_CONFIG.isDevelopment
    ? [DEV_EMAIL]
    : getTeamEmails(payload.type);

  return {
    to: recipients,
    subject: `[${payload.priority}] New ${typeLabel} Enquiry - ${payload.customerName}`,
    html,
    text,
  };
}

/**
 * Generate customer confirmation email template
 */
export function generateCustomerConfirmationEmail(payload: NotificationPayload): EmailTemplate {
  const typeMessages: Record<string, { title: string; message: string; icon: string }> = {
    'self-employed': {
      title: 'Self-Employed Mortgage Enquiry Received',
      message: 'Thank you for your enquiry about self-employed and company director mortgages. One of our specialist advisers will be in touch within 2 hours during business hours to discuss how we can help maximise your borrowing.',
      icon: '🏢',
    },
    'bad-credit': {
      title: 'Bad Credit Mortgage Enquiry Received',
      message: "Thank you for your enquiry. We understand that credit issues can feel stressful, but we're here to help. One of our adverse credit specialists will call you within 2 hours during business hours to discuss your options.",
      icon: '🛡️',
    },
    'btl': {
      title: 'Buy-to-Let Mortgage Enquiry Received',
      message: 'Thank you for your buy-to-let mortgage enquiry. One of our BTL specialists will be in touch within 2 hours during business hours to discuss your investment property plans.',
      icon: '🏠',
    },
    'equity-release': {
      title: 'Equity Release Enquiry Received',
      message: 'Thank you for your equity release enquiry. One of our qualified equity release advisers will contact you within 2 hours during business hours to discuss your options in detail.',
      icon: '🔑',
    },
    'general': {
      title: 'Enquiry Received',
      message: 'Thank you for your enquiry. One of our mortgage advisers will be in touch shortly to discuss how we can help you.',
      icon: '📋',
    },
  };

  const { title, message, icon } = typeMessages[payload.type] || typeMessages.general;
  const firstName = payload.customerName.split(' ')[0];

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F3F4F6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF;">
        <!-- Header -->
        <tr>
          <td style="background-color: #0F172A; padding: 40px 32px; text-align: center;">
            <h1 style="margin: 0; color: #D4A524; font-size: 32px; font-weight: bold;">Apply Wise</h1>
            <p style="margin: 8px 0 0 0; color: #94A3B8; font-size: 14px;">Expert Mortgage Advice</p>
          </td>
        </tr>

        <!-- Main Content -->
        <tr>
          <td style="padding: 48px 32px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="display: inline-block; width: 80px; height: 80px; background: linear-gradient(135deg, #D4A524 0%, #B8941F 100%); border-radius: 50%; line-height: 80px; box-shadow: 0 4px 14px rgba(212, 165, 36, 0.4);">
                <span style="color: #0F172A; font-size: 36px;">${icon}</span>
              </div>
            </div>

            <h2 style="margin: 0 0 16px 0; color: #1F2937; font-size: 24px; font-weight: 600; text-align: center;">${title}</h2>

            <p style="margin: 0 0 24px 0; color: #4B5563; font-size: 16px; line-height: 1.6; text-align: center;">
              Hi ${firstName},
            </p>

            <p style="margin: 0 0 32px 0; color: #4B5563; font-size: 16px; line-height: 1.7;">
              ${message}
            </p>

            <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border-radius: 12px; padding: 24px; margin: 32px 0; border: 2px solid #FCD34D;">
              <h3 style="margin: 0 0 16px 0; color: #92400E; font-size: 16px; font-weight: 600;">What happens next?</h3>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #78350F; font-size: 15px; line-height: 2;">
                <li>A specialist adviser will review your enquiry</li>
                <li>We'll call you at <strong>${payload.customerPhone}</strong></li>
                <li>We'll discuss your options with no obligation</li>
                <li>If you're happy to proceed, we'll handle everything</li>
              </ul>
            </div>

            <div style="background-color: #F3F4F6; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0;">
              <p style="margin: 0; color: #6B7280; font-size: 14px;">
                Your reference number
              </p>
              <p style="margin: 8px 0 0 0;">
                <code style="background-color: #0F172A; color: #D4A524; padding: 8px 16px; border-radius: 6px; font-size: 16px; font-family: monospace; font-weight: bold;">${payload.enquiryId}</code>
              </p>
            </div>
          </td>
        </tr>

        <!-- Contact Section -->
        <tr>
          <td style="padding: 0 32px 48px;">
            <div style="background-color: #F9FAFB; border-radius: 12px; padding: 32px; text-align: center; border: 1px solid #E5E7EB;">
              <p style="margin: 0 0 16px 0; color: #6B7280; font-size: 15px;">Need to speak to us urgently?</p>
              <a href="tel:01onal234567890" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: #FFFFFF; text-decoration: none; border-radius: 10px; font-size: 18px; font-weight: 600; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.3);">📞 Call 01234 567890</a>
              <p style="margin: 16px 0 0 0; color: #9CA3AF; font-size: 13px;">Mon-Fri 9am-7pm, Sat 10am-4pm</p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #0F172A; padding: 32px; text-align: center;">
            <p style="margin: 0 0 8px 0; color: #94A3B8; font-size: 12px;">
              Apply Wise Financial Ltd is authorised and regulated by the Financial Conduct Authority.
            </p>
            <p style="margin: 0 0 16px 0; color: #64748B; font-size: 11px;">
              FCA Registration Number: 123456 | Company Number: 12345678
            </p>
            <p style="margin: 0; color: #475569; font-size: 11px;">
              © ${new Date().getFullYear()} Apply Wise Financial. All rights reserved.
            </p>
          </td>
        </tr>
      </table>

      <!-- Unsubscribe -->
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td style="padding: 16px 32px; text-align: center;">
            <p style="margin: 0; color: #9CA3AF; font-size: 11px;">
              You received this email because you submitted an enquiry on our website.
              <br>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://applywise.co.uk'}/unsubscribe" style="color: #6B7280;">Unsubscribe</a> |
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://applywise.co.uk'}/privacy" style="color: #6B7280;">Privacy Policy</a>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
${title.toUpperCase()}

Hi ${firstName},

${message}

WHAT HAPPENS NEXT?
------------------
- A specialist adviser will review your enquiry
- We'll call you at ${payload.customerPhone}
- We'll discuss your options with no obligation
- If you're happy to proceed, we'll handle everything

Your reference number: ${payload.enquiryId}

Need to speak to us urgently? Call 01234 567890
Mon-Fri 9am-7pm, Sat 10am-4pm

---
Apply Wise Financial Ltd is authorised and regulated by the Financial Conduct Authority.
FCA Registration Number: 123456 | Company Number: 12345678
  `.trim();

  return {
    to: [payload.customerEmail],
    subject: `${title} - Apply Wise`,
    html,
    text,
  };
}

/**
 * Send a single email via Resend
 */
async function sendEmail(template: EmailTemplate, type: 'team' | 'customer'): Promise<EmailResult> {
  // If no Resend client (no API key), log and simulate
  if (!resend) {
    console.log(`[EMAIL ${type.toUpperCase()}] Would send to:`, template.to.join(', '));
    console.log(`[EMAIL ${type.toUpperCase()}] Subject:`, template.subject);

    if (EMAIL_CONFIG.isDevelopment) {
      console.log(`[DEV MODE] Email content logged but not sent (no RESEND_API_KEY)`);
    }

    return { sent: true, messageId: `dev-${Date.now()}` };
  }

  try {
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      replyTo: EMAIL_CONFIG.replyTo,
      to: template.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (result.error) {
      console.error(`[EMAIL ${type.toUpperCase()}] Send failed:`, result.error);
      return { sent: false, error: result.error.message };
    }

    console.log(`[EMAIL ${type.toUpperCase()}] Sent successfully:`, result.data?.id);
    return { sent: true, messageId: result.data?.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[EMAIL ${type.toUpperCase()}] Exception:`, errorMessage);
    return { sent: false, error: errorMessage };
  }
}

/**
 * Send notification emails (team + customer)
 */
export async function sendNotifications(payload: NotificationPayload): Promise<{
  teamEmail: EmailResult;
  customerEmail: EmailResult;
}> {
  const teamTemplate = generateTeamEmailTemplate(payload);
  const customerTemplate = generateCustomerConfirmationEmail(payload);

  // Send both emails in parallel
  const [teamResult, customerResult] = await Promise.all([
    sendEmail(teamTemplate, 'team'),
    sendEmail(customerTemplate, 'customer'),
  ]);

  return {
    teamEmail: teamResult,
    customerEmail: customerResult,
  };
}

/**
 * Send only team notification (for admin actions, etc.)
 */
export async function sendTeamNotification(payload: NotificationPayload): Promise<EmailResult> {
  const template = generateTeamEmailTemplate(payload);
  return sendEmail(template, 'team');
}

/**
 * Send only customer notification
 */
export async function sendCustomerNotification(payload: NotificationPayload): Promise<EmailResult> {
  const template = generateCustomerConfirmationEmail(payload);
  return sendEmail(template, 'customer');
}

/**
 * Helper to generate unique enquiry IDs
 */
export function generateEnquiryId(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Calculate priority based on enquiry type and details
 */
export function calculatePriority(
  type: string,
  details: Record<string, unknown>
): 'HIGH' | 'MEDIUM' | 'STANDARD' {
  // High priority indicators
  const highPriorityIndicators = [
    // High property values
    details.propertyValue && parseFloat(String(details.propertyValue).replace(/[£,]/g, '')) > 500000,
    // Urgent timelines mentioned
    String(details.message || '').toLowerCase().includes('urgent'),
    String(details.message || '').toLowerCase().includes('asap'),
    String(details.timeframe || '').toLowerCase().includes('urgent'),
    // Complex cases that need specialist attention
    details.companyType === 'multiple-companies',
    details.companyType === 'holding-company',
    // Bad credit - bankruptcy and repossession are high priority
    details.creditIssue === 'bankruptcy',
    details.creditIssue === 'repossession',
    details.creditIssue === 'multiple',
    // Equity release - high value properties
    type === 'equity-release' && details.propertyValue && parseFloat(String(details.propertyValue).replace(/[£,]/g, '')) > 750000,
    // BTL - large portfolios
    details.existingProperties === '10+',
  ];

  // Medium priority indicators
  const mediumPriorityIndicators = [
    // Moderate property values
    details.propertyValue && parseFloat(String(details.propertyValue).replace(/[£,]/g, '')) > 300000,
    // Recent trading history (more support needed)
    details.yearsTrading === '0-1' || details.yearsTrading === '1-2',
    // Bad credit - IVA, CCJ, DMP
    details.creditIssue === 'iva',
    details.creditIssue === 'ccj',
    details.creditIssue === 'dmp',
    // BTL - portfolio landlords
    details.existingProperties === '4-10',
    // Equity release - age considerations
    type === 'equity-release' && details.age && parseInt(String(details.age)) >= 75,
  ];

  if (highPriorityIndicators.some(Boolean)) {
    return 'HIGH';
  }

  if (mediumPriorityIndicators.some(Boolean)) {
    return 'MEDIUM';
  }

  return 'STANDARD';
}

/**
 * Store enquiry in memory (would be database in production)
 * This is used by the admin dashboard
 */
const enquiryStore: Map<string, {
  id: string;
  type: string;
  priority: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  details: Record<string, unknown>;
  submittedAt: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed';
}> = new Map();

export function storeEnquiry(enquiry: {
  id: string;
  type: string;
  priority: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  details: Record<string, unknown>;
  submittedAt: string;
  status?: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed';
}) {
  enquiryStore.set(enquiry.id, {
    ...enquiry,
    status: enquiry.status || 'new',
  });
}

export function getEnquiry(id: string) {
  return enquiryStore.get(id);
}

export function getAllEnquiries() {
  return Array.from(enquiryStore.values()).sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export function updateEnquiryStatus(id: string, status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed') {
  const enquiry = enquiryStore.get(id);
  if (enquiry) {
    enquiry.status = status;
    enquiryStore.set(id, enquiry);
    return true;
  }
  return false;
}
