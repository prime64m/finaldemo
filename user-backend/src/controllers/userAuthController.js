import User from '../models/User.js';

// @desc    Sync / Save Google Auth User to MongoDB
// @route   POST /api/user/sync-google-user
// @access  Public
export const syncGoogleUser = async (req, res) => {
  try {
    const { uid, name, email, picture, profileDetails } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required to sync user' });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = new User({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        profileDetails: profileDetails || {
          age: 25,
          gender: 'male',
          income: 250000,
          category: 'General',
          occupation: 'Private Sector',
          state: 'Uttar Pradesh',
          disabilityStatus: false
        }
      });
      await user.save();
      console.log(`✅ [MongoDB] New Google User created: ${email}`);
    } else {
      if (name && user.name !== name) {
        user.name = name;
      }
      if (profileDetails) {
        user.profileDetails = { ...user.profileDetails, ...profileDetails };
      }
      await user.save();
      console.log(`✅ [MongoDB] Google User synced: ${email}`);
    }

    return res.status(200).json({
      success: true,
      message: 'User synced successfully with MongoDB',
      user: {
        id: user._id,
        uid: uid || user._id,
        name: user.name,
        email: user.email,
        picture: picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        profileDetails: user.profileDetails,
        savedSchemes: user.savedSchemes
      }
    });
  } catch (error) {
    console.error('❌ [MongoDB] Error syncing Google user:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while saving user to MongoDB',
      error: error.message
    });
  }
};

// @desc    Update User Household Profile in MongoDB
// @route   POST /api/user/update-profile
// @access  Public
export const updateUserProfile = async (req, res) => {
  try {
    const { email, profileDetails, name } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'User email is required' });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = new User({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        profileDetails: profileDetails
      });
    } else {
      if (name) user.name = name;
      if (profileDetails) user.profileDetails = { ...user.profileDetails, ...profileDetails };
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Household profile updated successfully in MongoDB',
      user
    });
  } catch (error) {
    console.error('❌ [MongoDB] Error updating profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating household profile',
      error: error.message
    });
  }
};
