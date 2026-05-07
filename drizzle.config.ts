import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema/index.ts",
    out: "./db/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL || "",
    },
});
