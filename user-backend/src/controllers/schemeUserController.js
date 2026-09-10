import Scheme from '../models/Scheme.js';

// @desc    Get published schemes for users
// @route   GET /api/user/schemes
export const getPublishedSchemes = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isPublished: true };

    if (category) {
      query.category = category;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const schemes = await Scheme.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: schemes.length, data: schemes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Check scheme eligibility against user profile
// @route   POST /api/user/schemes/check-eligibility
export const checkEligibility = async (req, res) => {
  try {
    const { age, gender, income, category, occupation, state } = req.body;
    const allSchemes = await Scheme.find({ isPublished: true });

    const eligibleSchemes = allSchemes.filter(scheme => {
      const criteria = scheme.eligibilityCriteria;
      if (!criteria) return true;

      // Age check
      if (age && (age < criteria.minAge || age > criteria.maxAge)) return false;

      // Income check
      if (income && criteria.maxIncomeLimit && income > criteria.maxIncomeLimit) return false;

      // Gender check
      if (gender && criteria.genderAllowed && criteria.genderAllowed.length > 0) {
        if (!criteria.genderAllowed.includes('all') && !criteria.genderAllowed.includes(gender.toLowerCase())) {
          return false;
        }
      }

      // State check
      if (state && criteria.residenceState && criteria.residenceState !== 'All' && criteria.residenceState !== state) {
        return false;
      }

      return true;
    });

    res.status(200).json({
      success: true,
      totalChecked: allSchemes.length,
      eligibleCount: eligibleSchemes.length,
      data: eligibleSchemes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
