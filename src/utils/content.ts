import content from '../data/content.json';

type Language = 'en' | 'fr';

export const getContent = (language: Language = 'fr') => {
  return content[language];
};

export default getContent; 