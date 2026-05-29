"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <nav className="text-xs text-[#746d63] tracking-wide mb-6">
        <Link href="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0a0a0a]">Contact</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] mb-4">Get in Touch</h1>
        <p className="text-sm text-[#746d63] mb-10 max-w-xl">
          We would love to hear from you. Whether you have a question about our products, your order, or
          anything else, our team is here to help.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs tracking-[0.15em] uppercase text-[#0a0a0a] mb-1">Customer Service</h3>
              <p className="text-sm text-[#746d63]">hello@swanagems.com</p>
              <p className="text-sm text-[#746d63]">+1 (800) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xs tracking-[0.15em] uppercase text-[#0a0a0a] mb-1">Hours</h3>
              <p className="text-sm text-[#746d63]">Monday – Friday: 9am – 6pm EST</p>
              <p className="text-sm text-[#746d63]">Saturday: 10am – 4pm EST</p>
              <p className="text-sm text-[#746d63]">Sunday: Closed</p>
            </div>
            <div>
              <h3 className="text-xs tracking-[0.15em] uppercase text-[#0a0a0a] mb-1">Visit Us</h3>
              <p className="text-sm text-[#746d63]">123 Jewelry Lane, Suite 100</p>
              <p className="text-sm text-[#746d63]">New York, NY 10001</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">Name</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">Email</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs tracking-[0.1em] uppercase text-[#0a0a0a] mb-1">Message</label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d4cfc8] text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors resize-none"
              />
            </div>

            {status === "success" && (
              <p className="text-sm text-green-700 bg-green-50 px-4 py-3">Message sent successfully! We will get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-700 bg-red-50 px-4 py-3">Something went wrong. Please try again or email us directly.</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-[0.1em] uppercase hover:bg-[#3c3c3c] transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
