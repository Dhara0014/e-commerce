/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import CreateCategory from "@/app/shared/category/category-list/create-category";
import { PiPlusBold, PiXBold } from "react-icons/pi";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { ActionIcon, Button, Title } from "rizzui";
import PageHeader from "@/app/shared/page-header";

function CreateCategoryModalView({ onAdd }: { onAdd: any }) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add Category
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <CreateCategory
        isModalView={false}
        onClick={() => closeModal()}
        onAdd={onAdd}
        hideFields={false}
      />
    </div>
  );
}

type PageHeaderTypes = {
  title?: string | any;
  breadcrumb?: any;
  className?: string;
  onAdd?: any;
};

export default function CategoryPageHeader({
  title,
  breadcrumb,
  className,
  onAdd,
  }: PageHeaderTypes) {
// }: any) {
  const { openModal } = useModal();
  return (
    <React.Fragment>
      <PageHeader
        title={title}
        breadcrumb={breadcrumb}
        className={className}
      >
        <Button
          as="span"
          className="mt-4 w-full cursor-pointer @lg:mt-0 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          onClick={() => {
            openModal({
              view: <CreateCategoryModalView onAdd={onAdd} />,
              customSize: "720px",
            });
          }}
        >
          <PiPlusBold className="me-1 h-4 w-4" />
          Add Category
        </Button>
      </PageHeader>
    </React.Fragment>
  );
}
