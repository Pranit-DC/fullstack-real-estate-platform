import { Schema, model, Document } from 'mongoose';

export interface IContent extends Document {
  section: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// Mixed type (`Record<string, unknown>`) keeps the schema flexible
// so each section (hero, faq, amenities, etc.) can store its own shape.
const contentSchema = new Schema<IContent>(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IContent>('Content', contentSchema);
