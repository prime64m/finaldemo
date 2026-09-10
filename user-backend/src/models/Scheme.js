import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: String, required: true },
    ministry: { type: String, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    eligibilityCriteria: {
      minAge: { type: Number, default: 0 },
      maxAge: { type: Number, default: 100 },
      genderAllowed: [{ type: String }],
      maxIncomeLimit: { type: Number },
      categoryAllowed: [{ type: String }],
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
