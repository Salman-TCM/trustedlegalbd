import { Heart, Users, Home, Baby } from "lucide-react"

export default function FamilyLaw() {
  const services = [
    {
      icon: Heart,
      title: "Marriage Registration",
      description: "Nikah registration under Muslim Family Laws and other marriage acts",
    },
    {
      icon: Users,
      title: "Divorce Proceedings",
      description: "Khula, Talaq, and divorce under respective personal laws",
    },
    {
      icon: Baby,
      title: "Child Custody",
      description: "Guardianship and custody matters under Guardians and Wards Act 1890",
    },
    {
      icon: Home,
      title: "Maintenance & Dower",
      description: "Maintenance claims and dower (Mahr) related legal matters",
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
                alt="Happy family celebration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 left-4 bg-pink-600 text-white p-3 rounded-lg">
              <Heart className="h-6 w-6" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-pink-600" />
                <span className="text-pink-600 font-semibold">👪 FAMILY LAW & PERSONAL STATUS</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Family Law Under Bangladeshi Legislation</h2>
              <p className="text-lg text-gray-600">
                Compassionate family law services under Muslim Family Laws Ordinance 1961, Hindu Marriage Act, and other
                personal status laws applicable in Bangladesh.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="p-6 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors group">
                  <service.icon className="h-8 w-8 text-pink-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>

            <button className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold">
              Get Family Law Help
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
