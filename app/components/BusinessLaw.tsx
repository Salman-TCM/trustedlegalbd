import { Building2, FileText, Shield, Users } from "lucide-react"

export default function BusinessLaw() {
  const services = [
    {
      icon: Building2,
      title: "RJSC Registration",
      description: "Complete company registration with Registrar of Joint Stock Companies",
    },
    {
      icon: FileText,
      title: "Trade License",
      description: "Obtain trade licenses from City Corporation and local authorities",
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Ensure compliance with Bangladesh Securities and Exchange Commission",
    },
    {
      icon: Users,
      title: "Corporate Governance",
      description: "Establish governance following Companies Act 1994 requirements",
    },
  ]

  return (
    <section id="business-law" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Business conference room meeting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 bg-blue-600 text-white p-3 rounded-lg">
              <Building2 className="h-6 w-6" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="text-blue-600 font-semibold">🏛️ COMPANY LAW & BUSINESS REGISTRATION</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Company Registration Under Bangladesh Law
              </h2>
              <p className="text-lg text-gray-600">
                From company incorporation under the Companies Act 1994 to RJSC registration, we provide expert legal
                guidance to establish and maintain your business in Bangladesh's regulatory environment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                  <service.icon className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>

            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Learn More About Business Law
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
