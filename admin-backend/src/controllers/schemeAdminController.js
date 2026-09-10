import Scheme from '../models/Scheme.js';

// @desc    Get all schemes (Admin view)
// @route   GET /api/admin/schemes
export const getSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: schemes.length, data: schemes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create / Push new scheme to MongoDB
// @route   POST /api/admin/schemes
export const createScheme = async (req, res) => {
  try {
    const { title, category, ministry, description, benefits, eligibilityCriteria } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const scheme = await Scheme.create({
      title,
      slug,
      category,
      ministry,
      description,
      benefits: benefits || [],
      eligibilityCriteria: eligibilityCriteria || {}
    });

    res.status(201).json({ success: true, data: scheme });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update scheme
// @route   PUT /api/admin/schemes/:id
export const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!scheme) return res.status(404).json({ success: false, message: 'Scheme not found' });
    res.status(200).json({ success: true, data: scheme });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete scheme from MongoDB
// @route   DELETE /api/admin/schemes/:id
export const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) return res.status(404).json({ success: false, message: 'Scheme not found' });
    res.status(200).json({ success: true, message: 'Scheme deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
