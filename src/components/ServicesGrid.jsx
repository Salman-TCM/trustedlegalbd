import { useState } from "react"
import { Building2, TrendingUp, Calculator, Ship, Heart, Home, Shield, Scale, Phone } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export default function ServicesGrid() {
  const [hoveredService, setHoveredService] = useState(null)
  const { t } = useLanguage()

  const services = [
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
    return colors[color]
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
    return colors[color]
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
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${getColorClasses(service.color)}`}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="text-center space-y-4">
                <service.icon className="h-12 w-12 mx-auto" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.subtitle}</p>
                </div>

                {/* Features - Show on hover */}
                {hoveredService === index && (
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
      </div>
    </section>
  )
}
