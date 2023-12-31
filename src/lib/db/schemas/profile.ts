import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  gender: text("gender").default("null"),
});
