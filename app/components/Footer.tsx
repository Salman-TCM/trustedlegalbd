import { Scale, Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">LegalConsult BD</span>
            </div>
            <p className="text-gray-300 text-sm">Expert legal services in Bangladesh. Fast, reliable, affordable.</p>
          </div>

          {/* Quick Services */}
          <div>
            <h3 className="font-semibold mb-4">Quick Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Company Registration
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Tax & VAT
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Family Law
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Property Law
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+880-191-321-0664</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">info@legalconsultbd.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Motijheel, Dhaka</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold mb-4">Office Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Mon-Sat: 9AM-6PM</span>
              </div>
              <div className="text-red-400 font-medium">24/7 Emergency Line</div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                Emergency Call
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 LegalConsult BD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
