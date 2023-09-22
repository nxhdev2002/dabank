import mongoose, { Schema } from 'mongoose';
import { UserPlan } from '../interfaces/index.js';
import userIntegration from './userIntegration.js';
import bankModel from './bankModel.js';

const userPlanSchema: Schema<UserPlan> = new Schema<UserPlan>(
  {
    plan: {
      type: mongoose.Types.ObjectId,
    },
    banks: [bankModel],
    integrations: [userIntegration]
  },
  { timestamps: true, versionKey: false }
);

userPlanSchema.path('integrations').set(function(integrations: any) {
  if (integrations === null || integrations === undefined) {
    return [];
  }
  return integrations;
});

export default mongoose.model<UserPlan>('UserPlan', userPlanSchema);