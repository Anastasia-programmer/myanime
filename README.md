# 🌌 OTAKUMO: The Ultimate Anime Discovery Platform

OTAKUMO is a premium, high-tech anime encyclopedia and discovery platform. Built with **Next.js 16**, **Tailwind CSS 4**, and **Motion**, it provides a glassmorphic, immersive experience for exploring the vast world of Japanese animation using the **Kitsu API**.

![Hero Preview](/im.png)

## ✨ Premium Features

- **🚀 Real-time Discovery**: Instant access to Trending, Most Popular, and Upcoming series directly from the mainframe.
- **🔍 Advanced Holo-Search**: High-performance filtering by category, status, and year with a state-of-the-art interface.
- **🖼️ Personnel Dossiers**: Deep-dive into character profiles with auto-parsed statistics, verified affiliations, and detailed biographies.
- **🛸 Premium Aesthetics**: 
  - **AuroraText**: Dynamic, animated gradient headers for a futuristic feel.
  - **Glassmorphism**: Sophisticated backdrop blurs and translucent borders.
  - **Aesthetic Depth**: Lightened dark-mode backgrounds and refined contrast overlays.
- **📱 Fluid Typography & Responsiveness**: Optimized with CSS `clamp()` for perfect scaling from mobile devices to ultra-wide monitors.
- **⚡ Performance Optimized**: Fast server-side data fetching and optimized asset delivery.

## 🛠️ Modern Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core**: [React 19](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Data Source**: [Kitsu API](https://kitsu.io/api/edge)

## 📂 Project Structure

- `app/`: Next.js App Router pages and dedicated Client Components.
- `components/`: Atomic UI components, including the modular `AnimeCard`, `CategoryRow`, and `CharacterDetailClient`.
- `lib/`: Kitsu API wrapper and unified TypeScript type definitions.
- `public/`: High-quality assets, including `im.png` and `cv7.jpg`.

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

4. **Open the interface**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

*“Every frame is a legacy.”*
