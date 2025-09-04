/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import SelectLoader from "@/components/loader/select-loader";
import QuillLoader from "@/components/loader/quill-loader";
import cn from "@/utils/class-names";
import {
  bannerFormSchema,
  CategoryFormInput,
  categoryFormSchema,
  BannerFormInput,
} from "@/utils/validators/create-category.schema";
import UploadZone from "@/components/ui/file-upload/upload-zone";
import { Button, Input, Text, Textarea, Title } from "rizzui";
import { SigninForm } from "@/components/signin/SigninForm";
import { routes } from "@/config/routes";
import Link from "next/link";
import { authPostRequest } from "../../APIs/apis";
import useCategory from "@/hooks/use-category";
import { usePathname, useRouter } from "next/navigation";
import useBanner from "@/hooks/use-banner";

const Select = dynamic(() => import("rizzui").then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import("@/components/ui/quill-editor"), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[168px]" />,
});

function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title?: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? "@5xl:grid @5xl:grid-cols-6" : " "
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          {/* <Text className="mt-1 text-sm text-gray-500">{description}</Text> */}
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5",
          isModalView ? "col-span-4" : " "
        )}
      >
        {children}
      </div>
    </div>
  );
}

export const convertUrlToFile = async (url: string, filename: string) => {
  const corsProxyUrl = "https://api.allorigins.win/raw?url=";
  const res = await fetch(corsProxyUrl + encodeURIComponent(url));
  if (res?.ok) {
    const blob = await res.blob();
    const file = new File([blob], filename, { type: blob.type });
    return file;
  }
  // setValue(name, file);
  // setPreview(url);
};

// main category form component for create and update category
export default function CreateCategory({
  id,
  category,
  isModalView = false,
  onClick,
  onAdd,
  hideFields,
}: {
  id?: string | number | any;
  isModalView?: boolean;
  category?: any;
  onClick?: any;
  onAdd?: any;
  hideFields?: boolean;
}) {
  const pathname = usePathname();
  const viewComp = !pathname?.includes("/edit");
  const [reset, setReset] = useState({});
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { addCategory, updateCategory, isLoading } = useCategory();
  const router = useRouter();

  const initialData = {
    title: category?.title || "",
    description: category?.description || "",
    images: category?.categoryImage || undefined,
  };

  const onSubmit: SubmitHandler<CategoryFormInput> = async (data: any) => {
    let profileImageFile;
    if (typeof data?.images === "string") {
      setLoading(true);
      const convertFile = data.images.split("/");
      profileImageFile = await convertUrlToFile(
        data.images,
        convertFile[convertFile.length - 1] || "image.png"
      );
      convertFile && setLoading(false);
    }

    const formattedData = {
      id,
      title: data.title,
      description: data.description,
      images: typeof data?.images == "string" ? profileImageFile : data?.images,
    };
    try {
      if (!id) {
        const response = await onAdd(data);
      } else {
        const response = await updateCategory(formattedData);
        if (response) {
          router.push(routes.category.category);
        }
      }
    } catch (error) {
    } finally {
      setReset({
        title: "",
        description: "",
        images: undefined,
      });
      setPreview(null);
    }
  };

  return (
    <SigninForm<CategoryFormInput>
      validationSchema={categoryFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: "onChange",
        defaultValues: initialData,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => {
        return (
          <React.Fragment>
            <div className="flex-grow pb-10">
              <div
                className={cn(
                  "grid grid-cols-1 ",
                  isModalView
                    ? "grid grid-cols-1 gap-8 divide-y divide-dashed  divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11"
                    : "gap-5"
                )}
              >
                <HorizontalFormBlockWrapper
                  // title={"Add new category:"}
                  description={"Edit your category information from here"}
                  isModalView={isModalView}
                >
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <Input
                        // disabled={isLoading || viewComp}
                        disabled={isLoading || hideFields || loading}
                        label="Category Name"
                        placeholder="Enter Category Name"
                        {...field}
                        error={errors.title?.message}
                      />
                    )}
                  />

                  <div className="col-span-2">
                    <Controller
                      control={control}
                      // name="description"
                      {...register("description")}
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                          value={value}
                          disabled={isLoading || hideFields || loading}
                          placeholder="Enter Description"
                          onChange={onChange}
                          label="Description"
                          className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                          labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                          error={errors?.description?.message}
                        />
                      )}
                    />
                  </div>
                </HorizontalFormBlockWrapper>
                <HorizontalFormBlockWrapper
                  // title="Upload new thumbnail image"
                  description="Upload your product image gallery here"
                  isModalView={isModalView}
                >
                  <UploadZone
                    name="images"
                    label="Image"
                    getValues={getValues}
                    setValue={setValue}
                    // {...register("images")}
                    error={errors?.images?.message}
                    className="col-span-full"
                    disabled={isLoading || hideFields || loading}
                    show={!hideFields}
                    setPreview={setPreview}
                    preview={preview ?? ""}
                  />
                </HorizontalFormBlockWrapper>
              </div>
            </div>

            {!hideFields && (
              <div
                className={cn(
                  "sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col",
                  isModalView ? "-mx-10 -mb-7 px-10 py-5" : "py-1"
                )}
              >
                {id ? (
                  <Link href={routes.category.category}>
                    <Button
                      variant="outline"
                      className="w-full @xl:w-auto"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full @xl:w-auto"
                    type="button"
                    onClick={onClick}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  isLoading={isLoading || loading}
                  className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                >
                  {id ? "Update" : "Create"} Category
                </Button>
              </div>
            )}
          </React.Fragment>
        );
      }}
    </SigninForm>
  );
}

export function CreateBanner({
  id,
  banner,
  isModalView = false,
  onClick,
  onAdd,
  hideFields,
}: {
  id?: string | number | any;
  isModalView?: boolean;
  banner?: any;
  onClick?: any;
  onAdd?: any;
  hideFields?: boolean;
}) {
  const pathname = usePathname();
  const viewComp = !pathname?.includes("/edit");
  const [reset, setReset] = useState({});
  const [preview, setPreview] = useState<string | null>(null);
  const { addBanner, updateBanner, isLoading } = useBanner();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialData = {
    title: banner?.title || "",
    description: banner?.description || "",
    images: banner?.bannerImage,
  };

  const onSubmit: SubmitHandler<BannerFormInput> = async (data: any) => {
    let profileImageFile;
    if (typeof data?.images == "string") {
      setLoading(true);
      const convertFile = data.images.split("/");
      profileImageFile = await convertUrlToFile(
        data.images,
        convertFile[convertFile.length - 1] || "image.png"
      );
      profileImageFile && setLoading(false);
    }

    const formattedData = {
      id,
      title: data.title,
      description: data.description,
      images:
        typeof data?.images == "string" ? profileImageFile : data?.images || [],
    };
    try {
      if (id) {
        const response = await updateBanner(formattedData);
        if (response) {
          router.push(routes.banner.banner);
        }
      } else {
        onAdd(data);
      }
    } catch (error) {
    } finally {
      setReset({
        title: "",
        description: "",
        images: undefined,
      });
      setPreview(null);
    }
  };

  return (
    <SigninForm<BannerFormInput>
      validationSchema={bannerFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: "onChange",
        defaultValues: initialData,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => {
        return (
          <React.Fragment>
            <div className="flex-grow pb-10">
              <div
                className={cn(
                  "grid grid-cols-1 ",
                  isModalView
                    ? "grid grid-cols-1 gap-8 divide-y divide-dashed  divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11"
                    : "gap-5"
                )}
              >
                <HorizontalFormBlockWrapper
                  // title={"Add new bannner:"}
                  // description={"Edit your banner information from here"}
                  isModalView={isModalView}
                >
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <Input
                        label="Banner Name"
                        disabled={isLoading || hideFields}
                        placeholder="Enter Banner Name"
                        {...field}
                        error={errors.title?.message}
                      />
                    )}
                  />

                  <div className="col-span-2">
                    <Controller
                      control={control}
                      // name="description"
                      {...register("description")}
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                          value={value}
                          disabled={isLoading || hideFields}
                          placeholder="Enter Description"
                          error={errors?.description?.message}
                          onChange={onChange}
                          label="Description"
                          className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                          labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                        />
                      )}
                    />
                  </div>
                </HorizontalFormBlockWrapper>
                <HorizontalFormBlockWrapper
                  // title="Upload new thumbnail image"
                  description="Upload your product image gallery here"
                  isModalView={isModalView}
                >
                  <UploadZone
                    name="images"
                    label="Image"
                    disabled={isLoading || hideFields}
                    getValues={getValues}
                    setValue={setValue}
                    error={errors?.images?.message}
                    className="col-span-full"
                    show={!hideFields}
                    setPreview={setPreview}
                    preview={preview ?? ""}
                  />
                </HorizontalFormBlockWrapper>
              </div>
            </div>

            {!hideFields && (
              <div
                className={cn(
                  "sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col",
                  isModalView ? "-mx-10 -mb-7 px-10 py-5" : "py-1"
                )}
              >
                {id ? (
                  <Link href={routes.banner.banner}>
                    <Button
                      variant="outline"
                      className="w-full @xl:w-auto"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full @xl:w-auto"
                    type="button"
                    onClick={onClick}
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                >
                  {id ? "Update" : "Create"} Banner
                </Button>
              </div>
            )}
          </React.Fragment>
        );
      }}
    </SigninForm>
  );
}
