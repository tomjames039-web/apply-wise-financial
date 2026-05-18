"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Cookie Policy
            </h1>
            <p className="text-navy/60">Last updated: April 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto prose prose-lg text-navy/80">

            <p className="lead text-xl">
              This policy explains how Apply Wise uses cookies and similar technologies on our website.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website.
              They help websites work more efficiently and provide information to website owners.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>

            <h3 className="text-xl font-bold text-navy mt-8 mb-3">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core
              functionality such as security, network management, and accessibility.
            </p>
            <div className="bg-cream rounded-xl p-4 my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy/10">
                    <th className="text-left py-2">Cookie</th>
                    <th className="text-left py-2">Purpose</th>
                    <th className="text-left py-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-navy/10">
                    <td className="py-2">session_id</td>
                    <td className="py-2">Maintains your session</td>
                    <td className="py-2">Session</td>
                  </tr>
                  <tr className="border-b border-navy/10">
                    <td className="py-2">csrf_token</td>
                    <td className="py-2">Security protection</td>
                    <td className="py-2">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-navy mt-8 mb-3">Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalisation, such as remembering
              your preferences.
            </p>
            <div className="bg-cream rounded-xl p-4 my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy/10">
                    <th className="text-left py-2">Cookie</th>
                    <th className="text-left py-2">Purpose</th>
                    <th className="text-left py-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-navy/10">
                    <td className="py-2">user_preferences</td>
                    <td className="py-2">Stores your preferences</td>
                    <td className="py-2">1 year</td>
                  </tr>
                  <tr className="border-b border-navy/10">
                    <td className="py-2">cookie_consent</td>
                    <td className="py-2">Remembers cookie choices</td>
                    <td className="py-2">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-navy mt-8 mb-3">Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting
              and reporting information anonymously.
            </p>
            <div className="bg-cream rounded-xl p-4 my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy/10">
                    <th className="text-left py-2">Cookie</th>
                    <th className="text-left py-2">Purpose</th>
                    <th className="text-left py-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-navy/10">
                    <td className="py-2">_ga</td>
                    <td className="py-2">Google Analytics</td>
                    <td className="py-2">2 years</td>
                  </tr>
                  <tr className="border-b border-navy/10">
                    <td className="py-2">_gid</td>
                    <td className="py-2">Google Analytics</td>
                    <td className="py-2">24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-navy mt-8 mb-3">Marketing Cookies</h3>
            <p>
              These cookies track visitors across websites to enable us to display relevant
              advertisements. They are only used with your consent.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways. Please note that removing or
              blocking cookies may impact your user experience and some features may no longer
              work as intended.
            </p>

            <h3 className="text-xl font-bold text-navy mt-8 mb-3">Browser Settings</h3>
            <p>
              Most browsers allow you to refuse or accept cookies through their settings.
              Here are links to instructions for common browsers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Safari</li>
              <li>Microsoft Edge</li>
            </ul>

            <h3 className="text-xl font-bold text-navy mt-8 mb-3">Our Cookie Settings</h3>
            <p>
              You can change your cookie preferences at any time by clicking the "Cookie Settings"
              link in the footer of our website.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">Changes to This Policy</h2>
            <p>
              We may update this cookie policy from time to time. Any changes will be posted on
              this page with an updated revision date.
            </p>

            <h2 className="text-2xl font-bold text-navy mt-12 mb-4">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at
              info@apply-wise.co.uk.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
