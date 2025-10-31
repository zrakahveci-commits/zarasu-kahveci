import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.skills': 'Fähigkeiten',
    'nav.resume': 'Lebenslauf',
    'nav.references': 'Referenzen',
    'nav.downloads': 'Downloads',
    'nav.contact': 'Kontakt',
    
    // Home Page
    'home.greeting': 'Hallo, ich bin',
    'home.name': 'Zarasu Kahveci',
    'home.age': '15 Jahre',
    'home.goal': 'Zukünftiger Lehrling',
    'home.intro': 'Ich bin eine motivierte Schülerin mit Leidenschaft für Technik und kreatives Problemlösen.',
    'home.overview.title': 'Über diese Website',
    'home.overview.text': 'Erfahre mehr über mich, meine Interessen und meine Motivation. Diese Portfolio-Website gibt Ihnen einen umfassenden Einblick in meine Fähigkeiten und meinen Werdegang.',
    'home.cta.about': 'Mehr über mich',
    'home.cta.contact': 'Kontakt aufnehmen',
    
    // About Page
    'about.title': 'Über mich',
    'about.subtitle': 'Wer ich bin',
    'about.bio.title': 'Meine Geschichte',
    'about.bio.text': 'Ich besuche derzeit die 9. Klasse der Seebelschule Pfungen und bin auf der Suche nach einer spannenden Lehrstelle. Meine Interessen liegen vor allem in technischen Bereichen. Neben der Schule engagiere ich mich in verschiedenen Projekten und bin immer bereit, Neues zu lernen.',
    'about.languages.title': 'Sprachen',
    'about.languages.turkish': 'Türkisch (1. Muttersprache)',
    'about.languages.german': 'Deutsch (2. Muttersprache)',
    'about.languages.english': 'Englisch (fliessend, sehr gut)',
    'about.languages.french': 'Französisch (5 Jahre Schulkenntnisse)',
    'about.school.title': 'Ausbildung',
    'about.school.current': 'Seebel Pfungen, 9. Klasse',
    'about.school.expected': 'Voraussichtlicher Abschluss: 2026',
    'about.strengths.title': 'Meine Stärken',
    'about.strength.1': 'Teamfähigkeit – Ich arbeite gerne mit anderen zusammen',
    'about.strength.2': 'Lernbereitschaft – Ich bin offen für neue Herausforderungen',
    'about.strength.3': 'Genauigkeit – Ich arbeite präzise und sorgfältig',
    'about.strength.4': 'Zuverlässigkeit – Auf mich kann man sich verlassen',
    'about.hobbies.title': 'Hobbys & Interessen',
    'about.hobby.1': 'Gitarre',
    'about.hobby.2': 'Programmieren',
    'about.hobby.3': 'Bücher lesen',
    'about.hobby.4': 'Nähen & Designen',
    
    // Skills Page
    'skills.title': 'Meine Fähigkeiten',
    'skills.subtitle': 'Was mich auszeichnet',
    'skills.technical.title': 'Fachliche Fähigkeiten',
    'skills.technical.1': 'Grundkenntnisse Python, HTML & CSS',
    'skills.technical.2': 'Capcut',
    'skills.technical.3': 'Microsoft Office (Word, Excel, PowerPoint)',
    'skills.technical.4': 'Canva',
    'skills.soft.title': 'Soft Skills',
    'skills.soft.1': 'Teamarbeit',
    'skills.soft.2': 'Zuverlässigkeit',
    'skills.soft.3': 'Kreativität',
    'skills.soft.4': 'Problemlösungsfähigkeit',
    'skills.soft.5': 'Zeitmanagement',
    'skills.soft.6': 'Kommunikationsfähigkeit',
    
    // Resume Page
    'resume.title': 'Lebenslauf',
    'resume.subtitle': 'Mein Werdegang',
    'resume.download.title': 'Lebenslauf herunterladen',
    'resume.download.text': '',
    'resume.download.button': 'PDF herunterladen',
    'resume.contact.title': 'Kontaktinformationen',
    'resume.contact.email': 'zrakahveci@gmail.com',
    'resume.contact.phone': '+41 78 940 05 04',
    'resume.contact.location': 'Pfungen, Schweiz',
    'resume.motivation.title': 'Meine Motivation',
    'resume.motivation.text': 'Ich suche eine Lehrstelle, in der ich meine technischen Fähigkeiten einbringen und weiterentwickeln kann. Besonders wichtig sind mir ein gutes Arbeitsklima, interessante Projekte und die Möglichkeit, von erfahrenen Fachkräften zu lernen. Ich bin hochmotiviert, zuverlässig und freue mich darauf, praktische Erfahrungen zu sammeln und einen wertvollen Beitrag zu Ihrem Team zu leisten.',
    'resume.timeline.title': 'Werdegang',
    'resume.timeline.2023': '2023 - 2026: Schulhaus Seebel Sek A',
    'resume.timeline.2017': '2017 - 2023: Schulhaus Breiteacker',
    
    // References Page
    'references.title': 'Referenzen',
    'references.subtitle': '',
    'references.ref1.name': 'Stefan Spühler',
    'references.ref1.position': 'Klassenlehrperson',
    'references.ref1.text': 'Für Referenzen stehe ich gerne zur Verfügung.',
    'references.ref1.email': 'stefan.spuehler@schulepfungen.ch',
    'references.ref1.phone': '+41 79 757 06 39',
    
    // Downloads Page
    'downloads.title': 'Downloads',
    'downloads.subtitle': 'Dokumente & Zeugnisse',
    'downloads.intro': 'Hier können Sie wichtige Dokumente herunterladen:',
    'downloads.cv.title': 'Lebenslauf',
    'downloads.cv.desc': 'Vollständiger Lebenslauf als PDF',
    'downloads.cv.button': 'Lebenslauf herunterladen',
    'downloads.multicheck.title': 'Multicheck',
    'downloads.multicheck.desc': 'Multicheck als PDF',
    'downloads.multicheck.button': 'Multicheck herunterladen',
    'downloads.certificates.title': 'Schulzeugnisse',
    'downloads.certificates.desc': 'Alle Zeugnisse',
    'downloads.certificates.semester1_1': '1. Sek Semester 1',
    'downloads.certificates.semester1_2': '1. Sek Semester 2',
    'downloads.certificates.semester2_1': '2. Sek Semester 1',
    'downloads.certificates.semester2_2': '2. Sek Semester 2',
    
    // Contact Page
    'contact.title': 'Kontakt',
    'contact.subtitle': 'Kontaktieren Sie mich',
    'contact.intro': 'Vielen Dank für Ihr Interesse! Ich freue mich auf Ihre Nachricht.',
    'contact.form.name': 'Name',
    'contact.form.email': 'E-Mail',
    'contact.form.subject': 'Betreff',
    'contact.form.message': 'Nachricht',
    'contact.form.send': 'Nachricht senden',
    'contact.form.success': 'Vielen Dank für Ihre Nachricht! Ich werde mich schnellstmöglich bei Ihnen melden.',
    'contact.info.title': 'Kontaktinformationen',
    'contact.info.email': 'zrakahveci@gmail.com',
    'contact.info.phone': '+41 78 940 05 04',
    'contact.info.phoneLabel': 'Telefon',
    'contact.info.location': 'Pfungen, Schweiz',
    'contact.info.locationLabel': 'Standort',
    'contact.outro': 'Vielen Dank für Ihre Zeit – ich freue mich auf Ihre Rückmeldung!',
    
    // Footer
    'footer.rights': '© 2025 Zarasu Kahveci. Alle Rechte vorbehalten.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.skills': 'Skills',
    'nav.resume': 'Resume',
    'nav.references': 'References',
    'nav.downloads': 'Downloads',
    'nav.contact': 'Contact',
    
    // Home Page
    'home.greeting': 'Hello, I am',
    'home.name': 'Zarasu Kahveci',
    'home.age': '15 years old',
    'home.goal': 'Future Apprentice',
    'home.intro': 'I am a motivated student with a passion for technology and creative problem-solving.',
    'home.overview.title': 'About This Website',
    'home.overview.text': 'Learn more about me, my projects, and my motivation. This portfolio website gives you a comprehensive insight into my skills and background.',
    'home.cta.about': 'More About Me',
    'home.cta.contact': 'Get in Touch',
    
    // About Page
    'about.title': 'About Me',
    'about.subtitle': 'Who I Am',
    'about.bio.title': 'My Story',
    'about.bio.text': 'I am currently in 9th grade at Secondary School Seebel Pfungen and am looking for an exciting apprenticeship. My interests lie primarily in technical areas. Outside of school, I engage in various projects and am always ready to learn something new.',
    'about.languages.title': 'Languages',
    'about.languages.turkish': 'Turkish (1st Native Language)',
    'about.languages.german': 'German (2nd Native Language)',
    'about.languages.english': 'English (Fluent, Very Good)',
    'about.languages.french': 'French (5 Years School Knowledge)',
    'about.school.title': 'Education',
    'about.school.current': 'Secondary school Seebel Pfungen, 9th Grade',
    'about.school.expected': 'Expected Graduation: 2026',
    'about.strengths.title': 'My Strengths',
    'about.strength.1': 'Teamwork – I enjoy working with others',
    'about.strength.2': 'Willingness to Learn – I am open to new challenges',
    'about.strength.3': 'Accuracy – I work precisely and carefully',
    'about.strength.4': 'Reliability – You can count on me',
    'about.hobbies.title': 'Hobbies & Interests',
    'about.hobby.1': 'Guitar',
    'about.hobby.2': 'Programming',
    'about.hobby.3': 'Reading books',
    'about.hobby.4': 'Sewing and designing',
    
    // Skills Page
    'skills.title': 'My Skills',
    'skills.subtitle': 'What sets me apart',
    'skills.technical.title': 'Technical Skills',
    'skills.technical.1': 'Basic Python, HTML & CSS knowledge',
    'skills.technical.2': 'Capcut',
    'skills.technical.3': 'Microsoft Office (Word, Excel, PowerPoint)',
    'skills.technical.4': 'Canva',
    'skills.soft.title': 'Soft Skills',
    'skills.soft.1': 'Teamwork',
    'skills.soft.2': 'Reliability',
    'skills.soft.3': 'Creativity',
    'skills.soft.4': 'Problem-solving',
    'skills.soft.5': 'Time Management',
    'skills.soft.6': 'Communication Skills',
    
    // Resume Page
    'resume.title': 'Resume',
    'resume.subtitle': 'My Background',
    'resume.download.title': 'Download Resume',
    'resume.download.text': '',
    'resume.download.button': 'Download PDF',
    'resume.contact.title': 'Contact Information',
    'resume.contact.email': 'zrakahveci@gmail.com',
    'resume.contact.phone': '+41 78 940 05 04',
    'resume.contact.location': 'Pfungen, Switzerland',
    'resume.motivation.title': 'My Motivation',
    'resume.motivation.text': 'I am looking for an apprenticeship where I can apply and develop my technical skills. A good work environment, interesting projects, and the opportunity to learn from experienced professionals are particularly important to me. I am highly motivated, reliable, and look forward to gaining practical experience and making a valuable contribution to your team.',
    'resume.timeline.title': 'Timeline',
    'resume.timeline.2023': '2023 - 2026: Secondary school Seebel ( Sek A )',
    'resume.timeline.2017': '2017 - 2023: Elementary School Breiteacker',
    
    // References Page
    'references.title': 'References',
    'references.subtitle': '',
    'references.ref1.name': 'Stefan Spühler',
    'references.ref1.position': 'Class teacher',
    'references.ref1.text': 'Available for references upon request.',
    'references.ref1.email': 'stefan.spuehler@schulepfungen.ch',
    'references.ref1.phone': '+41 79 757 06 39',
    
    // Downloads Page
    'downloads.title': 'Downloads',
    'downloads.subtitle': 'Documents & Certificates',
    'downloads.intro': 'Here you can download important documents:',
    'downloads.cv.title': 'Resume',
    'downloads.cv.desc': 'Complete resume as PDF',
    'downloads.cv.button': 'Download Resume',
    'downloads.multicheck.title': 'Multicheck',
    'downloads.multicheck.desc': 'Multicheck as PDF',
    'downloads.multicheck.button': 'Download Multicheck',
    'downloads.certificates.title': 'School Certificates',
    'downloads.certificates.desc': 'All certificates',
    'downloads.certificates.semester1_1': '1st Secondary School Semester 1',
    'downloads.certificates.semester1_2': '1st Secondary School Semester 2',
    'downloads.certificates.semester2_1': '2nd Secondary School Semester 1',
    'downloads.certificates.semester2_2': '2nd Secondary School Semester 2',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Write to Me',
    'contact.intro': 'Thank you for your interest! I look forward to your message.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.success': 'Thank you for your message! I will get back to you as soon as possible.',
    'contact.info.title': 'Contact Information',
    'contact.info.email': 'zrakahveci@gmail.com',
    'contact.info.phone': '+41 78 940 05 04',
    'contact.info.phoneLabel': 'Phone',
    'contact.info.location': 'Pfungen, Switzerland',
    'contact.info.locationLabel': 'Location',
    'contact.outro': 'Thank you for your time – I look forward to hearing from you!',
    
    // Footer
    'footer.rights': '© 2025 Zarasu Kahveci. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.de] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
