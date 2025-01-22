# Lumeo - Automated Lecture Generation

Lumeo is an innovative platform for automated lecture generation using the [Manim](https://www.manim.community/) mathematical animation library. Special thanks to [3Blue1Brown](https://www.3blue1brown.com/) (Grant Sanderson) for creating Manim and inspiring this project.

## Project Overview

Lumeo consists of two main components:
- **Frontend** (this repository): A Next.js web application providing the user interface for lecture creation and management
- **Backend** ([lumeo-backend](https://github.com/davidmokos/lumeo-backend)): A Python service using LangGraph agents to generate Manim scenes and orchestrate the video creation process

## Getting Started

### Prerequisites

1. Node.js 18+ and npm/yarn/pnpm
2. Access to the backend service (see [backend setup](https://github.com/davidmokos/lumeo-backend))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/davidmokos/lumeo-frontend.git
cd lumeo-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
```

3. Create a `.env.local` file with required environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Architecture

- **Frontend**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Backend**: Python service using LangGraph for agent orchestration and Manim for video generation
- **Authentication**: Handled via Supabase
- **Storage**: Supabase storage for assets and generated videos

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Manim Community](https://www.manim.community/)
- [LangGraph Documentation](https://python.langchain.com/docs/langgraph)
