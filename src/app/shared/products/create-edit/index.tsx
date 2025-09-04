/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { Element } from "react-scroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import cn from "@/utils/class-names";
import FormNav, { formParts } from "./form-nav";
import ProductSummary from "./product-summary";
import { conditionOption, defaultValues, shipping_option } from "./form-utils";
import ProductMedia from "./product-media";
import PricingInventory from "./pricing-inventory";
import {
  CreateProductInput,
  productFormSchema,
} from "@/utils/validators/create-product.schema";
import { useLayout } from "@/hooks/use-layout";
import { LAYOUT_OPTIONS } from "@/config/enums";
import { usePathname, useRouter } from "next/navigation";
import { Text } from "rizzui";
import FormFooter from "@/components/ui/form-footer";
import { routes } from "@/config/routes";
import useProduct from "@/hooks/use-product";
import useCategory from "@/hooks/use-category";
import useUser from "@/hooks/use-user";
import { convertUrlToFile } from "../../category/category-list/create-category";
import { useState } from "react";

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.media]: ProductMedia,
  [formParts.pricingInventory]: PricingInventory,
  // [formParts.productIdentifiers]: ProductIdentifiers,
  // [formParts.shipping]: ShippingInfo,
  // [formParts.seo]: ProductSeo,
  // [formParts.deliveryEvent]: DeliveryEvent,
  // [formParts.variantOptions]: ProductVariants,
  // [formParts.tagsAndCategory]: ProductTaxonomies,
};

interface IndexProps {
  id?: string | any;
  className?: string | any;
  product?: any;
  show?: boolean;
  cancle?: boolean;
}

export default function CreateEditProduct({
  id,
  product,
  className,
  show,
  cancle,
  }: IndexProps) {
// }: any) {
  const { layout } = useLayout();
  const [loading, setLoading] = useState(false);
  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname ?? "";
  const viewComp = path.includes("/view");

  const { addProduct, isLoading, updateProduct } = useProduct();
  const { categoriesForProduct } = useCategory();
  const { usersForProduct } = useUser();
  const [removedImages, setRemovedImages] = useState([]);
  const onSubmit: SubmitHandler<CreateProductInput> = async (data: any) => {    
    if (data) {
      // let profileImageFile;
      //     if(typeof data?.images == 'string'){
      //       setLoading(true);
      //     const convertFile = data.images.split("/");
      //     profileImageFile = await convertUrlToFile(
      //     data.images,
      //     convertFile[convertFile.length - 1] || "image.png");
      //     convertFile && setLoading(false);
      //     }else {
      //       profileImageFile = data?.images
      //     }

          const convertedFiles = await Promise.all(
            data?.images.map(async (image:any,index:boolean) => {
              if (typeof image === "string") {
                // Convert URL to File object
                const response = await fetch(image);
                const blob = await response.blob();
                return new File([blob], "image.jpg", { type: blob.type });
              }
              // Return as is if it's already a File
              return image;
            })
          );
          const shippingOptions = data?.shippingOption?.map((itm:any) => parseInt(itm,10));
      if (id) {
        const response = await updateProduct({
          category:
            typeof data?.categories == "string"
              ? categoriesForProduct?.find((itm: any) => itm?.title == data?.categories)
                  ?.id
              : data?.categories?.value,
          condition:
            typeof data?.condition == "string"
              ? conditionOption?.find(
                  (itm: any) => itm?.label == data?.condition
                )?.value
              : data?.condition?.value,
          title: data?.title,
          description: data?.description,
          price: data?.price,
          poductImages: convertedFiles,
          deleteImages: removedImages,
          userId:
            typeof data?.user == "string"
              ? usersForProduct?.find(
                  (itm: any) =>
                    `${itm?.firstName} ${itm?.lastName}` == data?.user
                )?.id
              : data?.user?.value,
          productId: id,
          // shippingOption: typeof data?.shippingOption == "string"
          // ? shipping_option?.find(
          //     (itm: any) => itm?.label == data?.shippingOption
          //   )?.value
          // : data?.shippingOption?.value,
          shippingOption : shippingOptions,
          // shippingOption: [1,2],
        });
        response && router.push(routes.products.product);
      } else {
        const response = await addProduct({
          category: data?.categories?.value,
          condition: data?.condition?.value,
          title: data?.title,
          description: data?.description,
          price: data?.price,
          poductImages: convertedFiles,
          userId: data?.user?.value,
          // shippingOption: [1,2],
          // shippingOption: data?.shippingOption,
          shippingOption: shippingOptions,
        });
        response && router.push(routes.products.product);
      }
    }
  };

  return (
    <div className="@container">
      <FormNav
        className={cn(layout === LAYOUT_OPTIONS.BERYLLIUM && "2xl:top-[72px]")}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn("[&_label.block>span]:font-medium", className)}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {
                  <Component
                    className="pt-7 @2xl:pt-9 @3xl:pt-11"
                    viewComp={show}
                    cancle={cancle}
                    removedImages={removedImages}
                    setRemovedImages={setRemovedImages}
                  />
                }
              </Element>
            ))}
          </div>

          {!show && (
            <FormFooter
              isLoading={isLoading || loading}
              submitBtnText={id ? "Update Product" : "Create Product"}
              handleAltBtn={() => router.push(routes.products.product)}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
}
