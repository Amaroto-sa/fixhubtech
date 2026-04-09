import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Please add it to your .env.local file."
    );
  }
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
}

// Lazy singleton — only connects when first accessed
let _db: ReturnType<typeof createDb> | undefined;
export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_, prop) {
    if (!_db) _db = createDb();
    return (_db as Record<string | symbol, unknown>)[prop];
  },
});

