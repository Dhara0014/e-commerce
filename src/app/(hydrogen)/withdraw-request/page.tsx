/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { routes } from '@/config/routes';
import CategoryTable, { WithdrawRequestTable } from '@/app/shared/category/category-list/table';
import HydrogenLayout from '@/app/layouts/hydrogen/layout';
import WithdrawRequestPageHeader from './create-page-header';
import useTransaction from '@/hooks/use-transaction';
import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'Withdraw Request',
  breadcrumb: [
  ],
};
const WithdrawRequestPage = () => {
  const {transactions, isLoading, changeTransactionStatus, fetchTransaction } = useTransaction();
  return (
      <HydrogenLayout>
        <>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
        {
          isLoading ? <p>Loading...</p> : 
          <WithdrawRequestTable
            data={transactions}
            isLoading={isLoading}
            onStatusChange={changeTransactionStatus}
            fetchTransaction={fetchTransaction}
          />
        }
        </>
      </HydrogenLayout>
    );
}

export default WithdrawRequestPage
