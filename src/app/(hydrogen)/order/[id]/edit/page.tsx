/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';
// import CreateOrder from '@/components/orders/create-order';
import { orderData } from '@/components/orders/order-form/form-utils';
import HydrogenLayout from '@/app/layouts/hydrogen/layout';

const pageHeader = {
  title: 'Edit Order',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Home',
    },
    {
      href: routes.dashboard,
      name: 'Orders',
    },
    {
      name: 'Edit',
    },
  ],
};

export default function EditOrderPage({ params }: any) {
  return (
    <HydrogenLayout>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.dashboard}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
        </Link>
      </PageHeader>
      {/* <CreateOrder id={params.id} order={orderData} /> */}
    </HydrogenLayout>
  );
}
