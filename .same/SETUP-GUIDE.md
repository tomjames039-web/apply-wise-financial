# Apply Wise Financial - Setup Guide

## Quick Start

This guide will help you configure your website to receive lead notifications and manage enquiries.

---

## 1. Email Notifications Setup (10 minutes)

### Step 1: Create a Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Go to **API Keys** in the dashboard
4. Click **Create API Key**
5. Copy the key (starts with `re_`)

### Step 2: Configure Email in Netlify
1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site Settings** > **Environment Variables**
4. Add these variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NOTIFICATION_EMAIL` | `info@apply-wise.co.uk` | Where lead notifications are sent |
| `RESEND_API_KEY` | `re_xxxxxxxx` | Your Resend API key |
| `EMAIL_FROM` | `Apply Wise <noreply@apply-wise.co.uk>` | Sender name/email |
| `EMAIL_REPLY_TO` | `info@apply-wise.co.uk` | Reply-to address |

### Step 3: Verify Your Domain (Optional but Recommended)
In Resend dashboard:
1. Go to **Domains** > **Add Domain**
2. Add `apply-wise.co.uk`
3. Add the DNS records they provide
4. Wait for verification (usually 5-10 minutes)

### What Happens When a Lead Submits
1. Customer fills out form on website
2. System saves enquiry to database
3. **Email sent to you** with lead details + call button
4. **Email sent to customer** confirming receipt
5. Lead appears in admin dashboard

---

## 2. Admin Dashboard Access

### Login URL
```
https://your-site.netlify.app/admin/login
```

### Default Credentials
- **Admin:** `admin` / `ApplyWise2024!`
- **Viewer:** `viewer` / `ViewOnly2024!`

⚠️ **IMPORTANT:** Change these passwords in production!

### Change Admin Passwords
Add these environment variables in Netlify:

| Variable | Value |
|----------|-------|
| `ADMIN_PASSWORD` | Your new admin password |
| `VIEWER_PASSWORD` | Your new viewer password |
| `JWT_SECRET` | A random 32+ character string |

### Admin Features
- View all enquiries in one place
- Filter by type, status, priority
- Click to call/email customers
- Update enquiry status
- Auto-refreshes every 30 seconds

---

## 3. Google Analytics Setup (5 minutes)

### Step 1: Create GA4 Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property name: "Apply Wise Financial"
5. Select UK timezone and currency

### Step 2: Create Web Stream
1. Select **Web** as platform
2. Enter your website URL
3. Give it a name
4. Click **Create Stream**
5. Copy the **Measurement ID** (starts with `G-`)

### Step 3: Add to Netlify
Add environment variable:
| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` |

### Step 4: Redeploy
Trigger a new deploy for changes to take effect.

---

## 4. Google Business Profile Setup (15 minutes)

### Step 1: Create/Claim Listing
1. Go to [business.google.com](https://business.google.com)
2. Sign in with a Google account
3. Search for "Apply Wise Financial"
4. If not found, click **Add your business**

### Step 2: Business Information
```
Business Name: Apply Wise Financial
Category: Mortgage Broker
Address: 4 Fiddlers Hamlet, Epping, Essex, CM16 7PY
Phone: 01992 535 355
Website: https://your-site.com
Hours: Mon-Fri 9am-6pm, Sat 10am-4pm
```

### Step 3: Verify
- Usually via postcard to business address
- Or phone verification if available

### Step 4: Optimize
- Add photos (logo, team, office)
- Add services list
- Write business description
- Post regular updates

---

## 5. Google Search Console Setup (5 minutes)

### Step 1: Add Property
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add Property**
3. Choose **URL prefix**
4. Enter your site URL

### Step 2: Verify Ownership
Choose one method:
- **HTML tag** - Add meta tag to site
- **Domain verification** - Add DNS record
- **Google Analytics** - Auto-verify if GA is set up

### Step 3: Submit Sitemap
1. Go to **Sitemaps** in left menu
2. Enter: `sitemap.xml`
3. Click **Submit**

### Step 4: Monitor
Check back in 24-48 hours to see:
- Indexed pages
- Search performance
- Any errors

---

## 6. CRM/Webhook Integration (Optional)

### Send Leads to External CRM
Add environment variable:
| Variable | Value |
|----------|-------|
| `CRM_WEBHOOK_URL` | Your CRM webhook endpoint |

Supported CRMs with webhook support:
- HubSpot
- Salesforce
- Pipedrive
- Zoho CRM
- Monday.com
- Zapier (connect to anything)

### Webhook Payload Example
```json
{
  "type": "mortgage_enquiry",
  "enquiryId": "SE-ABC123",
  "customerName": "John Smith",
  "customerEmail": "john@example.com",
  "customerPhone": "07123456789",
  "priority": "HIGH",
  "details": {
    "propertyValue": "£450,000",
    "employmentType": "Company Director"
  },
  "submittedAt": "2025-04-10T14:30:00Z"
}
```

---

## 7. Environment Variables Summary

### Required for Email
```
NOTIFICATION_EMAIL=info@apply-wise.co.uk
RESEND_API_KEY=re_xxxxxxxx
```

### Required for Admin Security
```
ADMIN_PASSWORD=YourSecurePassword!
VIEWER_PASSWORD=ViewerPassword!
JWT_SECRET=random-32-character-string-here
```

### Optional but Recommended
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_APP_URL=https://apply-wise.co.uk
CRM_WEBHOOK_URL=https://your-crm.com/webhook
```

---

## 8. Testing Your Setup

### Test Email Notifications
1. Go to any form on your site (e.g., /self-employed)
2. Fill out the form with your details
3. Submit
4. Check your email for notification
5. Check admin dashboard for new enquiry

### Test Admin Dashboard
1. Go to /admin/login
2. Login with credentials
3. See your test enquiry
4. Try updating status
5. Click call/email buttons

### Test Google Analytics
1. Go to Google Analytics
2. Click **Reports** > **Realtime**
3. Visit your website in another tab
4. See yourself in realtime report

---

## 9. Common Issues

### Not Receiving Emails
1. Check `RESEND_API_KEY` is correct
2. Check `NOTIFICATION_EMAIL` is correct
3. Check spam/junk folder
4. Verify domain in Resend if using custom domain

### Admin Login Not Working
1. Check `ADMIN_PASSWORD` is set
2. Clear browser cookies
3. Try incognito/private window

### Analytics Not Tracking
1. Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is correct
2. Ensure you redeployed after adding
3. Check browser ad blockers

---

## 10. Support

If you need help:
- **Technical issues:** Contact Same support
- **Business queries:** info@apply-wise.co.uk
- **Phone:** 01992 535 355

---

*Last updated: April 2025*
