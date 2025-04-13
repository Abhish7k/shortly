import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/your-db-name";

const client = postgres(connectionString, {
  prepare: false,
});

const db = drizzle(client, { schema });

export { eq, and, or, like, desc, asc } from "drizzle-orm";
