import * as schema from 'src/db/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type Trip = InferInsertModel<typeof schema.trip>;
export type User = InferSelectModel<typeof schema.user>;
