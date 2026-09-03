# ⚡ FitHealth — 3D Biomechanics & AI-Powered Fitness Ecosystem

[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-000000?logo=turborepo)](https://turbo.build/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14_App_Router-000000?logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Biomechanics-black?logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-REST_API-lightgrey?logo=express)](https://expressjs.com/)
[![React Native](https://img.shields.io/badge/React_Native-Expo_51-61DAFB?logo=react)](https://reactnative.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

**FitHealth** is an enterprise-grade, high-performance fullstack fitness platform engineered with interactive **3D anatomical biomechanics**, automated **progressive overload workout systems**, **adaptive macronutrient/calorie planning with dynamic meal swapping**, and **real-time biometric telemetry**.

Built as a unified **Turborepo Monorepo** delivering a responsive Next.js 14 Web application, a React Native (Expo) mobile client, a centralized Express TypeScript API Gateway, and shared type/3D math packages.

---

## 🌟 Key Features

### 🏋️ 1. Intelligent Workout Generator & Live Session Tracker
* **Algorithm-Driven Program Generation**: Tailors multi-day workout splits based on goal (*Hypertrophy, Strength, Endurance, Fat Loss*), experience level, and available equipment.
* **Active Workout HUD**: Live interactive session player with integrated set logging, RPE recording, target weight/rep suggestions, automatic rest interval countdowns, and completion celebration confetti.
* **Intelligent Progression Engine**: Dynamically calculates weight/rep progression recommendations for your next session based on previous set performance and exertion.

### 🧬 2. Interactive 3D Muscle Anatomy & Biomechanics
* **3D Anatomical Viewer**: Built with **Three.js** and **React Three Fiber**, rendering detailed human muscle anatomy with orbital camera presets (Front, Back, Lateral, Upper/Lower).
* **Kinematic Muscle Activation**: Visualizes primary, secondary, and stabilizer muscle engagement dynamically when inspecting any exercise (Squats, Bench Press, Deadlifts, Pull-ups, etc.).
* **Biomechanics Engine**: Calculates joint angles, ROM (Range of Motion), and force vectors for optimal lifting form and injury prevention.

### 🥗 3. Adaptive Nutrition, Macro Calculator & Meal Swapper
* **Personalized Macro Splitting**: Computes exact BMR/TDEE targets with custom macro ratios (Protein, Carbohydrates, Fats).
* **1-Click Smart Meal Swapper**: Dynamically find and swap meal alternatives that closely match the exact calories and macronutrient ratios of the current meal.
* **Hydration Tracker**: Real-time water intake tracking with quick one-tap logging (+250ml) and daily progress gauges.
* **Food Database Search**: Search and log custom food items with instant calorie and macro breakdown.

### 📈 4. Biometric Telemetry & Muscle Recovery Analytics
* **Adherence Scoring**: Comprehensive scoring based on workout consistency, nutrition adherence, and hydration goals.
* **Muscle Recovery Status**: Real-time heatmap tracking of muscular fatigue and recovery states (0-100%) across major muscle groups (Chest, Back, Quads, Delts, Hamstrings).
* **Body Composition Progress**: Interactive historical charts for body weight, estimated body fat percentage, and workout volume load.

---

## 🏗️ Architecture & Monorepo Structure

```
fithealth-monorepo/
├── apps/
│   ├── web/                     # Next.js 14 Web App (App Router, Tailwind CSS, Three.js HUD)
│   ├── api/                     # Express.js TypeScript API Gateway & Mock Database
│   └── mobile/                  # React Native & Expo 51 Mobile Application
│
├── packages/
│   ├── types/                   # Shared TypeScript interfaces (User, Workout, Diet, Progress)
│   └── three-scenes/            # Shared 3D Biomechanics math, muscle coordinates & camera presets
│
├── .github/workflows/           # GitHub Actions CI/CD Pipeline
├── Dockerfile.api               # Multi-stage Docker build for Backend API Gateway
├── Dockerfile.web               # Multi-stage Docker build for Next.js Web App
├── docker-compose.yml           # Unified multi-container fullstack orchestration
├── vercel.json                  # Vercel deployment configuration for Next.js
├── render.yaml                  # Render Blueprint for 1-click cloud deployments
└── turbo.json                   # Turborepo task pipeline configuration
```

---

## 🚀 Quickstart (Local Development)

### Prerequisites
* **Node.js** `>= 20.0.0`
* **npm** `>= 10.0.0`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/fithealth.git
cd fithealth

# Install monorepo dependencies
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
```bash
# Copy root environment template
cp .env.example .env

# (Optional) Customize apps/web and apps/api environment files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

### 3. Run Development Servers
Start all workspaces in parallel via Turborepo:
```bash
npm run dev
```

| Service | URL | Description |
| :--- | :--- | :--- |
| **Web Frontend** | `http://localhost:3000` | Next.js 14 Interactive Web App |
| **API Gateway** | `http://localhost:4000` | Express REST Backend & Health Check |
| **API Health Check** | `http://localhost:4000/health` | API Status Verification |
| **Mobile App** | `npm --prefix apps/mobile run start` | Expo Dev Server (Scan QR for Expo Go) |

---

## 🚢 Production Deployment

### Option 1: Docker Compose (1-Command Fullstack Deployment)

To deploy both the **API Gateway** and **Next.js Web App** in isolated, production-grade containers:

```bash
# Build and launch all containers in detached mode
docker-compose up -d --build

# View container logs
docker-compose logs -f

# Stop containers
docker-compose down
```

* **Frontend**: Accessible on `http://localhost:3000`
* **Backend**: Accessible on `http://localhost:4000`

---

### Option 2: Vercel (Web Frontend) + Render / Railway (API Gateway)

#### 1. Deploy API Gateway on Render or Railway
1. Create a new Web Service on [Render](https://render.com) or [Railway](https://railway.app).
2. Set **Root Directory** to repository root.
3. Set **Build Command**:
   ```bash
   npm install --legacy-peer-deps && npm run build --filter=@fithealth/types --filter=@fithealth/three-scenes --filter=@fithealth/api
   ```
4. Set **Start Command**:
   ```bash
   npm --prefix apps/api run start
   ```
5. Note your deployed API URL (e.g. `https://fithealth-api.onrender.com`).

#### 2. Deploy Web App on Vercel
1. Import the repository into [Vercel](https://vercel.com).
2. Set **Framework Preset** to `Next.js`.
3. Set **Root Directory** to `apps/web`.
4. In **Build & Development Settings**, set **Install Command** to:
   ```bash
   cd ../.. && npm install --legacy-peer-deps
   ```
5. Set **Build Command** to:
   ```bash
   cd ../.. && npm run build --filter=@fithealth/web...
   ```
6. Add Environment Variable:
   * `NEXT_PUBLIC_API_URL` = `https://your-deployed-api.onrender.com`
7. Click **Deploy**.

---

### Option 3: Mobile App via Expo EAS (iOS / Android)

To build native binaries (APK / IPA) using Expo Application Services:

```bash
cd apps/mobile

# Install EAS CLI globally
npm install -g eas-cli

# Log in to your Expo account
eas login

# Configure EAS Build
eas build:configure

# Generate Android APK build
eas build --platform android --profile preview

# Generate iOS TestFlight build
eas build --platform ios --profile preview
```

---

## 📡 API Reference

The FitHealth API Gateway exposes the following endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | API Health & status check |
| `POST` | `/auth/signup` | Register user & complete onboarding |
| `GET` | `/users/me` | Fetch authenticated user profile & metrics |
| `PUT` | `/users/me` | Update user fitness metrics & goals |
| `GET` | `/workout-plan/current` | Retrieve active multi-day workout split |
| `POST` | `/workout-plan/generate` | Generate algorithmically customized workout plan |
| `POST` | `/workout-plan/log` | Submit completed workout log & get progression advice |
| `GET` | `/workout-plan/logs` | Fetch workout history and PR records |
| `GET` | `/exercises` | List all exercises with biomechanics data |
| `GET` | `/exercises/:id` | Get specific exercise detail & 3D muscle mapping |
| `GET` | `/diet-plan/current` | Retrieve current calorie & macro nutrition plan |
| `GET` | `/diet-plan/summary` | Get daily consumed calories, macros & water intake |
| `POST` | `/diet-plan/log-food` | Log food intake entry |
| `POST` | `/diet-plan/log-water` | Log hydration intake (+250ml) |
| `POST` | `/diet-plan/swap-meal` | Retrieve macro-matched meal swap alternatives |
| `GET` | `/progress` | Fetch historical weight & body composition logs |
| `POST` | `/progress` | Log daily body weight / body fat entry |
| `GET` | `/progress/adherence` | Calculate overall 7-day adherence score |
| `GET` | `/progress/muscle-recovery` | Get muscle group fatigue & recovery percentage |

---

## ⚙️ Environment Variables

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `4000` (API) / `3000` (Web) | Port number for the respective service |
| `NODE_ENV` | `development` | Runtime environment (`development`, `production`, `test`) |
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | Backend API URL accessed by the frontend client |
| `JWT_SECRET` | `fithealth_secret` | Secret key used for signing JWT authentication tokens |
| `JWT_EXPIRATION` | `7d` | Lifetime of authentication tokens |

---

## 🛠️ Tech Stack

* **Monorepo**: [Turborepo](https://turbo.build/)
* **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React 18](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti), [Recharts](https://recharts.org/)
* **3D Graphics & Biomechanics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
* **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), [JSON Web Tokens](https://jwt.io/), [CORS](https://www.npmjs.com/package/cors)
* **Mobile**: [React Native](https://reactnative.dev/), [Expo 51](https://expo.dev/)
* **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
* **DevOps & Containers**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/), [GitHub Actions](https://github.com/features/actions)

---

## 📄 License
This project is licensed under the MIT License.
