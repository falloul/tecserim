"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import getContent from "@/utils/content";

const Footer = () => {
  const { language } = useLanguage();
  const content = getContent(language).footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p>&copy; {currentYear} {content.copyright}</p>
          </div>
          {/* <div className="flex space-x-6">
            {content.links.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="hover:text-teal-300 transition"
              >
                {link.text}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 