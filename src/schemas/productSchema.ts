import { z } from "zod";

const sizeSchema = z.object({
    width: z
        .number({ message: "Width must be a number" }),
    height: z
        .number({ message: "Height must be a number" }),
});

export const productSchema = z.object({
    id: z
        .number({ message: "ID must be a number" }),

    imageUrl: z
        .string({ message: "Image URL is required" })
        .min(1, { message: "Image URL cannot be empty" }),

    name: z
        .string({ message: "Name is required" })
        .min(1, { message: "Name cannot be empty" })
        .max(100, { message: "Name cannot be longer than 100 characters" }),

    count: z
        .number({ message: "Count must be a number" })
        .int({ message: "Count must be an integer" }),

    size: sizeSchema,

    weight: z
        .number({ message: "Weight is required" })
        .min(1, { message: "Weight cannot be empty" })
        .max(5000, { message: "Weight cannot be longer than 5000 characters" }),
});
