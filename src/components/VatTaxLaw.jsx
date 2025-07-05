import { Calculator, FileText, PieChart, Receipt } from "lucide-react"

export default function VatTaxLaw() {
  const services = [
    {
      icon: Calculator,
      title: "TIN Registration",
      description: "Taxpayer Identification Number registration with NBR",
    },
    {
      icon: FileText,
      title: "VAT Registration",
      description: "Value Added Tax registration and monthly VAT return filing",
    },
    {
      icon: PieChart,
      title: "Tax Audit Support",
      description: "Professional representation during NBR tax audits",
    },
    {
      icon: Receipt,
      title: "Income Tax Returns",
      description: "Annual income tax return preparation and submission",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Tax forms and calculator"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 bg-orange-600 text-white p-3 rounded-lg">
              <Calculator className="h-6 w-6" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calculator className="h-8 w-8 text-orange-600" />
                <span className="text-orange-600 font-semibold">🧾 VAT & TAX LAW (NBR)</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">VAT & Tax Services - NBR Compliance</h2>
              <p className="text-lg text-gray-600">
                Expert tax and VAT services under National Board of Revenue (NBR) regulations. From TIN registration to
                VAT compliance, we ensure your tax obligations are met efficiently.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                  <service.icon className="h-8 w-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>

            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
              Get Tax Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
