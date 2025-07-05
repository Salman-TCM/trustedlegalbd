import { useState } from "react"
import { Menu, X, Scale, Phone } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">{t("header.company")}</span>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <a href="tel:+8801913210664" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{t("header.phone")}</span>
            </a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              {t("header.bookNow")}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              <a href="tel:+8801913210664" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
                {t("header.callNow")}
              </a>
              <button className="w-full mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                {t("header.bookConsultation")}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
