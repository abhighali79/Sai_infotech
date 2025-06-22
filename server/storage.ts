import { users, categories, products, type User, type InsertUser, type Category, type InsertCategory, type Product, type InsertProduct, type UpdateProduct, type ProductWithCategory } from "@shared/schema";
import { db } from "./db";
import { eq, like, and, desc, asc, sql } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getProducts(filters?: {
    category?: string;
    search?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<ProductWithCategory[]>;
  getProductById(id: number): Promise<ProductWithCategory | undefined>;
  getProductBySlug(slug: string): Promise<ProductWithCategory | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: UpdateProduct): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Stats
  getStats(): Promise<{
    totalProducts: number;
    activeCategories: number;
    monthlyViews: number;
    whatsappInquiries: number;
  }>;

  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(asc(categories.name));
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }

  async getProducts(filters?: {
    category?: string;
    search?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<ProductWithCategory[]> {
    const conditions = [];

    if (filters?.category) {
      conditions.push(eq(categories.slug, filters.category));
    }

    if (filters?.search) {
      conditions.push(
        sql`(${products.name} ILIKE ${`%${filters.search}%`} OR ${products.shortDescription} ILIKE ${`%${filters.search}%`})`
      );
    }

    if (filters?.featured !== undefined) {
      conditions.push(eq(products.featured, filters.featured));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let query = db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        shortDescription: products.shortDescription,
        fullDescription: products.fullDescription,
        price: products.price,
        sku: products.sku,
        categoryId: products.categoryId,
        images: products.images,
        specifications: products.specifications,
        stockStatus: products.stockStatus,
        featured: products.featured,
        rating: products.rating,
        reviewCount: products.reviewCount,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
          createdAt: categories.createdAt,
        }
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .$dynamic();

    if (whereClause) {
      query = query.where(whereClause);
    }

    query = query.orderBy(desc(products.createdAt));

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    return await query;
  }

  async getProductById(id: number): Promise<ProductWithCategory | undefined> {
    const [result] = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        shortDescription: products.shortDescription,
        fullDescription: products.fullDescription,
        price: products.price,
        sku: products.sku,
        categoryId: products.categoryId,
        images: products.images,
        specifications: products.specifications,
        stockStatus: products.stockStatus,
        featured: products.featured,
        rating: products.rating,
        reviewCount: products.reviewCount,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
          createdAt: categories.createdAt,
        }
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, id));

    return result || undefined;
  }

  async getProductBySlug(slug: string): Promise<ProductWithCategory | undefined> {
    const [result] = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        shortDescription: products.shortDescription,
        fullDescription: products.fullDescription,
        price: products.price,
        sku: products.sku,
        categoryId: products.categoryId,
        images: products.images,
        specifications: products.specifications,
        stockStatus: products.stockStatus,
        featured: products.featured,
        rating: products.rating,
        reviewCount: products.reviewCount,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          description: categories.description,
          createdAt: categories.createdAt,
        }
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.slug, slug));

    return result || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values({
        ...product,
        updatedAt: new Date(),
      })
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, productUpdate: UpdateProduct): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set({
        ...productUpdate,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct || undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getStats(): Promise<{
    totalProducts: number;
    activeCategories: number;
    monthlyViews: number;
    whatsappInquiries: number;
  }> {
    const [productCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(products);

    const [categoryCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(categories);

    return {
      totalProducts: productCount.count,
      activeCategories: categoryCount.count,
      monthlyViews: 0, // This would come from analytics in a real app
      whatsappInquiries: 0, // This would come from tracking in a real app
    };
  }
}

export const storage = new DatabaseStorage();
