import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Award, Users, Clock, Shield, Loader2 } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useFeaturedTestimonials } from "../hooks/useServices"

export default function ReviewSection() {
  const [currentReview, setCurrentReview] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { t } = useLanguage()

  // Fetch testimonials from backend
  const { data: backendTestimonials, isLoading: testimonialsLoading, error: testimonialsError } = useFeaturedTestimonials()

  const fallbackReviews = [
    {
      name: "Ahmed Rahman",
      position: "Business Owner",
      company: "Rahman Textiles Ltd",
      rating: 5,
      text: "Excellent service for company registration. They handled everything from RJSC to trade license. Very professional and quick response.",
      service: "Company Registration",
      location: "Dhaka",
      avatar: "AR",
      color: "blue",
    },
    {
      name: "Fatima Khatun",
      position: "Property Owner",
      company: "Real Estate Investor",
      rating: 5,
      text: "Helped me with land mutation and property registration. The lawyers were very knowledgeable about Bangladesh property laws.",
      service: "Property Law",
      location: "Chittagong",
      avatar: "FK",
      color: "emerald",
    },
    {
      name: "Mohammad Ali",
      position: "Export Business",
      company: "Ali International",
      rating: 5,
      text: "Great support for EPB registration and export documentation. They made the complex process very simple for us.",
      service: "Import/Export Law",
      location: "Sylhet",
      avatar: "MA",
      color: "teal",
    },
    {
      name: "Rashida Begum",
      position: "Family Matter",
      company: "Personal Client",
      rating: 5,
      text: "Very compassionate handling of my divorce case. They explained everything clearly and supported me throughout the process.",
      service: "Family Law",
      location: "Dhaka",
      avatar: "RB",
      color: "pink",
    },
    {
      name: "Karim Uddin",
      position: "Small Business",
      company: "Karim Trading",
      rating: 5,
      text: "Excellent VAT registration and tax return services. They saved me from NBR penalties and organized all my tax matters.",
      service: "Tax & VAT",
      location: "Rajshahi",
      avatar: "KU",
      color: "orange",
    },
    {
      name: "Nasir Ahmed",
      position: "Tech Startup",
      company: "Digital Solutions BD",
      rating: 5,
      text: "Helped us navigate Digital Security Act compliance. Very up-to-date with latest cyber laws in Bangladesh.",
      service: "Digital Security",
      location: "Dhaka",
      avatar: "NA",
      color: "purple",
    },
  ]

  // Transform backend testimonials to frontend format
  const transformTestimonial = (testimonial) => {
    const serviceColorMap = {
      'Corporate Law': 'blue',
      'Property Law': 'emerald',
      'Family Law': 'pink',
      'Tax Law': 'orange',
      'Import/Export': 'teal',
      'Digital Security': 'purple',
      'Court Cases': 'indigo',
      'Business Law': 'green',
    }

    const initials = testimonial.client_name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()

    return {
      name: testimonial.client_name,
      position: testimonial.client_title || 'Valued Client',
      company: testimonial.client_company || 'Personal Client',
      rating: testimonial.rating,
      text: testimonial.content,
      service: testimonial.service_title || 'Legal Service',
      location: 'Bangladesh', // Default location since it's not in backend model
      avatar: initials,
      color: serviceColorMap[testimonial.service_title] || 'blue',
    }
  }

  // Use backend data if available, otherwise fallback
  const reviews = backendTestimonials?.length > 0 
    ? backendTestimonials.map(transformTestimonial)
    : fallbackReviews

  // Color utility functions matching ServicesGrid
  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-600",
      green: "bg-green-600",
      orange: "bg-orange-600",
      teal: "bg-teal-600",
      pink: "bg-pink-600",
      emerald: "bg-emerald-600",
      purple: "bg-purple-600",
      indigo: "bg-indigo-600",
    }
    return colors[color] || "bg-blue-600"
  }

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, reviews.length])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
    setIsAutoPlaying(false)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
    setIsAutoPlaying(false)
  }

  const goToReview = (index) => {
    setCurrentReview(index)
    setIsAutoPlaying(false)
  }

  // Show loading state
  if (testimonialsLoading) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("reviews.title")} <span className="text-blue-600">{t("reviews.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("reviews.subtitle")}</p>
          </div>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading testimonials...</span>
          </div>
        </div>
      </section>
    )
  }

  // Log error but continue with fallback
  if (testimonialsError) {
    console.error('Testimonials error:', testimonialsError)
  }

  return (
    <section className="py-20 bg-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-blue-600">Happy Clients</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real reviews from real people who got their legal work done professionally and stress-free</p>
        </div>

        {/* Main Review Card */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 relative border border-gray-200">
            {/* Client Avatar and Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <div
                className={`w-20 h-20 ${getColorClasses(reviews[currentReview].color)} rounded-full flex items-center justify-center text-white text-xl font-bold`}
              >
                {reviews[currentReview].avatar}
              </div>
              <div className="text-center md:text-left flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{reviews[currentReview].name}</h4>
                <p className="text-gray-600 mb-3">
                  {reviews[currentReview].position} • {reviews[currentReview].company}
                </p>
                <div className="flex justify-center md:justify-start items-center space-x-4">
                  <div className="flex">
                    {[...Array(reviews[currentReview].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">📍 {reviews[currentReview].location}</span>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <blockquote className="text-xl text-gray-800 leading-relaxed mb-6 italic">
              "{reviews[currentReview].text}"
            </blockquote>

            {/* Service Badge */}
            <div className="flex justify-center">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-lg text-white font-medium ${getColorClasses(reviews[currentReview].color)}`}
              >
                {reviews[currentReview].service}
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 hover:text-blue-600 transition-colors" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mb-16 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentReview ? "w-8 h-3 bg-blue-600" : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Users, number: "500+", label: t("reviews.stat1"), color: "blue" },
            { icon: Award, number: "98%", label: t("reviews.stat2"), color: "green" },
            { icon: Clock, number: "15+", label: t("reviews.stat3"), color: "orange" },
            { icon: Shield, number: "24/7", label: t("reviews.stat4"), color: "purple" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 ${getColorClasses(stat.color)} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-600 rounded-xl p-8 md:p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Legal Help?</h3>
          <p className="text-xl mb-8 opacity-90">Join 500+ satisfied clients who got their legal work done professionally</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-bold text-lg hover:scale-105 transform"
            >
              📞 Get Free Consultation
            </button>
            <div className="flex gap-3">
              <a
                href="tel:+8801913210664"
                className="bg-transparent border-2 border-white text-white px-6 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-bold text-lg flex items-center"
              >
                📞 Call Now
              </a>
              <a
                href="https://wa.me/8801913210664?text=Hi! I saw your reviews and want to get legal help. Please provide me details."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 border-2 border-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 hover:border-green-700 transition-all duration-300 font-bold text-lg flex items-center"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
