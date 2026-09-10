import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'editor'], default: 'superadmin' }
  },
  { timestamps: true }
);

export default mongoose.model('AdminUser', adminUserSchema);
