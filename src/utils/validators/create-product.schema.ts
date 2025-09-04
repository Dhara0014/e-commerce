/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

export const productFormSchema = z.object({
  title: z.string().min(3, { message: messages.productNameIsRequired }),

  categories: z
  .union([
    z.object({
      label: z.string(),
      value: z.number(),
    }),
    z.string().min(1, { message: 'Category string is required' }),
  ])
  .refine((data:any) => (typeof data === 'object' && data?.value) || typeof data === 'string' , {
    message: 'Valid category is required',
  })
  ,

  category: z.object({
    title: z.string().min(1,{message: 'Category is required'}),
  }).optional(),

  description: z.string().min(3,{message: "Description is required"}),

  seller: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    profileImage: z.any().optional(),
    id: z.any({message: "user is required"}),
  }).optional(),

  images: z
  .array(
    z.union([
      z.string(), // URL strings for existing images
      z.instanceof(File), // New File uploads
    ])
  )
  .min(1, { message: "At least one image is required" })
  .max(6,{message: "Please limit your uploads to a maximum of 6 images."})
  ,

    
  user: z
  .union([
    z.object({
      label: z.string(),
      value: z.number(),
    }),
    z.string().min(1, { message: 'User is required' }),
  ])
  .refine((data:any) => (typeof data === 'object' && data?.value) || typeof data === 'string', {
    message: 'Valid User is required',
  }),
  customer_name: z.string().optional(),
  condition: z
  .union([
    z.object({
      label: z.string(),
      value: z.number(),
    }),
    z.string().min(1, { message: 'Condition is required' }),
  ])
  .refine((data:any) => (typeof data === 'object' && data?.value) || typeof data === 'string', {
    message: 'Valid Condition is required',
  }),

    // shippingOption: z
    //   .array(z.object({
    //     value: z.string().optional(),
    //     label: z.string().optional(),
    //   }))  // Assuming the options are strings
    //   .nonempty('Shipping options are required'), // Ensure that the array is not empty

    shippingOption: z
  .array(z.string().min(1, { message: 'Shipping option is required' })) // Array of strings
  .nonempty('At least one shipping option is required'),

  // shippingOption: z
  // .union([
  //   z.object({
  //     label: z.string(),
  //     value: z.number(),
  //   }),
    
  //   z.string().min(1, { message: 'Shipping is required' }),
  // ])
  // .refine(
  //   (data: any) =>
  //     (Array.isArray(data) && data.length > 0) || typeof data === 'string',
  //   { message: 'Valid Shipping is required' }
  // ),

  product_condition:  z.object({
    title : z.string().min(1,{message: 'Condition is required'}),
  }).optional(),

// shipping_option:  z.object({
//   title: z.string().min(1,{message: 'Shipping is required'}),
// }).optional(), 
shipping_option: z
  .array(
    z.object({
      label: z.string().min(1, { message: 'Shipping is required' }),
      value: z.string().optional(),
    })
  )
  .optional(),

// shipping_option: z.array(
//   z.object({
//     title: z.string().min(1, { message: 'Shipping is required' }),
//   })
// ).optional(),

  Images: z.any(),
  price: z.coerce.number()
  // .min(1, { message: messages.priceIsRequired }),
  // .refine((value) => value > 0, { message: 'Price must be greater than 0' })
  .refine((value) => value > 0, { message: messages.priceIsRequired })
});

export type CreateProductInput = z.infer<typeof productFormSchema>;
