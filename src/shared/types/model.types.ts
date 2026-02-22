import * as schema from 'src/data/models';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type Trip = InferSelectModel<typeof schema.tripModel>;
export type CreateTrip = InferInsertModel<typeof schema.tripModel>;
export type DestinationSelectType = Omit<
  InferSelectModel<typeof schema.destinationModel>,
  'gallery'
> & {
  gallery: string[] | null;
};
export type CreateDestinationType = InferInsertModel<
  typeof schema.destinationModel
>;

export type User = InferSelectModel<typeof schema.userModel>;