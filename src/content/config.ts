import { defineCollection, z } from 'astro:content';

/**
 * District Schema
 * Metadata for each district in Neil's City
 */
const districtSchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  order: z.number(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number().optional(),
  }).optional(),
  colorTheme: z.object({
    primary: z.string(),
    secondary: z.string(),
    surface: z.string(),
    accent: z.string().optional(),
  }).optional(),
});

/**
 * Building Schema
 * Metadata for each building within a district
 */
const buildingSchema = z.object({
  name: z.string(),
  description: z.string(),
  order: z.number(),
  featured: z.boolean().optional().default(false),
  icon: z.string().optional(),
});

/**
 * Floor Schema
 * Content pages within buildings (MDX files)
 */
const floorSchema = z.object({
  title: z.string(),
  order: z.number(),
  summary: z.string(),
  publishedDate: z.string().optional(),
  updatedDate: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  relatedFloors: z.array(z.string()).optional().default([]),
  draft: z.boolean().optional().default(false),
});

/**
 * Content Collections
 * 
 * Note: The actual content lives in /content/districts/ directory.
 * Astro Content Collections will be configured to read from there.
 * 
 * For now, we export the schemas for type safety.
 */
export type District = z.infer<typeof districtSchema>;
export type Building = z.infer<typeof buildingSchema>;
export type Floor = z.infer<typeof floorSchema>;

export const collections = {
  // Floors collection - MDX files with content
  floors: defineCollection({
    type: 'content',
    schema: floorSchema,
  }),
};

// Re-export schemas for use in other files
export { districtSchema, buildingSchema, floorSchema };
