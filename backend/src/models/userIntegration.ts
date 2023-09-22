import mongoose, { Schema } from 'mongoose';
import { userIntegration } from '../interfaces/index.js';

const userIntegrationSchema: Schema<userIntegration> = new Schema<userIntegration>(
  {
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    integrationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Integration'
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<userIntegration>('userIntegration', userIntegrationSchema);