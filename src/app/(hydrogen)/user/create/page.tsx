import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateInvoice from '../create-invoice';
import React from 'react';

const pageHeader = {
  title: 'Create User',
  breadcrumb: [
    {
      href: routes.users.user,
      name: 'Home',
    },
    {
      href: routes.users.user,
      name: 'User',
    },
    {
      name: 'Create',
    },
  ],
};

export default function InvoiceCreatePage() {
  return (
    <React.Fragment>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>

      <CreateInvoice />
    </React.Fragment>
  );
}
