import { TrendingUp, Handshake, FileCheck, Building } from "lucide-react"

export default function CorporateLaw() {
  const services = [
    {
      icon: TrendingUp,
      title: "Joint Ventures",
      description: "Strategic partnerships and joint venture agreements in Bangladesh",
    },
    {
      icon: Handshake,
      title: "Commercial Contracts",
      description: "Drafting contracts under Contract Act 1872 and Sale of Goods Act",
    },
    {
      icon: FileCheck,
      title: "Due Diligence",
      description: "Legal and financial reviews for Bangladeshi businesses",
    },
    {
      icon: Building,
      title: "Foreign Investment",
      description: "BIDA registration and foreign investment compliance",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <span className="text-green-600 font-semibold">📈 CORPORATE & COMMERCIAL LAW</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Commercial Law & Business Transactions</h2>
              <p className="text-lg text-gray-600">
                Navigate Bangladesh's commercial landscape with expert legal support. From joint ventures to commercial
                disputes under the Contract Act 1872, we ensure your business interests are protected.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                  <service.icon className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>

            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Explore Corporate Services
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Corporate meeting and contract signing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 bg-green-600 text-white p-3 rounded-lg">
              <Handshake className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
