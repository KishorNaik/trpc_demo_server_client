# 🎯TRPC Demo

## 📌 Overview: What is tRPC?
[tRPC](https://trpc.io/) is a modern framework for building fully type-safe APIs without needing to define schemas or generate code. It allows you to call backend procedures from your frontend with full TypeScript inference—no REST, no GraphQL, no boilerplate.

With tRPC, your API becomes a natural extension of your codebase. You define procedures on the server, and the client gets instant access to them with full autocomplete, validation, and type safety.

## ❗ The Problem
Traditional API development often involves:
- ❌ Duplicated types between backend and frontend
- ❌ Manual schema definitions (OpenAPI, GraphQL SDL)
- ❌ Code generation steps that break or go stale
- ❌ Lack of type safety across the network boundary

## ✅ Benefits
- ✅ End-to-End Type Safety Define your input/output types once on the server—your client gets them automatically.
- ✅ No Code Generation Unlike GraphQL or OpenAPI, tRPC doesn’t require any build steps or generated clients.
- ✅ Developer Velocity Call backend procedures like local functions. No need to remember routes or payload shapes.
- ✅ Zod Integration Use Zod for runtime validation and schema inference—perfect for robust APIs.
- ✅ Modular & Scalable Routers can be composed, namespaced, and federated easily—ideal for microservices or modular monoliths.
- ✅ Framework Agnostic Works with Express, Fastify, Next.js, and more.

## 📦 Project Setup
- Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-directory>
``` 
- 🧰 Setup `util` Service
    - Install dependencies:
    ```bash
    npm i
    ```
    - Build the utility package:
    ```bash
    npm run build
    ```
    - Link the package:
    ```bash
    npm link
    ```
- 🌐 Setup `api` Service
    - Move into the api solution and create an .env file:
    ```bash
    NODE_ENV=development
    PORT=3001

    # Logging
    LOG_FORMAT=dev
    LOG_DIR=logs

    # CORS Config
    ORIGIN=*
    CREDENTIALS=true

    # Rate Limiter
    RATE_LIMITER=1000
    ```
    - Install dependencies:
    ```bash
    npm i
    ```
    - Link the `util` package:
    ```bash
    npm link <utilurl>
    ```
    - Build the Api service:
    ```bash
    npm run build
    ```
    - Run the API in development mode:
    ```bash
    npm run dev
    ```
- 🌐 Setup `client` NextJs App
    - Install dependencies:
    ```bash
    npm i
    ```
## 🚀 Generating and Sharing tRPC Types
To enable full end-to-end type safety between your Express.js API and your Next.js frontend, we generate a .d.ts file that exports the AppRouter (or TRPCAppRouter) type. This allows the frontend to infer all procedure inputs and outputs without duplicating logic.
- 📦 Step 1: Generate the Type Definition
API project root, run:
```bash
npm run trpc:type
```
This command uses dts-bundle-generator to extract only the type information from your tRPC router and outputs it to the trpc-types folder.

📁 Output: trpc-types/TRPCAppRouter.d.ts
- 📁 Step 2: Copy the Type to the Next.js App
Manually copy the generated file into your Next.js project:
```bash
cp trpc-types/TRPCAppRouter.d.ts ../nextjs-app/src/trpc/types/
```
You can automate this step in CI/CD or with a postbuild script if needed.
Now frontend has full IntelliSense, type inference, and safety when calling backend procedures—without needing a monorepo or runtime dependency on the API codebase.

## 🧩 Source Code
- Server
    - TRPC Config
        https://github.com/KishorNaik/trpc_demo_server_client/blob/main/api/src/config/trpc/index.ts
    - Demo
        https://github.com/KishorNaik/trpc_demo_server_client/tree/main/api/src/modules/trpcDemo
    - Merge Route
        https://github.com/KishorNaik/trpc_demo_server_client/blob/main/api/src/modules/app.Module.ts
    - init tRPC Router
        https://github.com/KishorNaik/trpc_demo_server_client/blob/main/api/src/app.ts#L61
    - Generate type using trpc:type script
        https://github.com/KishorNaik/trpc_demo_server_client/blob/main/api/trpc-types/TRPCAppRouter.d.ts

- Client
    - Copy trpc type to nextjs
        https://github.com/KishorNaik/trpc_demo_server_client/blob/main/client/trpc/types/TRPCAppRouter.d.ts
    - setup client
        https://github.com/KishorNaik/trpc_demo_server_client/blob/main/client/trpc/index.ts
    - demo Page
        https://github.com/KishorNaik/trpc_demo_server_client/blob/main/client/app/demo/page.tsx

