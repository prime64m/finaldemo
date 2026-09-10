import mongoose from 'mongoose';
import Scheme from '../models/Scheme.js';

let memorySchemes = [];

// @desc    Get all schemes (Admin view)
// @route   GET /api/admin/schemes
export const getSchemes = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const dbSchemes = await Scheme.find().sort({ createdAt: -1 });
      const allSchemes = [...dbSchemes, ...memorySchemes];
      return res.status(200).json({ success: true, count: allSchemes.length, data: allSchemes });
    } catch (error) {
      return res.status(200).json({ success: true, count: memorySchemes.length, data: memorySchemes });
    }
  }
  return res.status(200).json({ success: true, count: memorySchemes.length, data: memorySchemes });
};

// @desc    Create / Push new scheme to MongoDB
// @route   POST /api/admin/schemes
export const createScheme = async (req, res) => {
  const { title, category, ministry, description, benefits, documentsRequired, applicationUrl, eligibilityCriteria } = req.body;
  const baseSlug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'scheme';
  const slug = `${baseSlug}-${Date.now()}`;

  const schemeObj = {
    _id: `scheme-${Date.now()}`,
    title: title || 'New Scheme',
    slug,
    category: category || 'General',
    ministry: ministry || 'Ministry of Social Welfare',
    description: description || 'Government welfare program',
    benefits: benefits || ['Financial assistance'],
    documentsRequired: documentsRequired || ['Aadhaar Card'],
    applicationUrl: applicationUrl || 'https://india.gov.in',
    eligibilityCriteria: eligibilityCriteria || { maxIncomeLimit: 250000 },
    isPublished: true,
    createdAt: new Date()
  };

  if (mongoose.connection.readyState === 1) {
    try {
      const dbScheme = await Scheme.create({
        title: schemeObj.title,
        slug,
        category: schemeObj.category,
        ministry: schemeObj.ministry,
        description: schemeObj.description,
        benefits: schemeObj.benefits,
        documentsRequired: schemeObj.documentsRequired,
        applicationUrl: schemeObj.applicationUrl,
        eligibilityCriteria: schemeObj.eligibilityCriteria
      });

      console.log(`✅ [MongoDB Atlas] New Scheme Pushed by Admin: ${title}`);
      return res.status(201).json({ success: true, data: dbScheme });
    } catch (error) {
      console.warn(`⚠️ [MongoDB Fallback] Saving scheme to memory store: ${title}`);
      memorySchemes.unshift(schemeObj);
      return res.status(201).json({ success: true, data: schemeObj, fallback: true });
    }
  }

  console.log(`✅ [Standalone Mode] New Scheme Pushed by Admin: ${title}`);
  memorySchemes.unshift(schemeObj);
  return res.status(201).json({ success: true, data: schemeObj, standalone: true });
};

// @desc    Update scheme
// @route   PUT /api/admin/schemes/:id
export const updateScheme = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!scheme) return res.status(404).json({ success: false, message: 'Scheme not found' });
      return res.status(200).json({ success: true, data: scheme });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  return res.status(200).json({ success: true, message: 'Updated in standalone mode' });
};

// @desc    Delete scheme
// @route   DELETE /api/admin/schemes/:id
export const deleteScheme = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      await Scheme.findByIdAndDelete(req.params.id);
    } catch (error) {
      // ignore DB error
    }
  }
  memorySchemes = memorySchemes.filter(s => s._id !== req.params.id);
  return res.status(200).json({ success: true, message: 'Scheme deleted successfully' });
};
