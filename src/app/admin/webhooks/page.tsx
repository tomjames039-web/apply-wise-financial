"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  username: string;
  name: string;
  role: 'admin' | 'viewer';
}

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  events: string[];
  enquiryTypes: string[];
  headers?: Record<string, string>;
  format: string;
  createdAt: string;
  lastTriggered?: string;
  lastStatus?: 'success' | 'failed';
  failureCount?: number;
}

interface WebhookTemplate {
  name: string;
  format: string;
  events: string[];
  enquiryTypes: string[];
}

const eventLabels: Record<string, string> = {
  "enquiry.created": "New Enquiry",
  "enquiry.updated": "Enquiry Updated",
  "enquiry.completed": "Enquiry Completed",
};

const typeLabels: Record<string, string> = {
  all: "All Types",
  "self-employed": "Self-Employed",
  "bad-credit": "Bad Credit",
  btl: "Buy-to-Let",
  "equity-release": "Equity Release",
};

const formatLabels: Record<string, string> = {
  gohighlevel: "GoHighLevel (GHL)",
  json: "JSON (Standard)",
  zapier: "Zapier",
  hubspot: "HubSpot",
  salesforce: "Salesforce",
  form: "Form Data",
};

export default function AdminWebhooksPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [templates, setTemplates] = useState<WebhookTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; message: string } | null>(null);

  // Form state for new webhook
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    url: "",
    format: "json",
    events: ["enquiry.created"],
    enquiryTypes: ["all"],
    enabled: true,
  });

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/auth");
        const data = await response.json();
        if (data.authenticated) {
          setUser(data.user);
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router]);

  // Fetch webhooks
  const fetchWebhooks = async () => {
    try {
      const [webhooksRes, templatesRes] = await Promise.all([
        fetch("/api/admin/webhooks"),
        fetch("/api/admin/webhooks?templates=true"),
      ]);

      const webhooksData = await webhooksRes.json();
      const templatesData = await templatesRes.json();

      if (webhooksData.success) {
        setWebhooks(webhooksData.data);
      }
      if (templatesData.success) {
        setTemplates(templatesData.data);
      }
    } catch (error) {
      console.error("Failed to fetch webhooks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isCheckingAuth && user) {
      fetchWebhooks();
    }
  }, [isCheckingAuth, user]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleAddWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWebhook),
      });

      const result = await response.json();
      if (result.success) {
        setShowAddModal(false);
        setNewWebhook({
          name: "",
          url: "",
          format: "json",
          events: ["enquiry.created"],
          enquiryTypes: ["all"],
          enabled: true,
        });
        fetchWebhooks();
      } else {
        alert(result.error || "Failed to add webhook");
      }
    } catch (error) {
      console.error("Failed to add webhook:", error);
      alert("Failed to add webhook");
    }
  };

  const handleToggleWebhook = async (id: string, enabled: boolean) => {
    try {
      const response = await fetch("/api/admin/webhooks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, enabled }),
      });

      if (response.ok) {
        fetchWebhooks();
      }
    } catch (error) {
      console.error("Failed to toggle webhook:", error);
    }
  };

  const handleDeleteWebhook = async (id: string) => {
    if (!confirm("Are you sure you want to delete this webhook?")) return;

    try {
      const response = await fetch(`/api/admin/webhooks?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchWebhooks();
      }
    } catch (error) {
      console.error("Failed to delete webhook:", error);
    }
  };

  const handleTestWebhook = async (id: string) => {
    setTestingId(id);
    setTestResult(null);

    try {
      const response = await fetch("/api/admin/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test", id }),
      });

      const result = await response.json();
      setTestResult({
        id,
        success: result.success,
        message: result.success
          ? `Test successful (${result.data?.responseTime}ms)`
          : result.data?.error || "Test failed",
      });
    } catch (error) {
      setTestResult({
        id,
        success: false,
        message: "Network error during test",
      });
    } finally {
      setTestingId(null);
    }
  };

  const applyTemplate = (template: WebhookTemplate) => {
    setNewWebhook({
      ...newWebhook,
      name: template.name,
      format: template.format,
      events: template.events,
      enquiryTypes: template.enquiryTypes,
    });
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy sticky top-0 z-50 border-b border-navy-deep">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gold font-bold text-xl">
                Apply Wise
              </Link>
              <span className="text-white/50">|</span>
              <span className="text-white font-medium">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/enquiries"
                className="px-4 py-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                Enquiries
              </Link>
              <span className="text-white/50">|</span>
              <span className="text-white/70 text-sm">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-navy mb-2">Webhook Integrations</h1>
            <p className="text-navy/60 text-sm">
              Configure webhooks to send lead data to your CRM systems automatically
            </p>
          </div>
          {user?.role === "admin" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Webhook
            </button>
          )}
        </div>

        {/* Webhooks List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        ) : webhooks.length === 0 ? (
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Webhooks Configured</h3>
              <p className="text-gray-500 text-sm mb-6">
                Add a webhook to automatically send lead data to your CRM, Zapier, or other systems.
              </p>
              {user?.role === "admin" && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-colors"
                >
                  Add Your First Webhook
                </button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <Card key={webhook.id} className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-navy">{webhook.name}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          webhook.enabled
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {webhook.enabled ? "Active" : "Disabled"}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                          {formatLabels[webhook.format] || webhook.format}
                        </span>
                        {webhook.lastStatus && (
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            webhook.lastStatus === "success"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            Last: {webhook.lastStatus}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 font-mono mb-3 break-all">
                        {webhook.url}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {webhook.events.map((event) => (
                          <span key={event} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                            {eventLabels[event] || event}
                          </span>
                        ))}
                        {webhook.enquiryTypes.map((type) => (
                          <span key={type} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded">
                            {typeLabels[type] || type}
                          </span>
                        ))}
                      </div>

                      {testResult?.id === webhook.id && (
                        <div className={`p-3 rounded-lg text-sm mb-3 ${
                          testResult.success
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}>
                          {testResult.message}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>Created: {new Date(webhook.createdAt).toLocaleDateString("en-GB")}</span>
                        {webhook.lastTriggered && (
                          <>
                            <span>|</span>
                            <span>Last triggered: {new Date(webhook.lastTriggered).toLocaleString("en-GB")}</span>
                          </>
                        )}
                        {webhook.failureCount && webhook.failureCount > 0 && (
                          <>
                            <span>|</span>
                            <span className="text-red-500">Failures: {webhook.failureCount}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {user?.role === "admin" && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTestWebhook(webhook.id)}
                          disabled={testingId === webhook.id}
                          className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                          {testingId === webhook.id ? "Testing..." : "Test"}
                        </button>
                        <button
                          onClick={() => handleToggleWebhook(webhook.id, !webhook.enabled)}
                          className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                            webhook.enabled
                              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              : "bg-green-50 text-green-600 hover:bg-green-100"
                          }`}
                        >
                          {webhook.enabled ? "Disable" : "Enable"}
                        </button>
                        <button
                          onClick={() => handleDeleteWebhook(webhook.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How Webhooks Work
              </h3>
              <p className="text-blue-800/80 text-sm leading-relaxed">
                When a new enquiry is submitted on your website, Apply Wise will automatically send the lead data
                to all configured webhooks. This allows you to integrate with CRMs like HubSpot, Salesforce, or
                automation tools like Zapier.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Security Note
              </h3>
              <p className="text-amber-800/80 text-sm leading-relaxed">
                Webhook URLs should be kept secure. Consider using webhook signing or authentication
                tokens on your receiving end to verify that requests genuinely come from Apply Wise.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add Webhook Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/80 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-navy">Add Webhook</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Templates */}
              {templates.length > 0 && (
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <p className="text-sm text-gray-600 mb-3">Quick start with a template:</p>
                  <div className="flex flex-wrap gap-2">
                    {templates.map((template) => (
                      <button
                        key={template.name}
                        onClick={() => applyTemplate(template)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gold hover:text-gold transition-colors"
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleAddWebhook} className="p-6 space-y-5">
                <div>
                  <label className="block text-navy/70 text-sm font-medium mb-2">
                    Webhook Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newWebhook.name}
                    onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    placeholder="e.g., Zapier Lead Capture"
                  />
                </div>

                <div>
                  <label className="block text-navy/70 text-sm font-medium mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newWebhook.url}
                    onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl text-navy placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 font-mono text-sm"
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                  />
                </div>

                <div>
                  <label className="block text-navy/70 text-sm font-medium mb-2">
                    Payload Format
                  </label>
                  <select
                    value={newWebhook.format}
                    onChange={(e) => setNewWebhook({ ...newWebhook, format: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  >
                    {Object.entries(formatLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-navy/70 text-sm font-medium mb-2">
                    Trigger Events
                  </label>
                  <div className="space-y-2">
                    {Object.entries(eventLabels).map(([value, label]) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newWebhook.events.includes(value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewWebhook({ ...newWebhook, events: [...newWebhook.events, value] });
                            } else {
                              setNewWebhook({ ...newWebhook, events: newWebhook.events.filter(ev => ev !== value) });
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
                        />
                        <span className="text-sm text-navy">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-navy/70 text-sm font-medium mb-2">
                    Enquiry Types
                  </label>
                  <div className="space-y-2">
                    {Object.entries(typeLabels).map(([value, label]) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newWebhook.enquiryTypes.includes(value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewWebhook({ ...newWebhook, enquiryTypes: [...newWebhook.enquiryTypes, value] });
                            } else {
                              setNewWebhook({ ...newWebhook, enquiryTypes: newWebhook.enquiryTypes.filter(t => t !== value) });
                            }
                          }}
                          className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
                        />
                        <span className="text-sm text-navy">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enabled"
                    checked={newWebhook.enabled}
                    onChange={(e) => setNewWebhook({ ...newWebhook, enabled: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
                  />
                  <label htmlFor="enabled" className="text-sm text-navy cursor-pointer">
                    Enable webhook immediately
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gold text-navy font-semibold rounded-xl hover:bg-gold/90 transition-colors"
                  >
                    Add Webhook
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
