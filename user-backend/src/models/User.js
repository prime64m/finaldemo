import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    passwordHash: { type: String },
    profileDetails: {
      age: { type: Number, default: 25 },
      gender: { type: String, default: 'male' },
      income: { type: Number, default: 200000 },
      category: { type: String, default: 'General' },
      occupation: { type: String, default: 'Farmer' },
      state: { type: String, default: 'Uttar Pradesh' },
      disabilityStatus: { type: Boolean, default: false }
    },
    savedSchemes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }]
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
