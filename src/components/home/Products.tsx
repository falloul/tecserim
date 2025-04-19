"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import getContent from "@/utils/content";

const Products = () => {
  const { language } = useLanguage();
  const content = getContent(language).products;

  return (
    <section className="py-20 bg-gray-50" id="products">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-teal-800">{content.title}</h2>
        <div className="w-20 h-1 bg-teal-500 mx-auto mb-16 rounded-full"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-4 text-teal-700 border-b border-teal-100 pb-2">{category.title}</h3>
              <ul className="space-y-2 text-gray-700">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products; 