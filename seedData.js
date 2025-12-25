import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "./models/Product.js"
import Category from "./models/Category.js"
import Review from "./models/Review.js"
import HeroSlide from "./models/HeroSlide.js"
import PageContent from "./models/PageContent.js"

dotenv.config()

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/lcf-furniture")
    console.log("Connected to MongoDB")

    // Clear existing data
    await Product.deleteMany({})
    await Category.deleteMany({})
    await Review.deleteMany({})
    await HeroSlide.deleteMany({})
    await PageContent.deleteMany({})
    console.log("Cleared existing data")

    // Seed Categories
    const categories = await Category.insertMany([
      {
        name: "beds",
        displayName: "Beds",
        description: "Comfortable and stylish beds for your bedroom",
        active: true,
      },
      {
        name: "sofas",
        displayName: "Sofas",
        description: "Luxury sofas for your living room",
        active: true,
      },
    ])
    console.log("Seeded categories")

    // Seed Products
    const products = await Product.insertMany([
      {
        name: "Linea King sized bed",
        imageUrl: "/assets/bed/bed-4.jpg",
        price: 179500,
        tag: "New",
        category: "beds",
        rating: 4.5,
        reviewsCount: 128,
        description:
          "The Linea King Size Bed combines modern elegance with exceptional comfort. Crafted from premium solid wood with a luxurious upholstered headboard.",
        specifications: [
          { label: "Size", value: "King (180cm x 200cm)" },
          { label: "Material", value: "Solid Wood, Fabric Upholstery" },
          { label: "Color", value: "Charcoal Grey" },
          { label: "Warranty", value: "2 Years" },
        ],
        featured: true,
        inStock: true,
      },
      {
        name: "Linea King sized bed",
        imageUrl: "/assets/bed/bed-set-5.jpg",
        price: 179500,
        tag: "New",
        category: "beds",
        rating: 4.5,
        reviewsCount: 95,
        description: "Complete bed set with premium finish and comfort.",
        specifications: [
          { label: "Size", value: "King (180cm x 200cm)" },
          { label: "Material", value: "Solid Wood" },
        ],
        inStock: true,
      },
      {
        name: "Linea King sized bed",
        imageUrl: "/assets/bed/bed-set.png",
        price: 179500,
        tag: "New",
        category: "beds",
        rating: 4.7,
        reviewsCount: 103,
        description: "Elegant bed set with modern design.",
        specifications: [
          { label: "Size", value: "King (180cm x 200cm)" },
          { label: "Material", value: "Solid Wood" },
        ],
        inStock: true,
      },
      {
        name: "Oryn Sofa",
        imageUrl: "/assets/sofas/sample-sofa.webp",
        price: 184500,
        tag: "New",
        category: "sofas",
        rating: 4.8,
        reviewsCount: 87,
        description: "Luxury sofa with premium fabric and comfortable seating.",
        specifications: [
          { label: "Seating", value: "3-Seater" },
          { label: "Material", value: "Premium Fabric" },
          { label: "Color", value: "Grey" },
        ],
        featured: true,
        inStock: true,
      },
      {
        name: "Oryn Sofa",
        imageUrl: "/assets/sofas/sofa-set-3.jpg",
        price: 184500,
        tag: "Hot",
        category: "sofas",
        rating: 4.6,
        reviewsCount: 92,
        description: "Modern sofa set for contemporary living rooms.",
        specifications: [
          { label: "Seating", value: "3-Seater" },
          { label: "Material", value: "Leather" },
        ],
        inStock: true,
      },
      {
        name: "Oryn Sofa",
        imageUrl: "/assets/sofas/sofa-set-2.jpg",
        price: 184500,
        tag: "Sale",
        category: "sofas",
        oldPrice: 220000,
        rating: 4.9,
        reviewsCount: 115,
        description: "Premium leather sofa on sale.",
        specifications: [
          { label: "Seating", value: "3-Seater" },
          { label: "Material", value: "Genuine Leather" },
        ],
        inStock: true,
      },
    ])
    console.log("Seeded products")

    // Seed Reviews
    await Review.insertMany([
      {
        name: "John Doe",
        stars: 5,
        comment: "Great prices and excellent quality!",
        featured: true,
        active: true,
      },
      {
        name: "Jane Smith",
        stars: 5,
        comment: "Durable and quality furniture.",
        featured: true,
        active: true,
      },
      {
        name: "Michael Brown",
        stars: 4,
        comment: "Beautiful designs and comfortable furniture.",
        featured: true,
        active: true,
      },
      {
        name: "Sarah Wilson",
        stars: 5,
        comment: "Amazing customer service.",
        featured: true,
        active: true,
      },
    ])
    console.log("Seeded reviews")

    // Seed Hero Slides
    await HeroSlide.insertMany([
      { link: "/assets/hero-posters/hero-1.jpg", order: 1, active: true },
      { link: "/assets/hero-posters/hero-2.jpg", order: 2, active: true },
      { link: "/assets/hero-posters/hero-3.jpg", order: 3, active: true },
      { link: "/assets/hero-posters/hero-2.jpg", order: 4, active: true },
      { link: "/assets/hero-posters/hero-1.jpg", order: 5, active: true },
    ])
    console.log("Seeded hero slides")

    // Seed Page Content
    await PageContent.insertMany([
      {
        pageName: "about",
        content: {
          tagline:
            "Crafting quality furniture for over 20 years, bringing comfort and elegance to homes across Pakistan",
          story: {
            title: "Our Story",
            paragraphs: [
              "Founded in 2005, LCF Furniture began with a simple mission: to provide high-quality, affordable furniture that transforms houses into homes.",
              "Over the years, we have stayed true to our core values of craftsmanship, quality, and customer satisfaction.",
              "Today, we serve thousands of satisfied customers across the country.",
            ],
          },
          stats: [
            { value: "20+", label: "Years Experience" },
            { value: "10K+", label: "Happy Customers" },
            { value: "500+", label: "Products" },
            { value: "15", label: "Showrooms" },
          ],
        },
      },
      {
        pageName: "contact",
        content: {
          address: "Kader Tobash Chowk Khyban Jinah road PUEHS Town 2 Lahore Pakistan",
          phone: "+92 347 7477352",
          email: "imtiazhussainlaang@gmail.com",
          hours: "Monday - Sunday: 10:00 AM - 8:00 PM",
          social: {
            facebook: "https://www.facebook.com/lcffurniture/",
            instagram: "https://www.instagram.com/lcffurniture/",
          },
        },
      },
    ])
    console.log("Seeded page content")

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
