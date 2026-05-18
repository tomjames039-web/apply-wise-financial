# Protection Funnel Integration Setup

## 1. Resend Email Notifications

### Get Your Resend API Key
1. Go to [resend.com](https://resend.com) and create a free account
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Copy the key (starts with `re_`)

### Add to Environment Variables
Add these to your `.env.local` file or Netlify environment variables:

```bash
RESEND_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=info@apply-wise.co.uk
```

### Verify Your Domain (Recommended)
For better deliverability:
1. In Resend, go to **Domains**
2. Add your domain (e.g., apply-wise.co.uk)
3. Add the DNS records Resend provides
4. Once verified, update `EMAIL_FROM` in the API to use your domain

---

## 2. GoHighLevel (GHL) Webhook

### Create Webhook in GHL
1. Log into GoHighLevel
2. Go to **Automation** > **Workflows**
3. Create a new workflow or edit an existing one
4. Add a **Trigger** > **Inbound Webhook**
5. Copy the webhook URL provided

### Add to Environment Variables
```bash
GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/your-webhook-id
```

### Map Fields in GHL
The webhook sends this data structure:

| Field | Description |
|-------|-------------|
| `firstName` | Contact's first name |
| `email` | Email address |
| `phone` | Phone number |
| `customField.scenario` | mortgage, family, self-employed, landlord, exploring |
| `customField.mortgage` | Mortgage balance (£) |
| `customField.dependents` | yes/no |
| `customField.income` | Monthly income (£) |
| `customField.sickPay` | less-than-1, 1-3, 3-6, 6-plus |
| `customField.savings` | less-than-3, 3-6, 6-plus |
| `customField.age` | Age in years |
| `customField.smoker` | yes/no |
| `customField.estimatedRange` | e.g., "£95 - £180" |
| `customField.riskFlags` | e.g., "mortgageRisk, familyRisk" |
| `tags` | ["protection", "funnel-lead"] |
| `source` | "Protection Funnel" |

### Create GHL Custom Fields
In GHL, create custom contact fields to store the protection data:
1. Go to **Settings** > **Custom Fields**
2. Create fields for: scenario, mortgage, dependents, income, sickPay, savings, age, smoker, estimatedRange, riskFlags

---

## 3. Testing the Integration

### Test Email Notifications
1. Fill out the protection funnel at `/protection`
2. Check your `NOTIFICATION_EMAIL` inbox
3. You should receive an email within seconds

### Test GHL Webhook
1. Complete the funnel
2. Check GHL for a new contact
3. Verify all custom fields are populated

### Check Console Logs
In development, check the terminal for:
```
[EMAIL] Notification sent successfully
[GHL] Webhook sent successfully
```

---

## 4. Google Analytics A/B Test Tracking

### Events Tracked
The funnel automatically tracks these events:

| Event | When | Data |
|-------|------|------|
| `ab_variant_assigned` | First visit | `{ variant: "A" }` |
| `funnel_start` | Click "Start My Protection Check" | `{ variant: "A" }` |
| `step_complete` | Complete each step | `{ step: 1, variant: "A" }` |
| `funnel_complete` | Submit contact details | Full funnel data + variant |
| `results_view` | View results page | `{ variant: "A" }` |
| `book_click` | Click "Book Your Free Protection Review" | `{ variant: "A" }` |
| `callback_click` | Click "Request a Call Back" | `{ variant: "A" }` |

### View in Google Analytics
1. Go to **Reports** > **Engagement** > **Events**
2. Filter by event name (e.g., `funnel_complete`)
3. Add **Secondary dimension**: `variant`
4. Compare conversion rates between A, B, and C

### Create Custom Report
1. Go to **Explore** > **Free form**
2. Add dimensions: `Event name`, `variant`
3. Add metrics: `Event count`, `Conversions`
4. Filter to protection funnel events

---

## Quick Checklist

- [ ] Resend API key added to environment variables
- [ ] Notification email configured
- [ ] GHL webhook URL added
- [ ] Custom fields created in GHL
- [ ] Google Analytics tracking verified
- [ ] Test submission completed
