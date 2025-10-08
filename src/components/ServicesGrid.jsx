import { useState, useMemo } from "react"
import { Building2, TrendingUp, Calculator, Ship, Heart, Home, Shield, Scale, Phone, Loader2, FileText, Gavel } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useServices, useCategories } from "../hooks/useServices"
import ServiceInquiryModal from "./ServiceInquiryModal"

export default function ServicesGrid() {
  const [hoveredService, setHoveredService] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { t } = useLanguage()

  // Fetch data from backend
  const { data: services, isLoading: servicesLoading, error: servicesError } = useServices()
  // Note: categories will be used for filtering in future enhancement
  // eslint-disable-next-line no-unused-vars
  const { data: categories, isLoading: categoriesLoading } = useCategories()

  // Icon mapping for services
  const iconMap = {
    'fa-building': Building2,
    'fa-briefcase': Building2,
    'fa-file-contract': TrendingUp,
    'fa-file-text': Calculator,
    'fa-scale-balanced': Scale,
    'fa-balance-scale': Scale,
    'fa-home': Home,
    'fa-users': Heart,
    'fa-shield': Shield,
    'fa-ship': Ship,
    'fa-gift': Heart,
    'fa-bank': Building2,
    'fa-university': Building2,
    'fa-user-check': Heart,
    'fa-search': TrendingUp,
    'fa-search-plus': TrendingUp,
    'fa-exchange': TrendingUp,
    'fa-certificate': Scale,
    'fa-book': Calculator,
    'fa-handshake': Heart,
    'fa-clipboard': Calculator,
    'fa-check-circle': Shield,
    'fa-bell': Phone,
    'fa-gavel': Scale,
    'fa-stamp': Calculator,
    'fa-sitemap': TrendingUp,
    'fa-download': Calculator,
    'fa-file': Calculator,
    'fa-edit': TrendingUp,
    'fa-unlock': Shield,
    'fa-times-circle': Shield,
    'fa-folder': Calculator,
    'fa-file-download': Calculator,
  }

  // Color mapping for different categories
  const colorMap = {
    'Corporate & Business Services': 'blue',
    'Property & Land Services': 'emerald',
    'Legal Documentation Services': 'orange',
    'Court & Litigation Services': 'indigo',
    'Corporate Law': 'blue',
    'Property Law': 'emerald',
    'Family Law': 'pink',
    'Tax Law': 'orange',
    'Import/Export': 'teal',
    'Digital Security': 'purple',
    'Court Cases': 'indigo',
    'Business Law': 'green',
  }

  // Category configuration with icons and descriptions
  const categoryConfig = {
    'all': {
      name: 'All Services',
      icon: Scale,
      description: 'Browse all our legal services',
      color: 'gray'
    },
    'Corporate & Business Services': {
      name: 'Corporate & Business',
      icon: Building2,
      description: 'Company formation, trade licenses, business compliance',
      color: 'blue'
    },
    'Property & Land Services': {
      name: 'Property & Land',
      icon: Home,
      description: 'Land registration, property transfer, real estate matters',
      color: 'emerald'
    },
    'Legal Documentation Services': {
      name: 'Legal Documentation',
      icon: FileText,
      description: 'Affidavits, notarization, legal document preparation',
      color: 'orange'
    },
    'Court & Litigation Services': {
      name: 'Court & Litigation',
      icon: Gavel,
      description: 'Court cases, legal representation, dispute resolution',
      color: 'indigo'
    }
  }

  const fallbackServices = [
    {
      icon: Building2,
      title: t("services.companyReg"),
      subtitle: t("services.companyRegSub"),
      color: "blue",
      features: ["Quick Setup", "All Documents", "Legal Compliance"],
    },
    {
      icon: TrendingUp,
      title: t("services.businessLaw"),
      subtitle: t("services.businessLawSub"),
      color: "green",
      features: ["Contract Review", "Legal Advice", "Dispute Resolution"],
    },
    {
      icon: Calculator,
      title: t("services.taxVat"),
      subtitle: t("services.taxVatSub"),
      color: "orange",
      features: ["Tax Planning", "VAT Registration", "NBR Support"],
    },
    {
      icon: Ship,
      title: t("services.importExport"),
      subtitle: t("services.importExportSub"),
      color: "teal",
      features: ["Export License", "Import Permit", "Customs Clearance"],
    },
    {
      icon: Heart,
      title: t("services.familyLaw"),
      subtitle: t("services.familyLawSub"),
      color: "pink",
      features: ["Marriage Registration", "Divorce Proceedings", "Child Custody"],
    },
    {
      icon: Home,
      title: t("services.propertyLaw"),
      subtitle: t("services.propertyLawSub"),
      color: "emerald",
      features: ["Property Transfer", "Land Registration", "Dispute Resolution"],
    },
    {
      icon: Shield,
      title: t("services.digitalSecurity"),
      subtitle: t("services.digitalSecuritySub"),
      color: "purple",
      features: ["Cyber Crime Defense", "Data Protection", "Digital Compliance"],
    },
    {
      icon: Scale,
      title: t("services.courtCases"),
      subtitle: t("services.courtCasesSub"),
      color: "indigo",
      features: ["Court Representation", "Legal Defense", "Case Management"],
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-50 hover:bg-green-100 text-green-600 border-green-200",
      orange: "bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200",
      teal: "bg-teal-50 hover:bg-teal-100 text-teal-600 border-teal-200",
      pink: "bg-pink-50 hover:bg-pink-100 text-pink-600 border-pink-200",
      emerald: "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200",
      purple: "bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200",
      indigo: "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200",
    }
    return colors[color] || colors.blue
  }

  const getButtonColor = (color) => {
    const colors = {
      blue: "bg-blue-600 hover:bg-blue-700",
      green: "bg-green-600 hover:bg-green-700",
      orange: "bg-orange-600 hover:bg-orange-700",
      teal: "bg-teal-600 hover:bg-teal-700",
      pink: "bg-pink-600 hover:bg-pink-700",
      emerald: "bg-emerald-600 hover:bg-emerald-700",
      purple: "bg-purple-600 hover:bg-purple-700",
      indigo: "bg-indigo-600 hover:bg-indigo-700",
    }
    return colors[color] || colors.blue
  }

  const handleServiceInquiry = (service) => {
    setSelectedService(service)
    setIsInquiryModalOpen(true)
  }

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false)
    setSelectedService(null)
  }

  // Transform backend data to frontend format
  const allServices = services?.length > 0 ? services.map(service => {
    const IconComponent = iconMap[service.icon] || Building2
    const color = colorMap[service.category_name] || 'blue'
    const features = Array.isArray(service.features) ? service.features.slice(0, 3) : []
    
    return {
      id: service.id,
      slug: service.slug,
      icon: IconComponent,
      title: service.title,
      subtitle: service.short_description,
      color: color,
      features: features,
      price: service.price,
      price_unit: service.price_unit,
      category: service.category_name || 'Corporate & Business Services',
    }
  }) : fallbackServices.map(s => ({ ...s, category: 'Corporate & Business Services' }))

  // Group services by category
  const servicesByCategory = useMemo(() => {
    const grouped = {}
    allServices.forEach(service => {
      if (!grouped[service.category]) {
        grouped[service.category] = []
      }
      grouped[service.category].push(service)
    })
    return grouped
  }, [allServices])

  // Get services to display based on selected category
  const displayServices = selectedCategory === 'all' 
    ? allServices 
    : servicesByCategory[selectedCategory] || []

  if (servicesLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t("services.title")}</h2>
            <p className="text-lg text-gray-600">{t("services.subtitle")}</p>
          </div>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading services...</span>
          </div>
        </div>
      </section>
    )
  }

  if (servicesError && !services) {
    console.error('Services error:', servicesError)
    // Fall back to static services if API fails
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Legal Services</h2>
          <p className="text-lg text-gray-600 mb-6">Complete legal solutions for all your needs - transparent pricing, expert lawyers, quick service</p>
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <span className="text-green-600 mr-1">✓</span>
              Free Consultation
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-1">✓</span>
              Expert Lawyers
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-1">✓</span>
              Quick Processing
            </div>
            <div className="flex items-center">
              <span className="text-green-600 mr-1">✓</span>
              100% Legal Protection
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {Object.entries(categoryConfig).map(([key, config]) => {
              const IconComponent = config.icon
              const isActive = selectedCategory === key
              
              // Define button styles based on color and active state
              const getButtonClass = () => {
                if (isActive) {
                  switch(config.color) {
                    case 'blue': return 'bg-blue-600 text-white shadow-lg scale-105'
                    case 'emerald': return 'bg-emerald-600 text-white shadow-lg scale-105'
                    case 'orange': return 'bg-orange-600 text-white shadow-lg scale-105'
                    case 'indigo': return 'bg-indigo-600 text-white shadow-lg scale-105'
                    default: return 'bg-gray-600 text-white shadow-lg scale-105'
                  }
                } else {
                  switch(config.color) {
                    case 'blue': return 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    case 'emerald': return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    case 'orange': return 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    case 'indigo': return 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                    default: return 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }
                }
              }
              
              const getBadgeClass = () => {
                if (isActive) return 'bg-white/20 text-white'
                switch(config.color) {
                  case 'blue': return 'bg-blue-200 text-blue-800'
                  case 'emerald': return 'bg-emerald-200 text-emerald-800'
                  case 'orange': return 'bg-orange-200 text-orange-800'
                  case 'indigo': return 'bg-indigo-200 text-indigo-800'
                  default: return 'bg-gray-200 text-gray-800'
                }
              }
              
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${getButtonClass()}`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-semibold">{config.name}</span>
                  {key !== 'all' && servicesByCategory[key] && (
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getBadgeClass()}`}>
                      {servicesByCategory[key].length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          
          {/* Category Description */}
          {selectedCategory !== 'all' && categoryConfig[selectedCategory] && (
            <div className="text-center mb-6">
              <p className="text-gray-600">
                {categoryConfig[selectedCategory].description}
              </p>
            </div>
          )}
        </div>

        {/* Category Header for filtered view */}
        {selectedCategory !== 'all' && displayServices.length > 0 && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Showing</span>
              <span className="font-bold text-gray-900">{displayServices.length}</span>
              <span className="text-gray-600">services in</span>
              <span className="font-bold text-gray-900">{categoryConfig[selectedCategory]?.name}</span>
            </div>
          </div>
        )}

        {/* Services Grid */}
        {displayServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((service, index) => (
            <div
              key={service.id || index}
              className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${getColorClasses(service.color)}`}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="text-center space-y-4">
                <service.icon className="h-12 w-12 mx-auto" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.subtitle}</p>
                  {service.price && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">
                        ৳{service.price} {service.price_unit}
                      </p>
                      <p className="text-xs text-gray-600">
                        💬 Free consultation • ⚡ Quick service
                      </p>
                    </div>
                  )}
                </div>

                {/* Features - Show on hover */}
                {hoveredService === index && service.features?.length > 0 && (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-xs text-gray-700 bg-white/50 px-2 py-1 rounded">
                        ✓ {feature}
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    className={`w-full text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm hover:scale-105 transform ${getButtonColor(service.color)}`}
                    onClick={() => handleServiceInquiry(service)}
                  >
                    📞 Get Free Consultation
                  </button>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/8801913210664?text=Hi! I need help with ${service.title}. Please provide me details about the service and pricing.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-all duration-300 text-xs flex items-center justify-center hover:scale-105 transform"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="tel:+8801913210664"
                      className="flex-1 text-gray-600 px-3 py-1 rounded-lg hover:bg-white/50 transition-colors text-xs flex items-center justify-center border border-gray-300 hover:border-gray-400"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Shield className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No services in this category yet</h3>
              <p className="text-gray-500">Please check other categories or contact us for specific requirements.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Services
              </button>
            </div>
          </div>
        )}

        {/* How It Works Section */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">How We Help You</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
              <p className="text-sm text-gray-600">Call or submit inquiry form. Get free consultation within 2 hours.</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">We Handle Everything</h4>
              <p className="text-sm text-gray-600">Our experts prepare all documents and handle government processes.</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Results</h4>
              <p className="text-sm text-gray-600">Receive completed legal work with full protection and documentation.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Why 500+ Clients Trust Us</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Quick Service</h4>
              <p className="text-sm text-gray-600">Most legal work completed within 7-15 days. Emergency services available.</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
              <p className="text-sm text-gray-600">No hidden fees. Fixed pricing. Free consultation before you pay anything.</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-3xl mb-3">🎓</div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Lawyers</h4>
              <p className="text-sm text-gray-600">15+ years experience. Licensed bar members. Specialized in Bangladesh law.</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="font-semibold text-gray-900 mb-2">100% Protection</h4>
              <p className="text-sm text-gray-600">Full legal protection. All documents verified. Money-back guarantee.</p>
            </div>
          </div>
        </div>

        {/* What You Get Section */}
        <div className="mt-16 mb-12 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">What You Get With Every Service</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Free Consultation</h4>
                <p className="text-sm text-gray-600">30-minute expert consultation to understand your needs</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Complete Documentation</h4>
                <p className="text-sm text-gray-600">All legal documents prepared and filed properly</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Government Processing</h4>
                <p className="text-sm text-gray-600">We handle all government office visits and procedures</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Regular Updates</h4>
                <p className="text-sm text-gray-600">Daily progress updates via phone/WhatsApp</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Legal Guarantee</h4>
                <p className="text-sm text-gray-600">100% legal compliance and validity guarantee</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">After-Service Support</h4>
                <p className="text-sm text-gray-600">6 months free support for any related queries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-red-800 mb-2">🚨 Urgent Legal Help?</h3>
            <p className="text-sm text-red-600 mb-4">24/7 emergency legal support available for critical matters</p>
            <div className="flex gap-3 justify-center">
              <a
                href="tel:+8801913210664"
                className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold hover:scale-105 transform flex items-center"
              >
                📞 Call Now
              </a>
              <a
                href="https://wa.me/8801913210664?text=🚨 URGENT: I need immediate legal assistance. Please help!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold hover:scale-105 transform flex items-center"
              >
                💬 WhatsApp
              </a>
            </div>
            <p className="text-xs text-red-500 mt-2">Available 24/7 for emergency legal matters</p>
          </div>
        </div>

        {/* Service Inquiry Modal */}
        <ServiceInquiryModal 
          isOpen={isInquiryModalOpen}
          onClose={closeInquiryModal}
          service={selectedService}
        />
      </div>
    </section>
  )
}