import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import ReviewSection from './components/ReviewSection';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        <ServicesGrid />
        <ReviewSection />
        <Footer />
        <Chatbot />
      </div>
    </LanguageProvider>
  );
}

export default App; 