# 🌌 MyAnime: The Ultimate Anime Encyclopedia

A premium, high-tech anime discovery platform built with **Next.js 16**, **Tailwind CSS 4**, and **Framer Motion**. MyAnime provides a glassmorphic, immersive experience for exploring the vast world of Japanese animation using the **Kitsu API**.

![Hero Preview](/public/cv7.jpg)

## ✨ Features

- **🚀 Real-time Discovery**: Explore Trending Now, Most Popular, and Upcoming series directly from the mainframe.
- **🔍 Advanced Holo-Search**: Filter through thousands of titles by category, status, and year with a high-performance search interface.
- **🖼️ Personnel Records**: Deep-dive into character profiles with auto-parsed statistics and biographies.
- **🛸 Premium Aesthetics**: 
  - **AuroraText**: Dynamic, animated gradient headers.
  - **Glassmorphism**: Backdrop blurs and translucent borders for a futuristic feel.
  - **Cyberpunk Palette**: Curated pink, purple, and blue neon accents.
- **📱 Fully Responsive**: Optimized for everything from mobile devices to ultra-wide monitors.
- **⚡ Performance First**: Server-side rendering (SSR) for data fetching and optimized image delivery.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core**: [React 19](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Data Source**: [Kitsu API](https://kitsu.io/api/edge)

## 📂 Project Structure

- `app/`: Next.js App Router pages and dedicated Client Components.
- `components/`: Atomic UI components, including the modular `AnimeCard`, `CategoryRow`, and `CharacterModal`.
- `lib/`: Kitsu API wrapper and utility functions.
- `public/`: High-quality assets and global imagery.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm / yarn / pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd myanime
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the mainframe**:
   Navigate to [http://localhost:3000](http://localhost:3000).

## 🔨 Development Commands

- `npm run dev`: Start development server.
- `npm run build`: Create an optimized production build.
- `npm run lint`: Run ESLint for code quality checks.
- `npm start`: Launch the production server.

## 📜 License

This project is open-source and available under the MIT License.

---

*“Every frame is a legacy.”*
