
import "dotenv/config";
import mongoose from "mongoose";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Product from "../src/models/Product.js";
import uploadToCloudinary from "../src/utils/uploadToCloudinary.js";
import cloudinary from "../src/config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, "products.json");
const imagesDirectory = path.join(__dirname, "images");

const seedProducts = async () => {
  const uploadedImages = [];

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from your .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const products = JSON.parse(
      await fs.readFile(productsFile, "utf-8")
    );

    for (const productData of products) {
      // Skip products already present in MongoDB.
      const existingProduct = await Product.findOne({
        $or: [
          { sku: productData.sku },
          { slug: productData.slug }
        ]
      });

      if (existingProduct) {
        console.log(`Skipped: ${productData.title} already exists`);
        continue;
      }

      console.log(`Uploading images for: ${productData.title}`);

      const images = [];

      for (const imagePath of productData.images) {
        const localImagePath = path.join(imagesDirectory, imagePath);

        const fileBuffer = await fs.readFile(localImagePath);

        const uploadedImage = await uploadToCloudinary(
          fileBuffer,
          `urbanwear/products/${productData.category.toLowerCase()}`
        );

        images.push(uploadedImage);
        uploadedImages.push(uploadedImage.public_id);
      }

      const newProduct = {
        ...productData,
        images
      };

      delete newProduct.slug;

      await Product.create(newProduct);

      console.log(`Successfully added: ${productData.title}`);
    }

    console.log("Product seeding completed!");
  } catch (error) {
    console.error("Seeding failed:", error.message);

    // Remove uploaded images if the current seed operation fails.
    if (uploadedImages.length > 0) {
      await cloudinary.api.delete_resources(uploadedImages).catch(
        (cleanupError) => {
          console.error("Cloudinary cleanup failed:", cleanupError.message);
        }
      );
    }

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();
