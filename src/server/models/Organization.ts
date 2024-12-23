import mongoose, { Document, Schema } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  logo?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'שם הארגון הוא שדה חובה'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'אימייל הארגון הוא שדה חובה'],
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  logo: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Organization = mongoose.model<IOrganization>('Organization', organizationSchema);
