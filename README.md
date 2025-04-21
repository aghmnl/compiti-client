# Task Management Application (Client Side)

## Overview

This repository contains the **Client Side** of a simple **Task Management Application** built as part of an onboarding exercise. The application allows users to manage a list of tasks with the following fields:

- **id**: Auto-incremental identifier.
- **title**: Required string field.
- **description**: Optional string field.
- **status**: Enum with values: `pending`, `in progress`, `done`.

The **Server Side** of this application is available in the following repository:  
[https://github.com/aghmnl/compiti-server](https://github.com/aghmnl/compiti-server)

The server is implemented using the following technologies:

- **Next.js** (App Router, TypeScript) for the frontend.
- **tRPC** for communication with the backend.
- **Zod** for client-side schema validation.
- **shadcn/ui** for a clean and responsive UI.
- **Clerk** for user authentication.

## Features

The client includes the following functionalities:

1. Create a new task.
2. View the list of tasks.
3. Edit an existing task.
4. Delete a task.
5. Client-side validation using Zod.
6. A clean and responsive UI built with shadcn/ui.
7. Authentication using Clerk.

## Documentation Used

The following official documentation was used during the development process:

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Zod Documentation](https://zod.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Clerk Documentation](https://clerk.dev/docs)

## Objectives Achieved

This repository fulfills the following objectives:

- Implements a modular component structure.
- Follows best practices for code organization (e.g., separation of components, API calls, validations).
- Provides a fully functional CRUD application with a clean and responsive UI.
- Ensures secure access to the application using Clerk authentication.

## Installation and Local Setup

Follow these steps to install and run the application locally:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/aghmnl/compiti-client
   cd compiti-client
   ```

2. **Install dependencies**

   ```bash
    npm install
   ```

3. Link the backend repository as a local dependency:

   ```bash
   npm install --save ../compiti-server
   ```

4. **Set up environment variables**

- Create a .env file in the root directory.
- Add the following variables:
  ```
  NEXT_PUBLIC_CLERK_FRONTEND_API="your-clerk-frontend-api"
  NEXT_PUBLIC_SERVER_URL="http://localhost:4000"
  ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Access the application**

- Open your browser and navigate to http://localhost:3000.

## Contributing

Feel free to fork this repository and submit pull requests for improvements or bug fixes.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).
