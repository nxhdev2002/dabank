import mongoose, { Schema } from 'mongoose';
import { Integration } from '../interfaces/index.js';

const integrationSchema: Schema<Integration> = new Schema<Integration>({
  name: {
    type: String,
    description: String
  }
},{ timestamps: true, versionKey: false })

export default mongoose.model<Integration>('Integration', integrationSchema);