import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const postTable = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const postRelationsTable = relations(postTable, ({ many }) => ({
  comments: many(commentTable),
}));

export const commentTable = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  message: text("message").notNull(),
  postId: uuid("postId").notNull(),
});

export const commentRelationsTable = relations(commentTable, ({ one }) => ({
  post: one(postTable, {
    fields: [commentTable.postId],
    references: [postTable.id],
  }),
}));
