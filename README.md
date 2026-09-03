<!-- prettier-ignore -->
<div align="center">

<img src="public/logo.png" alt="The Wild Oasis logo" align="center" height="80" />

# The Wild Oasis — Website

_Customer-facing booking site for a luxury cabin hotel in the heart of the Italian Dolomites_

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-3ecf8e?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
![Node version](https://img.shields.io/badge/Node.js-%3E%3D20.9-3c873a?style=flat-square&logo=node.js&logoColor=white)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4?style=flat-square)](https://github.com/prettier/prettier)

[Demo](#demo) • [Key Features](#key-features) • [Technical Highlights](#technical-highlights) • [App Routes](#app-routes) • [Project Structure](#project-structure) • [How To Use](#how-to-use) • [Built With](#built-with) • [My Practices](#my-development-practices)

</div>

---

## Demo

Explore the live website here 👉 : [https://the-wild-oasis-website-seven-eta.vercel.app/](https://the-wild-oasis-website-seven-eta.vercel.app/)

> [!NOTE]
> The application runs in **demo mode**: each guest is limited to a single active booking.

---

## Key Features

| Feature              | Description                                                                   |
| :------------------- | :---------------------------------------------------------------------------- |
| 🏡 **Cabin Catalog** | Filter cabins by group capacity with interactive previews & pricing.          |
| 📅 **Smart Booking** | Real-time calendar disabling booked dates with server-side price calculation. |
| 🔐 **OAuth Auth**    | Seamless login via Google OAuth with protected account routes.                |
| 📑 **Reservations**  | Full self-service management to view, edit, or cancel active bookings.        |
| 👤 **Guest Profile** | Update personal details, national ID, and national flags.                     |

---

## Technical Highlights

| **Feature**               | **Description**                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| **Partial Prerendering**  | `cacheComponents` mixes static shells with dynamic content for instant page loads.              |
| **Server Components**     | All catalog and booking data is fetched on the server — zero client-side data fetching.         |
| **Server Actions**        | Mutations run through progressive-enhancement forms with `useActionState` and server redirects. |
| **Granular Caching**      | `"use cache"` with `cacheLife`/`cacheTag` for reads, `revalidatePath` after every mutation.     |
| **Typed Data Layer**      | Fully typed Supabase client backed by CLI-generated database types.                             |
| **Secure Authentication** | Auth.js v5 with Google OAuth; sessions carry only a `guestId` — no database hit per request.    |
| **Streaming UI**          | Suspense boundaries with spinner fallbacks stream cabins and reservations as they load.         |
| **Image Optimization**    | `next/image` with remote patterns for Supabase Storage, country flags, and Google avatars.      |

---

## App Routes

The following routes make up the application:

- All **_protected_** routes require a signed-in guest and are guarded by middleware; signed-out visitors are redirected to the login page.

| **Page**              | **Route**                               | **Access** |
| --------------------- | --------------------------------------- | ---------- |
| **Home**              | `/`                                     | Public     |
| **Cabins**            | `/cabins`                               | Public     |
| **Cabin Details**     | `/cabins/:cabinId`                      | Public     |
| **Booking Confirmed** | `/cabins/thankyou`                      | Public     |
| **Login**             | `/login`                                | Public     |
| **About**             | `/about`                                | Public     |
| **Account Dashboard** | `/account`                              | Protected  |
| **Guest Profile**     | `/account/profile`                      | Protected  |
| **Reservations**      | `/account/reservations`                 | Protected  |
| **Edit Reservation**  | `/account/reservations/edit/:bookingId` | Protected  |
| **Cabins API**        | `/api/cabins/:cabinId`                  | Public     |

---

## Project Structure

<details>
<summary>📁 <b>Click to expand project structure</b></summary>

```
the-wild-oasis-website/
├── public/                     # Static assets (logo, flags, images)
├── src/
│   ├── app/                    # Next.js App Router (Pages, Layouts, API Routes)
│   │   ├── _components/        # Application UI components grouped by feature
│   │   │   ├── cabins/         # Cabin list, cards, filters, and detail components
│   │   │   ├── reservations/   # Date selection, reservation forms, and guest controls
│   │   │   ├── account/        # User profile, edit forms, and reservation lists
│   │   │   └── ui/             # Reusable base components (Navigation, Spinners, Modals)
│   │   ├── _lib/               # Core application logic & server actions
│   │   │   ├── actions.ts      # Next.js Server Actions (mutations, validation)
│   │   │   ├── data-service.ts # Data fetching layer interacting with Supabase
│   │   │   ├── auth.ts         # Auth.js configuration & Google provider setup
│   │   │   └── supabase.ts     # Supabase client initialization
│   │   ├── _styles/            # Global Tailwind CSS configurations
│   │   ├── account/            # Protected guest account routes
│   │   ├── api/                # API Route handlers
│   │   ├── cabins/             # Cabin catalog & dynamic cabin routes
│   │   └── layout.tsx          # Root layout with fonts, navigation, and providers
│   ├── types/                  # TypeScript interfaces & Supabase auto-generated types
│   └── proxy.ts                # Route protection and Auth.js session handling
├── .env.example                # Template for environment variables
├── next.config.ts              # Next.js configuration (PPR, remote images)
└── package.json                # Project dependencies and scripts
```

</details>

---

## How To Use

You can get The Wild Oasis up and running on your local machine using the following steps:

1. **Fork or Git-clone:**
   - You can fork the app on GitHub or git-clone it into your local machine.

     git clone https://github.com/AhmedSalman1/The-Wild-Oasis-Website.git
     cd The-Wild-Oasis-Website

2. **Install Dependencies:**
   - In the root directory of the app, install the dependencies.

     npm install

3. **Set up the Supabase database:**
   - In your Supabase project, create the four tables the app relies on:

   | **Table**  | **Purpose**        | **Key columns**                                                                                                                                                                 |
   | ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `cabins`   | Cabin catalog      | `name`, `description`, `maxCapacity`, `regularPrice`, `discount`, `image`                                                                                                       |
   | `guests`   | Registered guests  | `fullName`, `email` (unique), `nationality`, `nationalID`, `countryFlag`                                                                                                        |
   | `bookings` | Guest reservations | `cabinId` (FK), `guestId` (FK), `startDate`, `endDate`, `numNights`, `numGuests`, `cabinPrice`, `extrasPrice`, `totalPrice`, `status`, `hasBreakfast`, `isPaid`, `observations` |
   | `settings` | Hotel settings     | `minBookingLength`, `maxBookingLength`, `maxGuestsPerBooking`, `breakfastPrice`                                                                                                 |
   - Create a **_public storage bucket_** named `cabin-images` and upload the cabin photos there.

   > [!TIP]
   > The database types in `src/types/database.types.ts` were generated with the Supabase CLI. Regenerate them after any schema change:
   >
   > npx supabase gen types typescript --project-id <project-id> --schema public > src/types/database.types.ts

4. **Configure Google OAuth:**
   - In the [Google Cloud Console](https://console.cloud.google.com), create a project and configure the OAuth consent screen.
   - Create an **_OAuth client ID_** of type _Web application_.
   - Add this authorized redirect URI: `http://localhost:3000/api/auth/callback/google`.
   - Copy the client ID and client secret for the next step.

5. **Set Environment Variables:**
   - In the root directory of the app, create a file named `.env.local` (copy it from `.env.example`) and set your variables.

     cp .env.example .env.local

   <details>
   <summary><b>Environment variables</b></summary>

   | **Variable**         | **Description**                                         |
   | -------------------- | ------------------------------------------------------- |
   | `SUPABASE_URL`       | Your Supabase project URL                               |
   | `SUPABASE_KEY`       | Your Supabase API key                                   |
   | `AUTH_SECRET`        | A random secret used to encrypt Auth.js session tokens  |
   | `AUTH_TRUST_HOST`    | Keep `true` — required when the app runs behind a proxy |
   | `AUTH_GOOGLE_ID`     | Google OAuth client ID                                  |
   | `AUTH_GOOGLE_SECRET` | Google OAuth client secret                              |

   </details>

   > [!IMPORTANT]
   > All database queries run on the server (Server Components, Server Actions, and route handlers only), so the Supabase client is never exposed to the browser. Never commit your `.env.local` file.

6. **Run Commands:**

   npm run dev # development
   npm run prod # production build + serve
   npm run lint # lint the codebase

   Open http://localhost:3000 and start booking.

   > [!WARNING]
   > If you deploy the app (e.g. to Vercel), add your production URL to the Google OAuth client's authorized redirect URIs: `https://<your-domain>/api/auth/callback/google`, and keep `AUTH_TRUST_HOST=true`.

---

## Built With

- [Next.js](https://nextjs.org/) - The React framework used (App Router, Partial Prerendering, React Compiler)
- [React](https://react.dev/) - UI library with Server Components and Server Actions
- [Supabase](https://supabase.com/) - PostgreSQL database and image storage
- [Auth.js](https://authjs.dev/) - Authentication via Google OAuth (next-auth v5)
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Headless UI](https://headlessui.com/) - Accessible dialog components
- [Heroicons](https://heroicons.com/) - Icon set
- [React Day Picker](https://react-day-picker.org/) - Calendar for selecting booking dates
- [date-fns](https://date-fns.org/) - Date utilities
- [TypeScript](https://www.typescriptlang.org/) - Static typing in strict mode
- [ESLint](https://eslint.org/) - Linting with the Next.js presets
- [Prettier](https://prettier.io/) - Code formatting with the Tailwind CSS plugin

---

## My Development Practices

I adhere to these practices to ensure a maintainable and scalable codebase:

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for meaningful and consistent commit messages.
- Follow a structured branching strategy with short-lived `feature/*` branches merged through pull requests.
- Maintain clean and readable code by keeping components small, feature-focused, and strictly typed.
- Ensure all changes pass linting (`npm run lint`) and a production build before integration.

These principles guide my work to deliver high-quality, reliable, and scalable software.

---

## Conclusion

Thank you for exploring The Wild Oasis, a luxury cabin booking website built with Next.js and Supabase. This project is designed to showcase modern full-stack patterns — server components, streaming, granular caching, and secure server-side mutations — wrapped in a polished guest experience.
