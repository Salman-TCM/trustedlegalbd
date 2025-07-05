import { useState } from "react"
import { Scale, ChevronDown, ChevronUp, Briefcase, FileText, Users, Gavel } from "lucide-react"

export default function OtherLegalMatters() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const services = [
    {
      icon: Briefcase,
      title: "Labour Law",
      description: "Employment matters under Bangladesh Labour Act 2006",
      fullDesc:
        "Comprehensive labour law services under Bangladesh Labour Act 2006 including employment contracts, workplace disputes, wrongful termination, and industrial relations.",
      features: ["Employment Contracts", "Labour Disputes", "Industrial Relations", "Workplace Safety"],
    },
    {
      icon: FileText,
      title: "Banking & Finance Law",
      description: "Banking regulations and financial law compliance",
      fullDesc:
        "Expert banking and finance law services covering Bangladesh Bank regulations, loan agreements, financial disputes, and compliance with banking laws.",
      features: ["Loan Agreements", "Banking Disputes", "BB Compliance", "Financial Regulations"],
    },
    {
      icon: Users,
      title: "Civil Litigation",
      description: "Civil court proceedings and dispute resolution",
      fullDesc:
        "Professional civil litigation services in District Courts, High Court Division, and Appellate Division of the Supreme Court of Bangladesh.",
      features: ["Civil Suits", "High Court Writs", "Appeals", "Injunctions"],
    },
    {
      icon: Gavel,
      title: "Criminal Defense",
      description: "Criminal law representation under Penal Code 1860",
      fullDesc:
        "Experienced criminal defense under Bangladesh Penal Code 1860, Code of Criminal Procedure 1898, and other criminal laws of Bangladesh.",
      features: ["Criminal Defense", "Bail Applications", "Sessions Court", "Magistrate Court"],
    },
  ]

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scale className="h-8 w-8 text-indigo-600" />
            <span className="text-indigo-600 font-semibold">⚖️ OTHER LEGAL MATTERS</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comprehensive Legal Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Beyond our specialized practice areas, we offer a full range of legal services to meet all your legal needs
            with the same level of expertise and dedication.
          </p>
        </div>

        {/* Scales of Justice Image */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-64 h-48 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Scales of Justice"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 bg-indigo-600 text-white p-3 rounded-lg">
              <Scale className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Expandable Service Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 cursor-pointer" onClick={() => toggleCard(index)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <service.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                      <p className="text-gray-600">{service.description || service.shortDesc}</p>
                    </div>
                  </div>
                  {expandedCard === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>

                {expandedCard === index && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-gray-700 mb-4">{service.fullDesc}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                      Learn More
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-lg">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
