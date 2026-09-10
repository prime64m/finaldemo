import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    ministry: { type: String, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    eligibilityCriteria: {
      minAge: { type: Number, default: 0 },
      maxAge: { type: Number, default: 100 },
      genderAllowed: [{ type: String, default: 'all' }],
      maxIncomeLimit: { type: Number, default: 1000000 },
      categoryAllowed: [{ type: String, default: 'General' }],
      occupations: [{ type: String }],
      residenceState: { type: String, default: 'All' }
    },
    documentsRequired: [{ type: String }],
    applicationUrl: { type: String },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Scheme', schemeSchema);
