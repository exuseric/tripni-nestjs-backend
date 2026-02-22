import {
  boolean,
  doublePrecision,
  foreignKey,
  integer,
  jsonb,
  pgPolicy,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { tripModel, userModel } from 'src/data/models';

export const travelDetailModel = pgTable(
  'travel_detail',
  {
    id: serial().primaryKey().notNull(),
    tripId: integer('trip_id').notNull(),
    userId: text('user_id')
      .default(sql`auth.user_id()`)
      .notNull(),
    detailType: text('detail_type').notNull(),
    name: text().notNull(),
    description: text(),
    latitude: doublePrecision(),
    longitude: doublePrecision(),
    arrivalTime: timestamp('arrival_time', {
      withTimezone: true,
      mode: 'string',
    }),
    departureTime: timestamp('departure_time', {
      withTimezone: true,
      mode: 'string',
    }),
    isVerified: boolean('is_verified').default(false),
    gallery: jsonb().default([]),
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
    foreignKey({
      columns: [table.tripId],
      foreignColumns: [tripModel.id],
      name: 'travel_detail_trip_id_fkey',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [userModel.id],
      name: 'travel_detail_user_id_fkey',
    }).onDelete('cascade'),
    pgPolicy('delete_own_travel_details', {
      as: 'permissive',
      for: 'delete',
      to: ['authenticated'],
      using: sql`(user_id = auth.user_id())`,
    }),
    pgPolicy('update_own_travel_details', {
      as: 'permissive',
      for: 'update',
      to: ['authenticated'],
    }),
    pgPolicy('insert_own_travel_details', {
      as: 'permissive',
      for: 'insert',
      to: ['authenticated'],
    }),
    pgPolicy('view_travel_details', {
      as: 'permissive',
      for: 'select',
      to: ['public'],
    }),
  ],
);