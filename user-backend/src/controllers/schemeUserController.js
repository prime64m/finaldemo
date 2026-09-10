import mongoose from 'mongoose';
import Scheme from '../models/Scheme.js';

// @desc    Get published schemes for users
// @route   GET /api/user/schemes
export const getPublishedSchemes = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const { category, search } = req.query;
      let query = { isPublished: true };
      if (category) query.category = category;
      if (search) query.title = { $regex: search, $options: 'i' };

      const schemes = await Scheme.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: schemes.length, data: schemes });
    } catch (error) {
      console.log('Falling back to local admin schemes endpoint');
    }
  }

  // Standalone fallback: fetch live schemes from local admin server
  try {
    const adminRes = await fetch('http://localhost:5001/api/admin/schemes');
    const adminData = await adminRes.json();
    if (adminData.success) {
      return res.status(200).json({ success: true, count: adminData.data.length, data: adminData.data });
    }
  } catch (e) {}

  return res.status(200).json({ success: true, count: 0, data: [] });
};

// @desc    Check scheme eligibility against user profile
// @route   POST /api/user/schemes/check-eligibility
export const checkEligibility = async (req, res) => {
  try {
    const { age, gender, income, category, occupation, state } = req.body;
    let allSchemes = [];

    if (mongoose.connection.readyState === 1) {
      try {
        allSchemes = await Scheme.find({ isPublished: true });
      } catch (e) {}
    }

    if (allSchemes.length === 0) {
      try {
        const adminRes = await fetch('http://localhost:5001/api/admin/schemes');
        const adminData = await adminRes.json();
        if (adminData.success) allSchemes = adminData.data;
      } catch (e) {}
    }

    const eligibleSchemes = allSchemes.filter(scheme => {
      const criteria = scheme.eligibilityCriteria;
      if (!criteria) return true;

      if (age && (age < criteria.minAge || age > criteria.maxAge)) return false;
      if (income && criteria.maxIncomeLimit && income > criteria.maxIncomeLimit) return false;

      if (gender && criteria.genderAllowed && criteria.genderAllowed.length > 0) {
        if (!criteria.genderAllowed.includes('all') && !criteria.genderAllowed.includes(gender.toLowerCase())) {
          return false;
        }
      }

      if (state && criteria.residenceState && criteria.residenceState !== 'All' && criteria.residenceState !== state) {
        return false;
      }

      return true;
    });

    return res.status(200).json({
      success: true,
      totalChecked: allSchemes.length,
      eligibleCount: eligibleSchemes.length,
      data: eligibleSchemes
    });
  } catch (error) {
    return res.status(200).json({ success: true, totalChecked: 0, eligibleCount: 0, data: [] });
  }
};
