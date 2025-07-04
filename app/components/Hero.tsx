"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, Phone, MessageCircle, CheckCircle } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export default function Hero() {
  const [showQuickForm, setShowQuickForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleQuickConsultation = () => {
    setShowQuickForm(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setShowQuickForm(false)
    }, 2000)
  }

  return (
    <section className="pt-16 bg-white relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center space-y-12">
          {/* Main Heading with staggered animation */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
              <span
                className={`block transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {t("hero.title1")}
              </span>
              <span
                className={`text-blue-600 block transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {t("hero.title2")}
              </span>
            </h1>
            <p
              className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Action Buttons with animation */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Primary CTA Button */}
            <button
              onClick={handleQuickConsultation}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold flex items-center justify-center group hover:scale-105 hover:shadow-lg transform w-full sm:w-auto"
            >
              {t("hero.getConsultation")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Secondary Action Buttons */}
            <div className="flex gap-3 w-full sm:w-auto">
              <a
                href="tel:+8801913210664"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center hover:scale-105 transform shadow-md hover:shadow-lg group flex-1 sm:flex-none"
              >
                <div className="relative mr-2">
                  <Phone className="h-5 w-5 group-hover:animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                {t("hero.callNow")}
              </a>
              <a
                href="https://wa.me/8801913210664"
                className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold flex items-center justify-center hover:scale-105 transform shadow-md hover:shadow-lg flex-1 sm:flex-none"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("hero.whatsapp")}
              </a>
            </div>
          </div>

          {/* Simple Stats with animation */}
          <div
            className={`flex justify-center items-center space-x-8 pt-8 text-sm text-gray-600 transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="hover:text-blue-600 transition-colors duration-300 cursor-default">{t("hero.stat1")}</div>
            <div className="hover:text-blue-600 transition-colors duration-300 cursor-default">{t("hero.stat2")}</div>
            <div className="hover:text-blue-600 transition-colors duration-300 cursor-default">{t("hero.stat3")}</div>
          </div>
        </div>
      </div>

      {/* Quick Consultation Modal with animation */}
      {showQuickForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl p-8 max-w-md w-full animate-scale-in">
            {formSubmitted ? (
              <div className="text-center animate-fade-in">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("form.requestSent")}</h3>
                <p className="text-gray-600">{t("form.callBack")}</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("form.title")}</h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder={t("form.name")}
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <input
                    type="tel"
                    placeholder={t("form.phone")}
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <select
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    <option value="">{t("form.selectService")}</option>
                    <option value="Company Registration">{t("form.companyReg")}</option>
                    <option value="Business Law">{t("form.businessLaw")}</option>
                    <option value="Tax & VAT">{t("form.taxVat")}</option>
                    <option value="Family Law">{t("form.familyLaw")}</option>
                    <option value="Property Law">{t("form.propertyLaw")}</option>
                    <option value="Court Cases">{t("form.courtCases")}</option>
                  </select>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold hover:scale-105 transform"
                    >
                      {t("form.sendRequest")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuickForm(false)}
                      className="px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                    >
                      {t("form.cancel")}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(1deg); }
          66% { transform: translate(-20px, 20px) rotate(-1deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </section>
  )
}
