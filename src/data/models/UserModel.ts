import {
  boolean,
  pgPolicy,
  pgTable,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const userModel = pgTable(
  'user',
  {
    id: text().primaryKey().notNull(),
    name: text(),
    email: text().notNull(),
    avatarUrl: text('avatar_url'),
    emailVerified: boolean('email_verified').default(false),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string',
    }).defaultNow(),
    updatedAt: timestamp('updated_at', {
      withTimezone: true,
      mode: 'string',
    }).defaultNow(),
  },
  (table) => [
    unique('user_email_key').on(table.email),
    pgPolicy('view_users', {
      as: 'permissive',
      for: 'select',
      to: ['public'],
      using: sql`true`,
    }),
    pgPolicy('manage_own_user', {
      as: 'permissive',
      for: 'all',
      to: ['authenticated'],
    }),
  ],
);