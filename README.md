# LegalConsult BD - React Website

A professional legal consultancy website built with React, JavaScript, and Tailwind CSS. This website provides legal services information for Bangladesh with multilingual support (English and Bengali).

## Features

- 🌐 **Multilingual Support**: English and Bengali languages
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- ⚡ **Modern React**: Built with React 18 and JavaScript
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 💬 **Interactive Chatbot**: AI-powered legal assistant
- 📞 **Contact Integration**: Direct phone and WhatsApp integration

## Services Offered

- Company Registration (RJSC • Trade License)
- Business Law (Contracts • Agreements)
- Tax & VAT (NBR • TIN • Returns)
- Import/Export (EPB • IRC • Customs)
- Family Law (Marriage • Divorce)
- Property Law (Land • Registration)
- Digital Security (Cyber Law • Privacy)
- Court Cases (Civil • Criminal)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd legal-consultancy-website
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm start
# or
pnpm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
# or
pnpm build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── Hero.jsx        # Hero section with CTA
│   ├── ServicesGrid.jsx # Services showcase
│   ├── ReviewSection.jsx # Client testimonials
│   ├── Chatbot.jsx     # Interactive chatbot
│   ├── Footer.jsx      # Site footer
│   └── ...            # Other components
├── contexts/           # React contexts
│   └── LanguageContext.jsx # Language switching
├── styles/            # CSS files
│   └── globals.css    # Global styles
├── lib/               # Utility functions
│   └── utils.js       # Helper functions
├── App.jsx            # Main app component
└── index.jsx          # React entry point
```

## Technologies Used

- **React 18**: Modern React with hooks
- **JavaScript**: Modern ES6+ JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **React Hook Form**: Form handling
- **Radix UI**: Accessible UI components

## Customization

### Adding New Languages

1. Update the `translations` object in `src/contexts/LanguageContext.jsx`
2. Add new language codes to the `languages` array in `LanguageSwitcher.jsx`

### Styling

The project uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js` for theme changes
- Updating component classes for specific styling
- Adding custom CSS in `src/styles/globals.css`

## Deployment

This React app can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the build folder
- **GitHub Pages**: Use the `gh-pages` package
- **AWS S3**: Upload the build folder to an S3 bucket

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please contact:
- Phone: +880-191-321-0664
- Email: info@legalconsultbd.com 