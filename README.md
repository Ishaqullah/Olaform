# OlaForm - Modern Form Builder

A beautiful and intuitive form builder application built with Next.js and shadcn/ui, similar to YouForm. Create, customize, and share forms with ease.

## ✨ Features

- **Drag & Drop Form Builder** - Intuitive interface for creating forms
- **Beautiful Templates** - Pre-designed templates for various use cases
- **Real-time Preview** - See your form as you build it
- **Responsive Design** - Works perfectly on all devices
- **Modern UI** - Clean and professional interface using shadcn/ui
- **Form Analytics** - Track responses and insights
- **Template Library** - Browse and use professional templates

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd olaform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
olaform/
├── src/
│   ├── app/
│   │   ├── builder/          # Form builder page
│   │   ├── dashboard/        # Dashboard page
│   │   ├── templates/        # Templates page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   └── ui/               # shadcn/ui components
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
└── package.json
```

## 🎨 Pages

### Home Page (`/`)
- Landing page with hero section
- Feature showcase
- Call-to-action buttons

### Form Builder (`/builder`)
- Drag-and-drop form builder
- Field type selection
- Real-time form preview
- Field properties panel

### Templates (`/templates`)
- Browse form templates
- Search and filter templates
- Template categories
- Use template functionality

### Dashboard (`/dashboard`)
- Form management
- Analytics and statistics
- Response tracking
- Form status management

## 🛠️ Built With

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Lucide React** - Beautiful icons
- **Radix UI** - Unstyled, accessible UI primitives

## 🎯 Key Features

### Form Builder
- Add different field types (text, email, phone, date, etc.)
- Customize field properties
- Reorder fields with drag and drop
- Duplicate and delete fields
- Real-time preview

### Templates
- Professional form templates
- Category-based organization
- Search and filter functionality
- Template ratings and usage stats

### Dashboard
- Form overview and statistics
- Response tracking
- Form status management
- Search and filter forms

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository
2. Import your project to Vercel
3. Vercel will detect it's a Next.js app and set up the optimal build settings
4. Your app will be deployed!

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [YouForm](https://youform.io/) for inspiration
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS

---

Made with ❤️ using Next.js and shadcn/ui