import { Home, MapPin, FileText, Key } from "lucide-react"

export default function PropertyLaw() {
  const services = [
    {
      icon: MapPin,
      title: "Land Mutation",
      description: "Property mutation (Namjari) with Sub-Registrar and land offices",
    },
    {
      icon: Home,
      title: "Property Registration",
      description: "Deed registration under Registration Act 1908",
    },
    {
      icon: FileText,
      title: "Land Disputes",
      description: "Property disputes and title verification services",
    },
    {
      icon: Key,
      title: "RAJUK Approval",
      description: "Building plan approval and RAJUK compliance for Dhaka properties",
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
                <Home className="h-8 w-8 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">🌾 LAND & PROPERTY LAW</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Land Registration & Property Law</h2>
              <p className="text-lg text-gray-600">
                Expert property law services under the Registration Act 1908 and Transfer of Property Act 1882. From
                land mutation to property disputes, we protect your real estate interests.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                  <service.icon className="h-8 w-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>

            <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
              Property Legal Services
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Farm house and agricultural land"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 bg-emerald-600 text-white p-3 rounded-lg">
              <Home className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
