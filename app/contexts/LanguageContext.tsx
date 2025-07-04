"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "bn"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations = {
  en: {
    // Header
    "header.company": "LegalConsult BD",
    "header.phone": "+880-191-321-0664",
    "header.bookNow": "Book Now",
    "header.callNow": "📞 Call Now",
    "header.bookConsultation": "Book Consultation",

    // Hero Section
    "hero.title1": "Legal Help Made",
    "hero.title2": "Simple",
    "hero.subtitle": "Expert legal services in Bangladesh. Get help in 30 minutes.",
    "hero.getConsultation": "Get Free Consultation",
    "hero.callNow": "Call Now",
    "hero.whatsapp": "WhatsApp",
    "hero.stat1": "✓ 500+ Happy Clients",
    "hero.stat2": "✓ 15+ Years Experience",
    "hero.stat3": "✓ 30min Response Time",

    // Quick Form
    "form.title": "Quick Consultation",
    "form.name": "Your Name",
    "form.phone": "Phone Number",
    "form.selectService": "Select Service",
    "form.companyReg": "Company Registration",
    "form.businessLaw": "Business Law",
    "form.taxVat": "Tax & VAT",
    "form.familyLaw": "Family Law",
    "form.propertyLaw": "Property Law",
    "form.courtCases": "Court Cases",
    "form.sendRequest": "Send Request",
    "form.cancel": "Cancel",
    "form.requestSent": "Request Sent!",
    "form.callBack": "We'll call you within 30 minutes",

    // Services
    "services.title": "Our Legal Services",
    "services.subtitle": "Choose your legal service and get instant help",
    "services.companyReg": "Company Registration",
    "services.companyRegSub": "RJSC • Trade License",
    "services.businessLaw": "Business Law",
    "services.businessLawSub": "Contracts • Agreements",
    "services.taxVat": "Tax & VAT",
    "services.taxVatSub": "NBR • TIN • Returns",
    "services.importExport": "Import/Export",
    "services.importExportSub": "EPB • IRC • Customs",
    "services.familyLaw": "Family Law",
    "services.familyLawSub": "Marriage • Divorce",
    "services.propertyLaw": "Property Law",
    "services.propertyLawSub": "Land • Registration",
    "services.digitalSecurity": "Digital Security",
    "services.digitalSecuritySub": "Cyber Law • Privacy",
    "services.courtCases": "Court Cases",
    "services.courtCasesSub": "Civil • Criminal",
    "services.getHelp": "Get Help Now",
    "services.quickCall": "Quick Call",
    "services.emergency": "🚨 Emergency Legal Help?",
    "services.emergencySub": "Available 24/7 for urgent matters",
    "services.emergencyCall": "Call Emergency Line",

    // Reviews
    "reviews.title": "What Our",
    "reviews.titleHighlight": "Clients Say",
    "reviews.subtitle": "Real experiences from clients who trusted us with their legal matters across Bangladesh",
    "reviews.stat1": "Happy Clients",
    "reviews.stat2": "Success Rate",
    "reviews.stat3": "Years Experience",
    "reviews.stat4": "Support Available",
    "reviews.ctaTitle": "Ready to Join Our Satisfied Clients?",
    "reviews.ctaSubtitle": "Get expert legal help for your business or personal matters",
    "reviews.ctaButton": "Get Your Free Consultation",
    "reviews.ctaCall": "Call Now: +880-191-321-0664",

    // Footer
    "footer.company": "LegalConsult BD",
    "footer.description": "Expert legal services in Bangladesh. Fast, reliable, affordable.",
    "footer.quickServices": "Quick Services",
    "footer.contact": "Contact",
    "footer.officeHours": "Office Hours",
    "footer.hours": "Mon-Sat: 9AM-6PM",
    "footer.emergency": "24/7 Emergency Line",
    "footer.emergencyCall": "Emergency Call",
    "footer.copyright": "© 2024 LegalConsult BD. All rights reserved.",

    // Chatbot
    "chat.title": "Legal Assistant",
    "chat.status": "Online • Quick Response",
    "chat.placeholder": "Type your question...",
    "chat.greeting": "Hi! I'm your legal assistant. How can I help you today?",
    "chat.bookConsultation": "Book Consultation",
    "chat.emergencyHelp": "Emergency Help",
    "chat.serviceInfo": "Service Info",
    "chat.callNow": "Call Now",
  },
  bn: {
    // Header
    "header.company": "লিগ্যাল কনসাল্ট বিডি",
    "header.phone": "+৮৮০-১৯১-৩২১-০৬৬৪",
    "header.bookNow": "বুক করুন",
    "header.callNow": "📞 এখনই কল করুন",
    "header.bookConsultation": "পরামর্শ বুক করুন",

    // Hero Section
    "hero.title1": "আইনি সহায়তা হয়েছে",
    "hero.title2": "সহজ",
    "hero.subtitle": "বাংলাদেশে বিশেষজ্ঞ আইনি সেবা। ৩০ মিনিটে সহায়তা পান।",
    "hero.getConsultation": "বিনামূল্যে পরামর্শ নিন",
    "hero.callNow": "এখনই কল করুন",
    "hero.whatsapp": "হোয়াটসঅ্যাপ",
    "hero.stat1": "✓ ৫০০+ সন্তুষ্ট ক্লায়েন্ট",
    "hero.stat2": "✓ ১৫+ বছরের অভিজ্ঞতা",
    "hero.stat3": "✓ ৩০ মিনিট রেসপন্স টাইম",

    // Quick Form
    "form.title": "দ্রুত পরামর্শ",
    "form.name": "আপনার নাম",
    "form.phone": "ফোন নম্বর",
    "form.selectService": "সেবা নির্বাচন করুন",
    "form.companyReg": "কোম্পানি নিবন্ধন",
    "form.businessLaw": "ব্যবসায়িক আইন",
    "form.taxVat": "ট্যাক্স ও ভ্যাট",
    "form.familyLaw": "পারিবারিক আইন",
    "form.propertyLaw": "সম্পত্তি আইন",
    "form.courtCases": "আদালতের মামলা",
    "form.sendRequest": "অনুরোধ পাঠান",
    "form.cancel": "বাতিল",
    "form.requestSent": "অনুরোধ পাঠানো হয়েছে!",
    "form.callBack": "আমরা ৩০ মিনিটের মধ্যে আপনাকে কল করব",

    // Services
    "services.title": "আমাদের আইনি সেবাসমূহ",
    "services.subtitle": "আপনার আইনি সেবা বেছে নিন এবং তাৎক্ষণিক সহায়তা পান",
    "services.companyReg": "কোম্পানি নিবন্ধন",
    "services.companyRegSub": "আরজেএসসি • ট্রেড লাইসেন্স",
    "services.businessLaw": "ব্যবসায়িক আইন",
    "services.businessLawSub": "চুক্তি • চুক্তিনামা",
    "services.taxVat": "ট্যাক্স ও ভ্যাট",
    "services.taxVatSub": "এনবিআর • টিআইএন • রিটার্ন",
    "services.importExport": "আমদানি/রপ্তানি",
    "services.importExportSub": "ইপিবি • আইআরসি • কাস্টমস",
    "services.familyLaw": "পারিবারিক আইন",
    "services.familyLawSub": "বিবাহ • তালাক",
    "services.propertyLaw": "সম্পত্তি আইন",
    "services.propertyLawSub": "জমি • নিবন্ধন",
    "services.digitalSecurity": "ডিজিটাল নিরাপত্তা",
    "services.digitalSecuritySub": "সাইবার আইন • গোপনীয়তা",
    "services.courtCases": "আদালতের মামলা",
    "services.courtCasesSub": "দেওয়ানি • ফৌজদারি",
    "services.getHelp": "এখনই সাহায্য নিন",
    "services.quickCall": "দ্রুত কল",
    "services.emergency": "🚨 জরুরি আইনি সহায়তা?",
    "services.emergencySub": "জরুরি বিষয়ের জন্য ২৪/৭ উপলব্ধ",
    "services.emergencyCall": "জরুরি লাইনে কল করুন",

    // Reviews
    "reviews.title": "আমাদের",
    "reviews.titleHighlight": "ক্লায়েন্টরা কী বলেন",
    "reviews.subtitle": "বাংলাদেশ জুড়ে যারা তাদের আইনি বিষয়ে আমাদের উপর আস্থা রেখেছেন তাদের প্রকৃত অভিজ্ঞতা",
    "reviews.stat1": "সন্তুষ্ট ক্লায়েন্ট",
    "reviews.stat2": "সফলতার হার",
    "reviews.stat3": "বছরের অভিজ্ঞতা",
    "reviews.stat4": "সাপোর্ট উপলব্ধ",
    "reviews.ctaTitle": "আমাদের সন্তুষ্ট ক্লায়েন্টদের সাথে যোগ দিতে প্রস্তুত?",
    "reviews.ctaSubtitle": "আপনার ব্যবসা বা ব্যক্তিগত বিষয়ে বিশেষজ্ঞ আইনি সহায়তা নিন",
    "reviews.ctaButton": "আপনার বিনামূল্যে পরামর্শ নিন",
    "reviews.ctaCall": "এখনই কল করুন: +৮৮০-১৯১-৩২১-০৬৬৪",

    // Footer
    "footer.company": "লিগ্যাল কনসাল্ট বিডি",
    "footer.description": "বাংলাদেশে বিশেষজ্ঞ আইনি সেবা। দ্রুত, নির্ভরযোগ্য, সাশ্রয়ী।",
    "footer.quickServices": "দ্রুত সেবা",
    "footer.contact": "যোগাযোগ",
    "footer.officeHours": "অফিস সময়",
    "footer.hours": "সোম-শনি: সকাল ৯টা-সন্ধ্যা ৬টা",
    "footer.emergency": "২৪/৭ জরুরি লাইন",
    "footer.emergencyCall": "জরুরি কল",
    "footer.copyright": "© ২০২৪ লিগ্যাল কনসাল্ট বিডি। সকল অধিকার সংরক্ষিত।",

    // Chatbot
    "chat.title": "আইনি সহায়ক",
    "chat.status": "অনলাইন • দ্রুত রেসপন্স",
    "chat.placeholder": "আপনার প্রশ্ন লিখুন...",
    "chat.greeting": "হ্যালো! আমি আপনার আইনি সহায়ক। আজ আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
    "chat.bookConsultation": "পরামর্শ বুক করুন",
    "chat.emergencyHelp": "জরুরি সাহায্য",
    "chat.serviceInfo": "সেবার তথ্য",
    "chat.callNow": "এখনই কল করুন",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
