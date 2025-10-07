import { useState, useEffect } from "react"
import { ArrowRight, Phone, MessageCircle, CheckCircle, Loader2, Calendar, Clock } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useCreateInquiry, useServices } from "../hooks/useServices"

export default function Hero() {
  const [showQuickForm, setShowQuickForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredTime: '',
    urgency: 'normal'
  })
  const { t } = useLanguage()
  const createInquiry = useCreateInquiry()
  const { data: services } = useServices()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleQuickConsultation = () => {
    setShowQuickForm(true)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await createInquiry.mutateAsync({
        name: formData.name,
        email: formData.email || 'noreply@example.com',
        phone: formData.phone,
        company: '',
        message: `Service: ${formData.service}\nPreferred Time: ${formData.preferredTime}\nUrgency: ${formData.urgency}\nAdditional Info: ${formData.message}`,
        service: services?.find(s => s.title === formData.service)?.id || null
      })
      
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setShowQuickForm(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          preferredTime: '',
          urgency: 'normal'
        })
      }, 3000)
    } catch (error) {
      console.error('Error submitting consultation request:', error)
      alert('Failed to submit your request. Please try again or call us directly.')
    }
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
          <div className="bg-white rounded-xl p-8 max-w-lg w-full animate-scale-in max-h-[90vh] overflow-y-auto">
            {formSubmitted ? (
              <div className="text-center animate-fade-in">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">✅ Request Sent Successfully!</h3>
                <p className="text-gray-600 mb-4">We'll call you within 2 hours for your free consultation.</p>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-green-800">📞 For urgent matters, call: +880 1913-210664</p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Free Legal Consultation</h3>
                <p className="text-sm text-gray-600 mb-6">Fill this quick form and we'll call you within 2 hours</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Name and Phone in one row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email (Optional)"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    <option value="">Select Service You Need *</option>
                    {services?.map(service => (
                      <option key={service.id} value={service.title}>
                        {service.title} - ৳{service.price}
                      </option>
                    )) || [
                      <option key="1" value="Company Registration">Company Registration</option>,
                      <option key="2" value="Business Law">Business Law</option>,
                      <option key="3" value="Tax & VAT">Tax & VAT Services</option>,
                      <option key="4" value="Family Law">Family Law</option>,
                      <option key="5" value="Property Law">Property Law</option>,
                      <option key="6" value="Court Cases">Court Cases</option>
                    ]}
                  </select>
                  
                  {/* Preferred Contact Time */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Preferred Contact Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, preferredTime: 'Morning (9-12)' }))}
                        className={`p-2 text-sm rounded-lg border transition-all ${
                          formData.preferredTime === 'Morning (9-12)' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        Morning
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, preferredTime: 'Afternoon (12-5)' }))}
                        className={`p-2 text-sm rounded-lg border transition-all ${
                          formData.preferredTime === 'Afternoon (12-5)' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        Afternoon
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, preferredTime: 'Evening (5-8)' }))}
                        className={`p-2 text-sm rounded-lg border transition-all ${
                          formData.preferredTime === 'Evening (5-8)' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        Evening
                      </button>
                    </div>
                  </div>
                  
                  {/* Urgency Level */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">How urgent is your matter?</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, urgency: 'urgent' }))}
                        className={`p-2 text-sm rounded-lg border transition-all ${
                          formData.urgency === 'urgent' 
                            ? 'bg-red-600 text-white border-red-600' 
                            : 'border-gray-300 hover:border-red-500'
                        }`}
                      >
                        🚨 Urgent
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, urgency: 'normal' }))}
                        className={`p-2 text-sm rounded-lg border transition-all ${
                          formData.urgency === 'normal' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        Normal
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, urgency: 'flexible' }))}
                        className={`p-2 text-sm rounded-lg border transition-all ${
                          formData.urgency === 'flexible' 
                            ? 'bg-green-600 text-white border-green-600' 
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        Flexible
                      </button>
                    </div>
                  </div>
                  
                  <textarea
                    name="message"
                    placeholder="Brief description of your legal matter (Optional)"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  
                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Free Consultation</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✓ No Spam Calls</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">✓ Expert Lawyers</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={createInquiry.isPending}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {createInquiry.isPending ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar className="h-5 w-5 mr-2" />
                          Book Free Consultation
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuickForm(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
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
