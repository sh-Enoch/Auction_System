This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Frontend Development

This section provides details specific to developing and running the frontend application.

### Environment Variables

The frontend application requires an API endpoint URL to fetch auction data. This is configured using environment variables.

1.  Create a file named `.env.local` in the `frontend` directory.
2.  Add the following line to this file, replacing the URL if your backend is running elsewhere:

    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    ```

    The URL `http://localhost:8000/api` is the default if you are running the backend server locally with its default settings. The `.env.local` file is ignored by Git, so your specific settings won't be committed.

### Project Structure

The frontend code is organized into the following main directories:

-   `src/app/`: Contains the main page components and global layout files for the Next.js application (e.g., `page.js`, `layout.js`).
-   `src/components/`: Houses reusable React components used throughout the application (e.g., `AuctionCard.js`).
-   `src/lib/`: Includes utility functions and helpers, such as the API communication module (`api.js`) which handles requests to the backend.

### Running the Frontend

To run the frontend application locally, follow these steps:

1.  **Install Dependencies:**
    Navigate to the `frontend` directory in your terminal and run:
    ```bash
    npm install
    ```
    or if you use Yarn:
    ```bash
    yarn install
    ```

2.  **Start the Development Server:**
    Once dependencies are installed, start the Next.js development server:
    ```bash
    npm run dev
    ```
    or with Yarn:
    ```bash
    yarn dev
    ```

The frontend will typically be available at `http://localhost:3000`. The server will automatically reload when you make changes to the code.
