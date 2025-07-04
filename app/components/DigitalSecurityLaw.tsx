import { Shield, Monitor, Lock, Wifi } from "lucide-react"

export default function DigitalSecurityLaw() {
  const services = [
    {
      icon: Shield,
      title: "Cybercrime Defense",
      description: "Legal defense against Digital Security Act 2018 charges",
    },
    {
      icon: Lock,
      title: "Data Protection",
      description: "Personal data protection and privacy law compliance",
    },
    {
      icon: Monitor,
      title: "Digital Content Law",
      description: "Online content regulation and social media compliance",
    },
    {
      icon: Wifi,
      title: "ICT Act Compliance",
      description: "Information and Communication Technology Act compliance",
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
                alt="Digital security and gaming interface"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 bg-purple-600 text-white p-3 rounded-lg">
              <Monitor className="h-6 w-6" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-purple-600" />
                <span className="text-purple-600 font-semibold">🛡️ DIGITAL SECURITY ACT 2018</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Digital Security Act 2018 Compliance</h2>
              <p className="text-lg text-gray-600">
                Navigate Bangladesh's Digital Security Act 2018 with expert legal guidance. From cybercrime defense to
                digital compliance, we protect your digital rights and business interests.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
                  <service.icon className="h-8 w-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>

            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              Digital Legal Services
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
