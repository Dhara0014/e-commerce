import { z } from "zod";
import { messages } from "@/config/messages";

// form zod validation schema
export const categoryFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: messages.catNameIsRequired }),
    // .regex(/^[a-zA-Z0-9]+$/, { message: "Title must be alphanumeric" }),
  description: z.string().min(3, { message: "Description is required" }),
  // images: z.array(fileSchema).min(1, { message: 'At least one image is required' }),
  images: z
    .union([
      z.string().optional(),
      z.instanceof(File).refine((file) => file instanceof File, {
        message: "Invalid file format, only images are allowed",
      }),
    ])
    .refine((file) => file !== null && file !== undefined, {
      message: "At least one image is required",
    })
    .refine((file) => typeof file === "string" || file instanceof File, {
      message: "Invalid file format",
    }),
  // .any()
  // .refine(
  //   (file) => file instanceof File || file === null,
  //   { message: "Invalid file format" }
  // )
  // .refine(
  //   (file) => file !== null && file !== undefined,
  //   { message: "At least one image is required" }
  // ),
});

export type CategoryFormInput = z.infer<typeof categoryFormSchema>;

export const bannerFormSchema = z.object({
  title: z.string().min(1, { message: messages.bannerIsRequired }),
  description: z.string().min(3, { message: "Description is required" }),
  images: z
    .union([
      z.string().optional(),
      z.instanceof(File).refine((file) => file instanceof File, {
        message: "Invalid file format, only images are allowed",
      }),
    ])
    .refine((file) => file !== null && file !== undefined, {
      message: "At least one image is required",
    })
    .refine((file) => typeof file === "string" || file instanceof File, {
      message: "Invalid file format",
    }),
  // .refine(
  //   (file) => file instanceof File || file === null,
  //   { message: "Invalid file format" }
  // )
  // .refine(
  //   (file) => file !== null && file !== undefined,
  //   { message: "At least one image is required" }
  // ),
});

export type BannerFormInput = z.infer<typeof bannerFormSchema>;
