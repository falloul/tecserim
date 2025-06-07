"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import getContent from "@/utils/content";

const About = () => {
  const { language } = useLanguage();
  const content = getContent(language).about;

  return (
    <section className="py-20 bg-gray-50" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-800">{content.title}</h2>
        <div className="w-20 h-1 bg-red-500 mx-auto mb-12 rounded-full"></div>
        
        <div className="max-w-4xl mx-auto">
          {content.paragraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className={`text-lg text-gray-700 ${index < content.paragraphs.length - 1 ? 'mb-6' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 