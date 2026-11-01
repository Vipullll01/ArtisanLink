import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('artisan', 'name location');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('artisan');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching product details' });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Artisans)
export const createProduct = async (req, res) => {
  try {
    const { title, category, price, artisanName, location, image, description } = req.body;

    const product = new Product({
      title,
      category,
      price,
      artisanName: artisanName || req.user?.name || 'Artisan',
      location: location || 'Jaipur',
      image,
      description,
      user: req.user._id || req.user.id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating product' });
  }
};

// @desc    Get products created by logged in artisan
// @route   GET /api/products/myproducts
// @access  Private
export const getMyProducts = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const products = await Product.find({
      $or: [{ user: userId }, { user: req.user._id }, { user: req.user.id }],
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching artisan products' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Owner Artisan)
export const updateProduct = async (req, res) => {
  try {
    const { title, category, price, image, description, location } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Authorization check
    const userId = req.user._id || req.user.id;
    if (product.user && product.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this craft' });
    }

    product.title = title || product.title;
    product.category = category || product.category;
    product.price = price !== undefined ? price : product.price;
    product.image = image || product.image;
    product.description = description || product.description;
    product.location = location || product.location;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating product' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Owner Artisan)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Authorization check
    const userId = req.user._id || req.user.id;
    if (product.user && product.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this craft' });
    }

    await product.deleteOne();
    res.json({ message: 'Craft removed successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting product' });
  }
};