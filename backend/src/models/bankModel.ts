import mongoose, { Schema } from 'mongoose';
import { Bank } from '../interfaces/index.js';
import { string } from 'joi';

const bankSchema: Schema<Bank> = new Schema<Bank>({
  name: string,
  logoUrl: string,
  type: string
},{ timestamps: true, versionKey: false })

export default mongoose.model<Bank>('Bank', bankSchema);