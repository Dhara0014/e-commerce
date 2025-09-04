'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
// import CreateCategory from '@/app/shared/category/category-list/create-category';
// import { PiPlusBold, PiXBold } from 'react-icons/pi';
// import { useModal } from '@/app/shared/modal-views/use-modal';
// import { ActionIcon, Button, Title } from 'rizzui';

// function CreateCategoryModalView() {
//   const { closeModal } = useModal();
//   return (
//     <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
//       <div className="mb-7 flex items-center justify-between">
//         <Title as="h4" className="font-semibold">
//           Add Category
//         </Title>
//         <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
//           <PiXBold className="h-auto w-5" />
//         </ActionIcon>
//       </div>
//       <CreateCategory isModalView={false} />
//     </div>
//   );
// }

type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
};

export default function WithdrawRequestPageHeader({
  title,
  breadcrumb,
  className,
}: PageHeaderTypes) {
//   const { openModal } = useModal();
  return (
    <React.Fragment>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className} />
    </React.Fragment>
  );
}
