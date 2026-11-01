import Artisan from '../models/Artisan.js';

// @desc    Get all artisans
// @route   GET /api/artisans
export const getArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.find({});
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching artisans' });
  }
};