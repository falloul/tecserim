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
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset status
    setStatus({
      submitting: true,
      submitted: false,
      success: false,
      error: ""
    });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Success
      setStatus({
        submitting: false,
        submitted: true,
        success: true,
        error: ""
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
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
        <div className="w-20 h-1 bg-teal-300 mx-auto mb-16 rounded-full"></div>
        
        <div className="flex flex-col md:flex-row md:space-x-12 max-w-5xl mx-auto">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h3 className="text-xl font-semibold mb-6 text-teal-200">{content.info.title}</h3>
            <div className="space-y-4 bg-teal-800/40 p-6 rounded-lg backdrop-blur-sm">
              <p className="font-bold text-xl">{content.info.company}</p>
              <div className="space-y-3">
                <p className="flex items-start">
                  <svg className="h-5 w-5 mr-3 mt-1 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {content.info.address}
                </p>
                <p className="flex items-start">
                  <svg className="h-5 w-5 mr-3 mt-1 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {content.info.tel}
                </p>
                <p className="flex items-start">
                  <svg className="h-5 w-5 mr-3 mt-1 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {content.info.email}
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-6 text-teal-200">{content.form.title}</h3>
            
            {/* Success Message */}
            {status.submitted && status.success && (
              <div className="bg-green-500/20 border border-green-400 rounded-md p-4 mb-6 backdrop-blur-sm">
                <p className="text-white font-medium">
                  {language === 'en' 
                    ? 'Your message has been sent successfully!'
                    : 'Votre message a été envoyé avec succès!'}
                </p>
              </div>
            )}
            
            {/* Error Message */}
            {status.submitted && !status.success && (
              <div className="bg-red-500/20 border border-red-400 rounded-md p-4 mb-6 backdrop-blur-sm">
                <p className="text-white font-medium">
                  {language === 'en' 
                    ? `Error: ${status.error}`
                    : `Erreur: ${status.error}`}
                </p>
              </div>
            )}
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={content.form.namePlaceholder} 
                  className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-teal-400/30 text-white placeholder-teal-200/70 focus:outline-none focus:ring-2 focus:ring-teal-300/50" 
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={content.form.emailPlaceholder} 
                  className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-teal-400/30 text-white placeholder-teal-200/70 focus:outline-none focus:ring-2 focus:ring-teal-300/50" 
                  required
                />
              </div>
              <div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={content.form.messagePlaceholder} 
                  rows={4} 
                  className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-teal-400/30 text-white placeholder-teal-200/70 focus:outline-none focus:ring-2 focus:ring-teal-300/50"
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status.submitting}
                className={`bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-teal-50 transition transform hover:scale-105 shadow-lg ${status.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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