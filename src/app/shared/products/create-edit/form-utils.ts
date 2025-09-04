/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateProductInput } from '@/utils/validators/create-product.schema';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];

export function defaultValues(product?: CreateProductInput) {
  return {
    title: product?.title ?? '',
    categories: product?.category?.title ?? "" ,
    condition: product?.product_condition?.title ?? "",
    shippingOption : product?.shipping_option?.map((itm:any) => itm.id.toString()) ?? [],
    // shippingOption : product?.shipping_option?.map((itm:any) => ({
    //   value: String(itm.id),
    //   label: itm.title,
    // })) ?? [],
    description: product?.description ?? '',
    customer_name: product?.seller?.name ?? "",
    customer_email: product?.seller?.email ?? "",
    customer_profileImage: product?.seller?.profileImage ?? "",
    // images: product?.Images[product?.Images?.length -1]?.name ?? undefined,
    images: product?.Images?.map((itm:any) => itm.name)  ?? undefined,
    price: product?.price ?? undefined,
    user: product?.seller?.name ?? "",
  };  
}

export const productData = {
  title: 'Apple',
  description: 'Fresh Express Iceberg Garden Salad Blend',
  sku: 'SKU-28935',
  type: 'Digital Product',
  categories: 'Grocery',
  price: 10,
  costPrice: 20,
  retailPrice: 15,
  salePrice: 25,
  productImages: undefined,
  inventoryTracking: 'no',
  currentStock: '150',
  lowStock: '20',
  productAvailability: 'online',
  tradeNumber: '12345',
  manufacturerNumber: '154',
  brand: 'Foska',
  upcEan: 'Ean',
  customFields: [
    {
      label: 'Color',
      value: 'Red',
    },
  ],
  freeShipping: false,
  shippingPrice: 45,
  locationBasedShipping: true,
  locationShipping: [
    {
      name: 'USA',
      shippingCharge: '150',
    },
  ],
  pageTitle: 'apple',
  metaDescription: 'apple',
  metaKeywords: 'grocery, foods',
  productUrl: 'https://prelo-admin.i-nextgen.com/',
  isPurchaseSpecifyDate: true,
  isLimitDate: true,
  dateFieldName: 'Date Field',
  productVariants: [
    {
      name: 'Jhon',
      value: '150',
    },
  ],
  tags: ['iPhone', 'mobile'],
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// Category option
export const categoryOption = [
  {
    value: 'fruits',
    label: 'Fruits',
  },
  {
    value: 'grocery',
    label: 'Grocery',
  },
  {
    value: 'meat',
    label: 'Meat',
  },
  {
    value: 'cat food',
    label: 'Cat Food',
  },
];


// condition option
// export const conditionOption = ['BrandNew','LikeNew','Good','Moderate', 'HeavyWear', 'Damaged']
 export const conditionOption = [
   {
    label: 'Brand New',
    value: 1,
  },
  {
    label: 'Like New',
    value: 2,
  },
  {
    label: 'Good',
    value: 3,
  },
  {
    label: 'Moderate',
    value: 4,
  },
{
  label: 'HeavyWear',
    value: 5,
  },
{
  label: 'Damaged',
    value: 6,
  },
];

// export const shipping_option= [
//   { value: 1, label: "Australia Post" },
//   { value: 2, label: "DHL" },
//   { value: 3, label: "ROYAL MAIL" },
//   { value: 4, label: "SENDLE" }
// ]

export const shipping_option = [
  { value: String(1), label: "Australia Post" },
  { value: String(2), label: "DHL" },
  { value: String(3), label: "ROYAL MAIL" },
  { value: String(4), label: "SENDLE" },
];

// Type option
export const typeOption = [
  {
    value: 'digital product',
    label: 'Digital Product',
  },
  {
    value: 'physical product',
    label: 'Physical Product',
  },
];

// Variant option
export const variantOption = [
  {
    value: 'single',
    label: 'Single',
  },
  {
    value: 'multiple',
    label: 'Multiple',
  },
];
