import { Ship, Globe, FileCheck, Truck } from "lucide-react"

export default function ImportExportLaw() {
  const services = [
    {
      icon: Ship,
      title: "EPB Registration",
      description: "Export Promotion Bureau registration for exporters",
    },
    {
      icon: Globe,
      title: "Import Registration",
      description: "Import Registration Certificate (IRC) from Chief Controller of Imports & Exports",
    },
    {
      icon: FileCheck,
      title: "Customs Documentation",
      description: "Bill of Entry, shipping bills, and customs clearance documentation",
    },
    {
      icon: Truck,
      title: "Port Authority Compliance",
      description: "Chittagong and Mongla Port Authority legal compliance",
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
                <Ship className="h-8 w-8 text-teal-600" />
                <span className="text-teal-600 font-semibold">⚓ IMPORT & EXPORT LAW</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Import-Export & Customs Law</h2>
              <p className="text-lg text-gray-600">
                Navigate Bangladesh's import-export regulations with expert legal guidance. From EPB registration to
                customs clearance, we ensure smooth international trade operations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group">
                  <service.icon className="h-8 w-8 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>

            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
              Start International Trade
            </button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Cargo ship at port with containers"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 bg-teal-600 text-white p-3 rounded-lg">
              <Ship className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
