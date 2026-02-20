import * as schema from 'src/data/models';
import { InferSelectModel } from 'drizzle-orm';

export type Trip = InferSelectModel<typeof schema.tripModel>;
export type User = InferSelectModel<typeof schema.userModel>;
