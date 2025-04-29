# Task Management Application (Client Side)

## Overview

This repository contains the **Client Side** of a simple **Task Management Application** built as part of an onboarding exercise. The application allows users to manage a list of tasks with the following fields:

- **id**: Auto-incremental identifier.
- **title**: Required string field.
- **description**: Optional string field.
- **status**: Enum with values: `pending`, `in progress`, `done`.

### Demo Video

## Server side

The **Server Side** of this application is available in the following repository:  
[https://github.com/aghmnl/compiti-server](https://github.com/aghmnl/compiti-server)

**Important:** This client is designed to work closely with the server repository. Both repositories **must** be cloned into the same parent directory, like this:

ParentFolder/  
├── compiti-client/ (This repository)  
└── compiti-server/ (The server repository)

This structure is necessary because the client installs the server as a local file dependency to share common code, such as type definitions (`taskDefinitions`).

## Features & Objectives Achieved

This repository successfully implements a full CRUD (Create, Read, Update, Delete) Task Management application client, demonstrating proficiency in:

- **Modern Frontend Stack:** Built with **Next.js 15 (App Router)** and **React 19**.
- **Type-Safe API Communication:** Integrated **tRPC** for end-to-end type safety between client and server.
- **Robust Data Fetching & State Management:** Leveraged **TanStack Query (React Query)** for efficient data fetching, caching, and synchronization, including automatic UI updates after mutations.
- **Advanced Data Grid:** Implemented a feature-rich task table using **TanStack Table (React Table)**, featuring:
  - Sorting (Implicit via TanStack Table capabilities, if enabled).
  - Responsive column visibility.
  - Action menus (Edit, Delete) accessible via buttons and dropdowns for different screen sizes.
- **Component-Based UI:** Developed using **shadcn/ui** for a clean, accessible, and composable component library (including `DataTable`, `Dialog`, `Form`, `Input`, `Button`, `DropdownMenu`, `Tooltip`, `Select`).
- **Form Handling & Validation:** Utilized **React Hook Form** for efficient form state management and **Zod** for schema definition and validation, ensuring data integrity before API calls.
- **Authentication:** Integrated **Clerk** for secure user authentication and management, protecting application routes.
- **Responsive Design:** Ensured the UI adapts gracefully to different screen sizes, including a Floating Action Button (FAB) on mobile for creating tasks.
- **Code Quality & Organization:** Followed best practices for code structure, separating concerns into components, services (`useTaskService`), shared types (`taskDefinitions`), and utility functions.
- **Developer Experience:** Configured with **TypeScript**, **ESLint**, and **Prettier** (with Tailwind CSS plugin) for improved code consistency and maintainability.

## Technologies

The server is implemented using the following technologies:

- **Next.js** (App Router, TypeScript) for the frontend.
- **tRPC** for communication with the backend.
- **Zod** for client-side schema validation.
- **shadcn/ui** for a clean and responsive UI.
- **Clerk** for user authentication.

### Documentation Used

The following official documentation was used during the development process:

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Zod Documentation](https://zod.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Clerk Documentation](https://clerk.dev/docs)

## Installation and Local Setup

Follow these steps to install and run the application locally:

### Prerequisites

- Node.js (v16 or higher)
- npm
- A running instance of the [Compiti Server](https://github.com/aghmnl/compiti-server)

### Steps

1. **Clone the repository**

   ```bash
   # Navigate to your desired parent directory
   cd path/to/your/ParentFolder

   # Clone the server
   git clone https://github.com/aghmnl/compiti-server

   # Clone the client
   git clone https://github.com/aghmnl/compiti-client

   # Navigate into the client directory
   cd compiti-client
   ```

2. **Install client dependencies AND link the server repository:**

   ```bash
   npm install --save ../compiti-server
   ```

3. **Set up environment variables**

- Create a .env.local file in the root of the compiti-client directory.
- Add the following variables, replacing placeholder values:

  ```bash
  # The base URL of your Compiti Server (running locally)
  # Note: Do NOT include /trpc here; the client adds it.
  NEXT_PUBLIC_SERVER_URL=http://localhost:4000

  # Your Clerk Publishable Key (from Clerk dashboard)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key

  # Your Clerk Secret Key (from Clerk dashboard)
  # Required for certain Clerk operations during development/build.
  # IMPORTANT: Keep this key secret and DO NOT commit it to version control.
  CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
  ```

4. Set up and run the server

- Navigate to the server directory: cd ../compiti-server
- Follow the instructions in the compiti-server's README to install its dependencies, set up its environment variables (including database connection, Clerk keys, etc.), and start the server (usually with npm run dev or yarn dev).
- Ensure the server is running on http://localhost:4000.

5. **Run the development server**

- Navigate back to the client directory: cd ../compiti-client
- Start the client:

  ```bash
  npm run dev
  ```

6. **Access the application**

- Open your browser and navigate to http://localhost:3000.
- You should be prompted to sign in via Clerk.

## Contributing

Feel free to fork this repository and submit pull requests for improvements or bug fixes. Ensure any changes are compatible with the linked compiti-server repository.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).
