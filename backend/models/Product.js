import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Block Printing',
        'Blue Pottery',
        'Brassware',
        'Leathercraft',
        'Lac & Jewelry',
        'Miniature Art',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    artisanName: {
      type: String,
      required: [true, 'Artisan name is required'],
    },
    location: {
      type: String,
      default: 'Jaipur',
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
    description: {
      type: String,
      default: '',
    },
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan',
      required: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;