"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import getContent from "@/utils/content";

const Contact = () => {
  const { language } = useLanguage();
  const content = getContent(language).contact;
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    error: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset error state if user edits the form
    if (status.error) {
      setStatus(prev => ({ ...prev, error: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: language === 'en' ? 'Invalid email format' : 'Format email invalide'
      });
      return;
    }

    setStatus({ submitting: true, submitted: false, success: false, error: "" });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setStatus({
        submitting: false,
        submitted: true,
        success: true,
        error: ""
      });

      // Reset form on success
      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  return (
    <section className="py-20 bg-teal-700 text-white" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{content.title}</h2>
        
        <div className="flex flex-col md:flex-row md:space-x-12 max-w-5xl mx-auto">
          <div className="md:w-1/2 mb-12 md:mb-0">
            {/* Your contact info section (unchanged) */}
          </div>

          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-6 text-teal-200">{content.form.title}</h3>
            
            {/* Status messages */}
            {status.submitted && (
              <div className={`mb-6 p-4 rounded-md backdrop-blur-sm ${
                status.success 
                  ? "bg-green-500/20 border-green-400" 
                  : "bg-red-500/20 border-red-400"
              }`}>
                <p className="text-white font-medium">
                  {status.success
                    ? (language === 'en' ? 'Message sent!' : 'Message envoyé !')
                    : `Error: ${status.error}`}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={content.form.namePlaceholder}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-teal-400/30 text-white placeholder-teal-200/70 focus:ring-2 focus:ring-teal-300/50"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={content.form.emailPlaceholder}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-teal-400/30 text-white placeholder-teal-200/70 focus:ring-2 focus:ring-teal-300/50"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={content.form.messagePlaceholder}
                rows={4}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-teal-400/30 text-white placeholder-teal-200/70 focus:ring-2 focus:ring-teal-300/50"
                required
              />
              <button
                type="submit"
                disabled={status.submitting}
                className={`bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-teal-50 transition ${
                  status.submitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {status.submitting
                  ? (language === 'en' ? 'Sending...' : 'Envoi en cours...')
                  : content.form.buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;