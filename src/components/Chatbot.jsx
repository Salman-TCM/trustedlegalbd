import { useState } from "react"
import { MessageCircle, X, Send, Bot, Phone, Calendar } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export default function Chatbot() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: t("chat.greeting"),
      quickReplies: [t("chat.bookConsultation"), t("chat.emergencyHelp"), t("chat.serviceInfo"), t("chat.callNow")],
    },
  ])

  const handleQuickReply = (reply: string) => {
    setMessages([...messages, { type: "user", content: reply }])

    setTimeout(() => {
      let botResponse = ""
      let quickReplies: string[] = []

      switch (reply) {
        case "Book Consultation":
          botResponse = "Great! I can help you book a consultation. What type of legal service do you need?"
          quickReplies = ["Company Registration", "Family Law", "Property Law", "Tax Issues"]
          break
        case "Emergency Help":
          botResponse = "For emergency legal help, please call our 24/7 hotline: +880-191-321-0664"
          quickReplies = ["Call Now", "Send Location", "Book Urgent Meeting"]
          break
        case "Service Info":
          botResponse = "We offer 8 main legal services. Which one interests you?"
          quickReplies = ["Business Law", "Family Law", "Property Law", "All Services"]
          break
        case "Call Now":
          botResponse = "Calling +880-191-321-0664... You can also click the call button below."
          quickReplies = ["Book Meeting", "Send Message", "Emergency Line"]
          break
        default:
          botResponse = "Thanks for your message. A legal expert will contact you within 30 minutes."
          quickReplies = ["Book Consultation", "Call Now", "More Info"]
      }

      setMessages((prev) => [...prev, { type: "bot", content: botResponse, quickReplies }])
    }, 1000)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { type: "user", content: message }])
      setMessage("")

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Thanks for your message! Our legal team will review and respond within 30 minutes.",
            quickReplies: ["Book Call", "Emergency Help", "More Services"],
          },
        ])
      }, 1000)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 transform"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl z-50 border">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{t("chat.title")}</h3>
                  <p className="text-xs text-blue-100">{t("chat.status")}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-blue-500 rounded">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="p-1 hover:bg-blue-500 rounded">
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div key={index}>
                <div className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>

                {/* Quick Reply Buttons */}
                {msg.type === "bot" && msg.quickReplies && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-2">
                    {msg.quickReplies.map((reply, replyIndex) => (
                      <button
                        key={replyIndex}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={t("chat.placeholder")}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex justify-between mt-2">
              <button className="text-xs text-blue-600 hover:underline">📞 {t("chat.callNow")}</button>
              <button className="text-xs text-blue-600 hover:underline">📅 {t("chat.bookConsultation")}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
