"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import getContent from "@/utils/content";

const Hero = () => {
  const { language } = useLanguage();
  const content = getContent(language).hero;

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-32 bg-gradient-to-br from-blue-800 via-blue-700 to-red-600 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-400"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-emerald-400"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-blue-300"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{content.title}</h1>
            <h2 className="text-2xl md:text-3xl mb-6 opacity-90">{content.subtitle}</h2>
            <p className="text-xl mb-10 opacity-80">{content.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {content.buttons.map((button, index) => (
                <Link 
                  key={index}
                  href={button.href} 
                  className={`px-6 py-3 rounded-md font-medium transition transform hover:scale-105 ${
                    button.primary 
                      ? "bg-white text-red-800 hover:bg-gray-100" 
                      : "border border-white text-white hover:bg-red-600"
                  }`}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-2xl border border-white/20">
              <Image 
                src="/clima.webp" 
                alt="TECSERIM Logo" 
                width={500} 
                height={300}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 