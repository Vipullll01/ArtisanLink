import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Artisan from './models/Artisan.js';
import User from './models/User.js';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const initialArtisans = [
  { name: 'Ramkishan Chhipa', craftSpecialty: 'Block Printing', location: 'Bagru, Jaipur', bio: 'Master block printer practicing traditional Dabu mud-resist printing techniques passed down through 5 generations.' },
  { name: 'Meenakshi Shekhawat', craftSpecialty: 'Blue Pottery', location: 'Bani Park, Jaipur', bio: 'Pioneer in revitalizing traditional Jaipur blue pottery with modern floral and geometric motifs.' },
  { name: 'Sanjay Soni', craftSpecialty: 'Brassware', location: 'Johari Bazaar, Jaipur', bio: 'Expert metalsmith specializing in detailed brass etching and traditional Meenakari enamel inlay work.' },
  { name: 'Kishanlal Mojari', craftSpecialty: 'Leathercraft', location: 'Bapu Bazaar, Jaipur', bio: 'Crafting genuine handcrafted camel leather goods and traditional Zardozi-embroidered mojaris.' },
  { name: 'Mohammad Tariq', craftSpecialty: 'Lac & Jewelry', location: 'Tripolia Bazaar, Jaipur', bio: 'Master craftsman creating intricate hand-molded bridal lac bangles and Kundan jewelry.' },
  { name: 'Rajesh Verma', craftSpecialty: 'Miniature Art', location: 'C-Scheme, Jaipur', bio: 'Renowned artist specializing in fine squirrel-hair brush traditional Rajasthani and Pichwai paintings.' },
];

const initialProducts = [
  { title: 'Indigo Dabu Hand-Block Printed Dupatta', artisanName: 'Ramkishan Chhipa', price: 1850, category: 'Block Printing', location: 'Bagru, Jaipur', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600' },
  { title: 'Cobalt Blue Floral Quartz Pottery Vase', artisanName: 'Meenakshi Shekhawat', price: 3200, category: 'Blue Pottery', location: 'Bani Park, Jaipur', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600' },
  { title: 'Royal Meenakari Brass Serving Tray', artisanName: 'Sanjay Soni', price: 4500, category: 'Brassware', location: 'Johari Bazaar, Jaipur', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600' },
  { title: 'Handcrafted Camel Leather Journal', artisanName: 'Kishanlal Mojari', price: 1200, category: 'Leathercraft', location: 'Bapu Bazaar, Jaipur', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600' },
  { title: 'Traditional Kundan Pearl Choker', artisanName: 'Mohammad Tariq', price: 5800, category: 'Lac & Jewelry', location: 'Tripolia Bazaar, Jaipur', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600' },
  { title: 'Hand-Painted Pichwai Art Wall Hanging', artisanName: 'Rajesh Verma', price: 6500, category: 'Miniature Art', location: 'C-Scheme, Jaipur', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675' },
  { title: 'Hand-Embroidered Zardozi Leather Mojaris', artisanName: 'Kishanlal Mojari', price: 2400, category: 'Leathercraft', location: 'Bapu Bazaar, Jaipur', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=600' },
  { title: 'Bagru Mud-Resist Cotton Bedspread', artisanName: 'Ramkishan Chhipa', price: 3600, category: 'Block Printing', location: 'Bagru, Jaipur', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=600' },
  { title: 'Hand-Painted Blue Pottery Coaster Set (6 Pcs)', artisanName: 'Meenakshi Shekhawat', price: 1450, category: 'Blue Pottery', location: 'Bani Park, Jaipur', image: 'https://images.unsplash.com/photo-1615800001888-8605fe031316' },
  { title: 'Hand-Etched Solid Brass Oil Lamp (Diya)', artisanName: 'Sanjay Soni', price: 2100, category: 'Brassware', location: 'Johari Bazaar, Jaipur', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600' },
  { title: 'Bridal Hand-molded Lac Chura Set', artisanName: 'Mohammad Tariq', price: 3100, category: 'Lac & Jewelry', location: 'Tripolia Bazaar, Jaipur', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600' },
  { title: 'Squirrel-Hair Brush Royal Procession Miniature', artisanName: 'Rajesh Verma', price: 8900, category: 'Miniature Art', location: 'C-Scheme, Jaipur', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600' },
  { title: 'Natural Indigo Hand-Block Table Runner', artisanName: 'Ramkishan Chhipa', price: 1600, category: 'Block Printing', location: 'Bagru, Jaipur', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=600' },
  { title: 'Hand-Glazed Ceramic Door Knobs (Set of 4)', artisanName: 'Meenakshi Shekhawat', price: 1100, category: 'Blue Pottery', location: 'Bani Park, Jaipur', image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600' },
  { title: 'Carved Brass Jewelry Box with Enamel Inlay', artisanName: 'Sanjay Soni', price: 2950, category: 'Brassware', location: 'Johari Bazaar, Jaipur', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600' },
  { title: 'Handmade Goat Leather Travel Duffle Bag', artisanName: 'Kishanlal Mojari', price: 4800, category: 'Leathercraft', location: 'Bapu Bazaar, Jaipur', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600' },
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await Artisan.deleteMany();

    console.log('Old data cleared...');

    // Seed Artisans
    const createdArtisans = await Artisan.insertMany(initialArtisans);
    console.log(`${createdArtisans.length} Artisans imported!`);

    // Map Artisan ObjectIDs to Products based on Artisan Name
    const updatedProducts = initialProducts.map((product) => {
      const matchedArtisan = createdArtisans.find((a) => a.name === product.artisanName);
      return {
        ...product,
        artisan: matchedArtisan ? matchedArtisan._id : null,
      };
    });

    // Seed Products
    const createdProducts = await Product.insertMany(updatedProducts);
    console.log(`${createdProducts.length} Products imported!`);

    console.log('✅ Data Seeding Completed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Data Seeding Failed: ${error.message}`);
    process.exit(1);
  }
};

importData();