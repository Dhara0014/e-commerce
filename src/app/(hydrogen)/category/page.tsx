/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { routes } from "@/config/routes";
import CategoryTable from "@/app/shared/category/category-list/table";
import CategoryPageHeader from "./category-page-header";
import HydrogenLayout from "@/app/layouts/hydrogen/layout";
import useCategory from "@/hooks/use-category";

const pageHeader = {
  title: "Category",
  breadcrumb: [
    {
      href: routes.category.category,
      name: "Home",
    },
    {
      href: routes.category.category,
      name: "Category",
    },
    {
      name: "List",
      href: "",
    },
  ],
};

export default function Page() {
  const {
    categories,
    isLoading,
    deleteCategory,
    changeCategoryStatus,
    addCategory,
    pages,
  } = useCategory();

  
  return (
    <HydrogenLayout>
      <>
        <CategoryPageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
          onAdd={addCategory}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <CategoryTable
            data={categories}
            isLoading={isLoading}
            onDelete={deleteCategory}
            onStatusChange={changeCategoryStatus}
            pages={pages}
          />
        )}
      </>
    </HydrogenLayout>
  );
}
