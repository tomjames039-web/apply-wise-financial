"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface User {
  username: string;
  name: string;
  role: 'admin' | 'viewer';
}

interface Enquiry {
  id: string;
  type: string;
  priority: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  details: Record<string, unknown>;
  submittedAt: string;
  status: "new" | "contacted" | "in-progress" | "completed" | "closed";
}

interface Stats {
  total: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
}

const typeLabels: Record<string, string> = {
  "self-employed": "Self-Employed",
  "bad-credit": "Bad Credit",
  btl: "Buy-to-Let",
  "equity-release": "Equity Release",
};

const typeColors: Record<string, string> = {
  "self-employed": "bg-blue-100 text-blue-800 border-blue-200",
  "bad-credit": "bg-orange-100 text-orange-800 border-orange-200",
  btl: "bg-green-100 text-green-800 border-green-200",
  "equity-release": "bg-purple-100 text-purple-800 border-purple-200",
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  "in-progress": "In Progress",
  completed: "Completed",
  closed: "Closed",
};

const statusColors: Record<string, string> = {
  new: "bg-red-100 text-red-700 border-red-200",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
  completed: "bg-green-100 text-green-700 border-green-200",
  closed: "bg-gray-100 text-gray-700 border-gray-200",
};

const priorityColors: Record<string, string> = {
  HIGH: "bg-red-500 text-white",
  MEDIUM: "bg-amber-500 text-white",
  STANDARD: "bg-emerald-500 text-white",
};

export default function AdminEnquiriesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    priority: "",
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

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const fetchEnquiries = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.set("type", filters.type);
      if (filters.status) params.set("status", filters.status);
      if (filters.priority) params.set("priority", filters.priority);

      const response = await fetch(`/api/admin/enquiries?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setEnquiries(result.data.enquiries);
        setStats(result.data.stats);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchEnquiries();
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchEnquiries, 30000);
    return () => clearInterval(interval);
  }, [fetchEnquiries]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        fetchEnquiries();
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: status as Enquiry["status"] } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  // Show loading state while checking authentication
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
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/admin/enquiries"
                  className="px-4 py-2 text-white bg-white/10 rounded-lg text-sm font-medium"
                >
                  Enquiries
                </Link>
                <Link
                  href="/admin/webhooks"
                  className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  Webhooks
                </Link>
              </nav>
              <span className="text-white/30">|</span>
              <button
                onClick={fetchEnquiries}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-white/20">
                {user && (
                  <span className="text-white/70 text-sm hidden sm:inline">
                    {user.name}
                    <span className="text-white/40 ml-1">({user.role})</span>
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-navy">{stats.total}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border border-red-200">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-red-600">{stats.byStatus.new}</p>
                <p className="text-xs text-red-600 uppercase tracking-wider">New</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border border-yellow-200">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">{stats.byStatus.contacted}</p>
                <p className="text-xs text-yellow-600 uppercase tracking-wider">Contacted</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border border-blue-200">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.byStatus.inProgress}</p>
                <p className="text-xs text-blue-600 uppercase tracking-wider">In Progress</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border border-green-200">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{stats.byStatus.completed}</p>
                <p className="text-xs text-green-600 uppercase tracking-wider">Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-red-500">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-white">{stats.byPriority.HIGH}</p>
                <p className="text-xs text-white/80 uppercase tracking-wider">High Priority</p>
              </CardContent>
            </Card>
            <Card className="bg-amber-500">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-white">{stats.byPriority.MEDIUM}</p>
                <p className="text-xs text-white/80 uppercase tracking-wider">Medium</p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-500">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-white">{stats.byPriority.STANDARD}</p>
                <p className="text-xs text-white/80 uppercase tracking-wider">Standard</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            <option value="">All Types</option>
            <option value="self-employed">Self-Employed</option>
            <option value="bad-credit">Bad Credit</option>
            <option value="btl">Buy-to-Let</option>
            <option value="equity-release">Equity Release</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="STANDARD">Standard</option>
          </select>

          {(filters.type || filters.status || filters.priority) && (
            <button
              onClick={() => setFilters({ type: "", status: "", priority: "" })}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          )}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enquiries List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-600">{error}</div>
            ) : enquiries.length === 0 ? (
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Enquiries Yet</h3>
                  <p className="text-gray-500 text-sm">
                    Enquiries will appear here when customers submit forms on the website.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {enquiries.map((enquiry) => (
                  <motion.div
                    key={enquiry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedEnquiry?.id === enquiry.id
                        ? "border-gold ring-2 ring-gold/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedEnquiry(enquiry)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-xs font-bold rounded ${priorityColors[enquiry.priority]}`}>
                            {enquiry.priority}
                          </span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded border ${typeColors[enquiry.type]}`}>
                            {typeLabels[enquiry.type] || enquiry.type}
                          </span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded border ${statusColors[enquiry.status]}`}>
                            {statusLabels[enquiry.status]}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 truncate">{enquiry.customerName}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <a href={`tel:${enquiry.customerPhone}`} className="hover:text-gold flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {enquiry.customerPhone}
                          </a>
                          <span className="text-gray-400">|</span>
                          <span className="truncate">{enquiry.customerEmail}</span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-400 whitespace-nowrap">
                        <p>{formatDate(enquiry.submittedAt)}</p>
                        <p className="font-mono text-gray-300 mt-1">{enquiry.id}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                {selectedEnquiry ? (
                  <motion.div
                    key={selectedEnquiry.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card className="bg-white border border-gray-200 overflow-hidden">
                      <div className="bg-navy p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-0.5 text-xs font-bold rounded ${priorityColors[selectedEnquiry.priority]}`}>
                            {selectedEnquiry.priority} PRIORITY
                          </span>
                          <button
                            onClick={() => setSelectedEnquiry(null)}
                            className="text-white/60 hover:text-white"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <h2 className="text-xl font-bold text-white">{selectedEnquiry.customerName}</h2>
                        <p className="text-white/60 text-sm">
                          {typeLabels[selectedEnquiry.type]} Enquiry
                        </p>
                      </div>

                      <CardContent className="p-4 space-y-4">
                        {/* Contact Actions */}
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={`tel:${selectedEnquiry.customerPhone}`}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call
                          </a>
                          <a
                            href={`mailto:${selectedEnquiry.customerEmail}`}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                          </a>
                        </div>

                        {/* Status Update */}
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                            Update Status
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(statusLabels).map(([value, label]) => (
                              <button
                                key={value}
                                onClick={() => updateStatus(selectedEnquiry.id, value)}
                                className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                                  selectedEnquiry.status === value
                                    ? "bg-navy text-white border-navy"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Contact Details */}
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                            Contact Details
                          </label>
                          <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                              <span className="text-gray-400">Phone:</span>
                              <a href={`tel:${selectedEnquiry.customerPhone}`} className="text-navy font-medium hover:text-gold">
                                {selectedEnquiry.customerPhone}
                              </a>
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="text-gray-400">Email:</span>
                              <a href={`mailto:${selectedEnquiry.customerEmail}`} className="text-navy font-medium hover:text-gold truncate">
                                {selectedEnquiry.customerEmail}
                              </a>
                            </p>
                          </div>
                        </div>

                        {/* Enquiry Details */}
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">
                            Enquiry Details
                          </label>
                          <div className="space-y-2 text-sm">
                            {Object.entries(selectedEnquiry.details)
                              .filter(([_, value]) => value !== null && value !== undefined && value !== "")
                              .map(([key, value]) => (
                                <div key={key} className="flex justify-between gap-2 py-1 border-b border-gray-100 last:border-0">
                                  <span className="text-gray-500 capitalize">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                  </span>
                                  <span className="text-navy font-medium text-right">
                                    {String(value)}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-400">
                            Submitted: {new Date(selectedEnquiry.submittedAt).toLocaleString("en-GB")}
                          </p>
                          <p className="text-xs text-gray-400 font-mono mt-1">
                            ID: {selectedEnquiry.id}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-100 border border-dashed border-gray-300 rounded-xl p-8 text-center"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Select an enquiry to view details</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
