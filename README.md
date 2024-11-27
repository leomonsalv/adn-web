# E-commerce Web Application

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS. This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Features

- Modern UI components using Tailwind CSS and Headless UI
- Responsive design for all devices
- Product catalog with filtering and search
- Shopping cart functionality
- Order management system
- User authentication
- Secure checkout process
- Product reviews and ratings
- Real-time updates using React Query

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**:
  - Headless UI
  - Radix UI
  - Shadcn UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Testing**: Jest
- **Authentication**: Firebase
- **Form Handling**: React Hook Form
- **Validation**: Zod

## 📦 Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

├── app/
├── public/
├── lib/
├── types/
├── components/
│ ├── ui/
│ ├── template-components/
│ └── .../
├── hooks/
├── providers/
├── schemas/
├── stores/
└── template-components/

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🧪 Testing

The project uses Jest for testing.

For watch mode:

```bash
pnpm test:watch
```

## 🔧 Development Tools

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- lint-staged for pre-commit checks

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile devices
- Tablets
- Desktop screens

## 🔒 Environment Variables

Required environment variables:

```bash
- NEXT_PUBLIC_FIREBASE_API_KEY=
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
- NEXT_PUBLIC_FIREBASE_PROJECT_ID=

```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design system inspired by Tailwind UI
- Icons from Heroicons and Lucide
- UI Components from Radix UI and Headless UI

## 📚 Documentation

For more detailed documentation about specific components and features, please refer to the `/docs` directory in the repository.

## 🔄 Updates and Maintenance

This project is actively maintained. For the latest updates:

1. Pull the latest changes:

```bash
git pull origin main
```

3. Run migrations if necessary:

```bash
pnpm migrate
```

## 🐛 Bug Reports

If you discover any bugs, please create an issue in the GitHub repository including:

1. Bug description
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)

## 💡 Feature Requests

We welcome feature requests! Please create an issue with the tag 'enhancement' and include:

1. Feature description
2. Use case
3. Proposed implementation (optional)

## 📞 Support

For support questions, please use the GitHub Discussions section or reach out to the maintainers directly.
