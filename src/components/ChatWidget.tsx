"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getStoredTrackingData, storeTrackingData } from "@/lib/tracking";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  links?: { label: string; href: string }[];
  showLeadForm?: boolean;
}

interface LeadData {
  name: string;
  phone: string;
  email: string;
  query: string;
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    text: "Hello! Welcome to Apply Wise. I'm here to help you find the right mortgage. What can I help you with today?",
    sender: "agent",
    timestamp: new Date(),
  },
];

const quickReplies = [
  "First-time buyer",
  "Remortgage",
  "Bad credit mortgage",
  "Book a call",
];

// Intelligent response system with links
interface ResponseConfig {
  keywords: string[];
  response: string;
  links?: { label: string; href: string }[];
  captureInfo?: boolean;
}

const responseConfigs: ResponseConfig[] = [
  {
    keywords: ["first", "buyer", "ftb", "first-time", "never bought", "first home"],
    response: "Great news! As a first-time buyer, you could be eligible for stamp duty relief on properties up to £425,000. We have a dedicated first-time buyer service to guide you through the process. Here are some helpful resources:",
    links: [
      { label: "First Time Buyer Guide", href: "/first-time-buyer" },
      { label: "Mortgage Calculator", href: "/calculator" },
      { label: "Book a Free Consultation", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["remortgage", "switch", "better rate", "current mortgage", "end of deal", "fixed rate ending"],
    response: "Looking to remortgage? Our service is completely free for remortgages - we're paid by the lender, not you! Let me help you find a better deal:",
    links: [
      { label: "Remortgage Info", href: "/remortgage" },
      { label: "Product Transfer", href: "/product-transfer" },
      { label: "Calculate Savings", href: "/calculator" },
      { label: "Get Free Quote", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["bad credit", "ccj", "default", "iva", "bankruptcy", "declined", "poor credit", "credit issue"],
    response: "Don't worry - bad credit doesn't mean you can't get a mortgage. We specialise in helping people with credit issues and have access to specialist lenders. Here's how we can help:",
    links: [
      { label: "Bad Credit Mortgages", href: "/bad-credit" },
      { label: "Check Your Options", href: "/bad-credit#enquiry" },
      { label: "Speak to a Specialist", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["buy to let", "btl", "landlord", "rental", "investment property", "letting"],
    response: "Interested in buy-to-let? We have access to 90+ lenders including specialist BTL providers. Whether it's your first investment or adding to your portfolio:",
    links: [
      { label: "Buy-to-Let Mortgages", href: "/buy-to-let" },
      { label: "BTL Yield Calculator", href: "/calculator/btl-yield" },
      { label: "Get BTL Advice", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["equity release", "lifetime mortgage", "retirement", "over 55", "release equity"],
    response: "Equity release could help you access the value in your home. We only recommend Equity Release Council approved plans with important safeguards:",
    links: [
      { label: "Equity Release Guide", href: "/equity-release" },
      { label: "How Much Could I Release?", href: "/equity-release/calculator" },
      { label: "Free Consultation", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["self employed", "self-employed", "contractor", "freelance", "own business", "director"],
    response: "Self-employed mortgages can be more complex, but we have plenty of experience helping business owners, contractors and freelancers secure great deals:",
    links: [
      { label: "Self-Employed Mortgages", href: "/self-employed" },
      { label: "Speak to an Expert", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["calculator", "afford", "borrow", "how much", "payment", "monthly"],
    response: "Great question! Our calculators can help you understand your budget and monthly payments. Try these tools:",
    links: [
      { label: "Mortgage Calculator", href: "/calculator" },
      { label: "Stamp Duty Calculator", href: "/calculator" },
      { label: "Affordability Check", href: "/calculator" },
    ],
  },
  {
    keywords: ["speak", "advisor", "call", "talk", "phone", "contact", "book", "appointment"],
    response: "I'd be happy to arrange a call with one of our mortgage experts. They're available Mon-Sat and can call at a time that suits you:",
    links: [
      { label: "Book a Call", href: "/book-a-call" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    keywords: ["stamp duty", "sdlt", "tax"],
    response: "Stamp duty can be a significant cost when buying. First-time buyers get relief on properties up to £425,000. Use our calculator to see what you'd pay:",
    links: [
      { label: "Stamp Duty Calculator", href: "/calculator" },
      { label: "First Time Buyer Info", href: "/first-time-buyer" },
    ],
  },
  {
    keywords: ["rate", "rates", "interest", "best rate"],
    response: "Mortgage rates change frequently. As a whole-of-market broker, we compare rates from 90+ lenders to find you the best deal. Here's what you can do:",
    links: [
      { label: "Get Personalised Rates", href: "/apply" },
      { label: "Book a Call", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["moving home", "moving", "new house", "buying"],
    response: "Moving home is exciting! Whether you're porting your mortgage or getting a new one, we can help you find the best deal:",
    links: [
      { label: "Start Your Application", href: "/apply" },
      { label: "Mortgage Calculator", href: "/calculator" },
      { label: "Book a Call", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["help", "guide", "advice", "information", "learn"],
    response: "Here are some resources that might help you understand your options better:",
    links: [
      { label: "Mortgage Guides", href: "/guides" },
      { label: "Calculator Tools", href: "/calculator" },
      { label: "Book Free Advice", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["product transfer", "same lender", "stay with", "existing lender", "current lender"],
    response: "A product transfer lets you switch to a new deal with your current lender - often without a full application! Our service for product transfers is completely free:",
    links: [
      { label: "Product Transfer Info", href: "/product-transfer" },
      { label: "Check Your Options", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["deposit", "how much deposit", "save deposit", "5%", "10%", "95%"],
    response: "Deposit requirements vary - some lenders accept as little as 5%, though 10-15% typically gets better rates. Let me help you understand your options:",
    links: [
      { label: "Affordability Calculator", href: "/calculator" },
      { label: "First Time Buyer Guide", href: "/first-time-buyer" },
      { label: "Speak to an Advisor", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["document", "paperwork", "need to provide", "what do i need", "id", "proof"],
    response: "You'll typically need ID, proof of income (payslips or accounts if self-employed), bank statements, and proof of deposit. We'll guide you through exactly what's needed:",
    links: [
      { label: "Start Application", href: "/apply" },
      { label: "Book a Call", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["how long", "timeline", "time take", "weeks", "days", "quick"],
    response: "A typical mortgage takes 4-8 weeks from application to completion, but we work hard to speed things up. Complex cases may take longer. Let's discuss your situation:",
    links: [
      { label: "Start Your Application", href: "/apply" },
      { label: "Book a Call", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["fee", "cost", "charge", "how much do you", "broker fee", "free"],
    response: "Great news! Our remortgage and product transfer service is completely FREE - we're paid by the lender. For purchases, any fees are discussed upfront with no surprises:",
    links: [
      { label: "Get Started Free", href: "/apply" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    keywords: ["mip", "mortgage in principle", "agreement in principle", "aip", "decision in principle"],
    response: "A Mortgage in Principle (MIP) shows sellers you're serious and can help with offers. We can often get you one within 24 hours:",
    links: [
      { label: "Get Your MIP", href: "/mortgage-in-principle" },
      { label: "Start Application", href: "/apply" },
    ],
  },
  {
    keywords: ["joint", "partner", "spouse", "together", "both of us", "couple"],
    response: "Joint mortgages combine both incomes, potentially letting you borrow more. We can help you understand how joint applications work:",
    links: [
      { label: "Affordability Calculator", href: "/calculator" },
      { label: "Book a Call", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["shared ownership", "part buy", "help to buy", "government scheme", "shared"],
    response: "Shared ownership and government schemes can help you get on the ladder with a smaller deposit. Let's explore your options:",
    links: [
      { label: "First Time Buyer Info", href: "/first-time-buyer" },
      { label: "Speak to an Expert", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["divorce", "separation", "split", "ex", "buying out"],
    response: "Divorce or separation mortgages can be complex, but we have experience helping people in this situation. We'll handle it sensitively:",
    links: [
      { label: "Speak to a Specialist", href: "/book-a-call" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    keywords: ["gift", "gifted deposit", "parents", "family help", "bank of mum"],
    response: "Many buyers get help from family with their deposit. Most lenders accept gifted deposits - we'll explain what's needed:",
    links: [
      { label: "First Time Buyer Guide", href: "/first-time-buyer" },
      { label: "Book a Call", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["new build", "newbuild", "new home", "developer", "off plan"],
    response: "New build mortgages have specific requirements and timelines. We work with lenders experienced in new builds:",
    links: [
      { label: "Start Application", href: "/apply" },
      { label: "Speak to an Expert", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["what happens", "next step", "process", "how does it work", "what now"],
    response: "Here's how our process works: 1) Quick online form, 2) Free consultation call, 3) We search 90+ lenders, 4) Handle your application. Simple!",
    links: [
      { label: "Start Now", href: "/apply" },
      { label: "Book a Call First", href: "/book-a-call" },
      { label: "See How It Works", href: "/#how-it-works" },
    ],
  },
  {
    keywords: ["thank", "thanks", "cheers", "great", "helpful", "appreciate"],
    response: "You're welcome! Is there anything else I can help you with? Feel free to ask another question or book a call with our experts:",
    links: [
      { label: "Book a Free Call", href: "/book-a-call" },
    ],
  },
  {
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon"],
    response: "Hello! Welcome to Apply Wise. I'm here to help with your mortgage questions. What would you like to know about?",
    links: [
      { label: "First Time Buyers", href: "/first-time-buyer" },
      { label: "Remortgage", href: "/remortgage" },
      { label: "Calculator", href: "/calculator" },
      { label: "Book a Call", href: "/book-a-call" },
    ],
  },
];

function getIntelligentResponse(message: string): { response: string; links?: { label: string; href: string }[]; captureInfo?: boolean } {
  const lower = message.toLowerCase();

  // Check each response config
  for (const config of responseConfigs) {
    if (config.keywords.some(keyword => lower.includes(keyword))) {
      return {
        response: config.response,
        links: config.links,
        captureInfo: config.captureInfo,
      };
    }
  }

  // Default response - capture their info
  return {
    response: "I'm not sure I fully understand your question, but I want to make sure you get the help you need. Let me take your details and one of our mortgage experts will get back to you personally.",
    captureInfo: true,
  };
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({ name: "", phone: "", email: "", query: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [lastUserQuery, setLastUserQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showLeadForm]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Store tracking data on mount
  useEffect(() => {
    storeTrackingData();
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setLastUserQuery(text.trim());

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Get intelligent response
    setTimeout(() => {
      const { response, links, captureInfo } = getIntelligentResponse(text);

      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        text: response,
        sender: "agent",
        timestamp: new Date(),
        links,
        showLeadForm: captureInfo,
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);

      if (captureInfo) {
        setShowLeadForm(true);
        setLeadData(prev => ({ ...prev, query: text.trim() }));
      }

      if (!isOpen) {
        setHasUnread(true);
      }
    }, 1000 + Math.random() * 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    // Get tracking data for lead attribution
    const tracking = getStoredTrackingData();

    try {
      const response = await fetch("/api/chat-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadData,
          ...tracking,
          source: "chatbot",
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLeadSubmitted(true);
        setShowLeadForm(false);

        const thankYouMessage: Message = {
          id: `agent-thanks-${Date.now()}`,
          text: `Thanks ${leadData.name.split(" ")[0]}! I've passed your details to our team. Someone will be in touch very soon at ${leadData.phone}. In the meantime, feel free to browse our resources:`,
          sender: "agent",
          timestamp: new Date(),
          links: [
            { label: "Mortgage Calculator", href: "/calculator" },
            { label: "Our Guides", href: "/guides" },
          ],
        };
        setMessages((prev) => [...prev, thankYouMessage]);
      } else {
        alert("Sorry, something went wrong. Please try again or call us on 01992 535 555.");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      alert("Sorry, something went wrong. Please try again or call us on 01992 535 555.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  const handleRequestCallback = () => {
    setShowLeadForm(true);
    const callbackMessage: Message = {
      id: `agent-callback-${Date.now()}`,
      text: "I'd be happy to arrange for someone to call you back. Please share your details:",
      sender: "agent",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, callbackMessage]);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-navy rounded-full shadow-2xl flex items-center justify-center hover:bg-navy-deep transition-colors group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread indicator */}
        {hasUnread && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center"
          >
            <span className="text-navy text-xs font-bold">1</span>
          </motion.span>
        )}

        {/* Pulse animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-navy animate-ping opacity-20" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-navy/10"
          >
            {/* Header */}
            <div className="bg-navy p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-navy rounded-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">Apply Wise Assistant</h3>
                  <p className="text-white/60 text-xs">Here to help with your mortgage</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-pearl/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      message.sender === "user"
                        ? "bg-navy text-white rounded-br-md"
                        : "bg-white text-navy border border-navy/10 rounded-bl-md shadow-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>

                    {/* Links */}
                    {message.links && message.links.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.links.map((link, index) => (
                          <Link
                            key={index}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 text-sm text-gold hover:text-gold/80 transition-colors group"
                          >
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <span className="group-hover:underline">{link.label}</span>
                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    )}

                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/50" : "text-navy/40"}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Lead Capture Form */}
              {showLeadForm && !leadSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gold/30 rounded-xl p-4 shadow-sm"
                >
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-pearl border border-navy/10 rounded-lg text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone number"
                        value={leadData.phone}
                        onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-pearl border border-navy/10 rounded-lg text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={leadData.email}
                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-pearl border border-navy/10 rounded-lg text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold/50"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Tell us more about what you need (optional)"
                        rows={2}
                        value={leadData.query}
                        onChange={(e) => setLeadData({ ...leadData, query: e.target.value })}
                        className="w-full px-3 py-2 bg-pearl border border-navy/10 rounded-lg text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold/50 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="w-full py-2.5 bg-gold text-navy font-semibold text-sm rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmittingLead ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Request Callback
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-navy border border-navy/10 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && !showLeadForm && (
              <div className="px-4 pb-3 pt-1 bg-pearl/30 border-t border-navy/5">
                <p className="text-xs text-navy/50 mb-2">I can help with:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1.5 bg-white border border-gold/30 rounded-full text-xs text-navy hover:border-gold hover:bg-gold/5 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Request callback button when needed */}
            {!showLeadForm && messages.length > 1 && !leadSubmitted && (
              <div className="px-4 py-2 bg-pearl/30 border-t border-navy/5">
                <button
                  onClick={handleRequestCallback}
                  className="w-full py-2 text-xs text-gold font-medium hover:underline flex items-center justify-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Prefer a callback? Click here
                </button>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-navy/5">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2.5 bg-pearl/50 border border-navy/10 rounded-full text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all"
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
              <p className="text-[10px] text-navy/30 text-center mt-2">
                Or call us: <a href="tel:01992535555" className="text-gold hover:underline">01992 535 555</a>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
