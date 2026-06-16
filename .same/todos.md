# Apply Wise Financial - Tasks

## Central CRM Contract Flip (June 15, 2026)

### Done ✅ (Lovable Phase 1 shipped → Apply Wise flipped)
- [x] Employer leads: omit ALL mortgage fields, send submissionType "employer-benefits"
- [x] leadSource "apply-wise.co.uk" on every lead (global default)
- [x] submissionType defaults: mortgage-enquiry; protection → protection-enquiry
- [x] Employer fields sent: companyName, employeeCount (int), staffCommsMethod, notes, landingPage
- [x] Employee count form field changed to number input (int)
- [x] Protection routed as non-mortgage lead (no fake mortgage figures)
- [x] Real UTM only (removed forced employer_benefits tags)
- [x] Tested transform locally: employer / protection / mortgage all correct

### Remaining before fully live
- [ ] Deploy CRM contract fix (push to GitHub) — safe, no email dependency
- [ ] DNS: add 3 records in Netlify to verify apply-wise.co.uk in Resend
- [ ] Env vars in Netlify: RESEND_API_KEY, NOTIFICATION_EMAIL
- [ ] End-to-end live test (employer submission → CRM + emails)

### Email work (built earlier, pending DNS)
- [x] Celebratory employer confirmation email (broker fee waived / save up to £695)
- [x] Internal "Employer Benefit Lead - Not a Mortgage Lead" notification
- [x] Conveyancing buttons: GA event tracking (no CRM lead)

## Conveyancing Page Integration (May 18, 2026)

### Completed ✅
- [x] Update conveyancing quote button URLs to working SortRefer link
- [x] Add Conveyancing to header navigation (desktop)
- [x] Add Conveyancing to header navigation (mobile)
- [x] Add Conveyancing to footer services section
- [x] Add Conveyancing to sitemap
- [x] Create version and deploy
- [x] Conveyancing page created with working quote buttons
- [x] All three quote CTAs updated to https://quote.sortrefer.co.uk/MTc5ODc=
- [x] Site deployed to production

## PageSpeed Optimizations (May 6, 2026)

### Completed
- [x] Make splash screen immediately skippable (Option B)
- [x] Content pre-loads behind splash overlay (Option D)
- [x] Reduce splash auto-timeout from 5s to 3.5s
- [x] Convert lender carousel from JavaScript to CSS animation
- [x] Convert `<img>` tags to Next.js `<Image>` in homepage components
- [x] Add hero image preloading for faster LCP
- [x] Enable AVIF/WebP image formats in next.config.js
- [x] Add framer-motion to optimizePackageImports

### To Consider Later
- [ ] Convert remaining `<img>` tags on subpages (mortgage-comparison, remortgage, etc.)
- [ ] Consider compressing the hero logo further (currently 97KB)
- [ ] Add service worker for caching
- [ ] Lazy load below-fold components

## Previous Tasks
- [x] Site structure and navigation
- [x] All service pages created
- [x] Contact forms and enquiry handling
- [x] SEO optimization
- [x] Mobile responsiveness
