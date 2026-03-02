import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const userModel = pgTable('user', {
  userId: text('user_id').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  username: text(),
});
