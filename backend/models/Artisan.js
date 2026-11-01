import mongoose from 'mongoose';

const artisanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Artisan name is required'],
      trim: true,
    },
    craftSpecialty: {
      type: String,
      required: [true, 'Craft specialty is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      default: 'Jaipur, Rajasthan',
    },
    bio: {
      type: String,
      required: [true, 'Artisan bio/story is required'],
    },
    profileImage: {
      type: String,
      default: '',
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Artisan = mongoose.model('Artisan', artisanSchema);
export default Artisan;