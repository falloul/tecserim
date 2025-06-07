"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import getContent from "@/utils/content";

const Projects = () => {
  const { language } = useLanguage();
  const content = getContent(language).projects;

  return (
    <section className="py-20 bg-white" id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-800">{content.title}</h2>
        <div className="w-20 h-1 bg-red-500 mx-auto mb-6 rounded-full"></div>
        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          {content.subtitle}
        </p>
        
        <div className="space-y-16">
          {/* Marketing Campaigns */}
          {content.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold mb-6 text-blue-700">{section.title}</h3>
              
              {section.items && (
                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-l-4 border-blue-500 pl-6 py-2">
                      <h4 className="text-lg font-medium mb-2 text-gray-800">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {section.columns && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium mb-4 text-gray-800">{column.title}</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 