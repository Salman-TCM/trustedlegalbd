import { useState } from "react"
import { Building2, TrendingUp, Calculator, Ship, Heart, Home, Shield, Scale, Phone, Loader2 } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useServices, useCategories } from "../hooks/useServices"
import ServiceInquiryModal from "./ServiceInquiryModal"

export default function ServicesGrid() {
  const [hoveredService, setHoveredService] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
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
  const displayServices = services?.length > 0 ? services.map(service => {
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
    }
  }) : fallbackServices

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
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t("services.title")}</h2>
          <p className="text-lg text-gray-600">{t("services.subtitle")}</p>
        </div>

        {/* Services Grid */}
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
                    <p className="text-xs text-gray-500 mt-1">
                      ৳{service.price} {service.price_unit}
                    </p>
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
                    className={`w-full text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm ${getButtonColor(service.color)}`}
                    onClick={() => handleServiceInquiry(service)}
                  >
                    {t("services.getHelp")}
                  </button>
                  <button className="w-full text-gray-600 px-4 py-1 rounded-lg hover:bg-white/50 transition-colors text-xs flex items-center justify-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {t("services.quickCall")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-red-800 mb-2">{t("services.emergency")}</h3>
            <p className="text-sm text-red-600 mb-4">{t("services.emergencySub")}</p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
              {t("services.emergencyCall")}
            </button>
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