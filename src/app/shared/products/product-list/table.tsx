/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import React, { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { usePathname } from 'next/navigation';
import { Button } from 'rizzui';
import { getProductColumns } from '../../users/user-list/columnsOne';
import { getColumns } from './columns';
import { routes } from '@/config/routes';
import useProduct from '@/hooks/use-product';
const FilterElement = dynamic(
  () => import('./filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  price: ['', ''],
  createdAt: [null, null],
  status: '',
};

export default function ProductsTable({ 
  data = [], 
  showFields,
  isLoading,
  onDelete,
  onStatusChange,
  onupdateProductApprovalStatus,
}: any
// { 
//     data: any;
//     showFields?:Boolean ;
//     isLoading? :boolean;
//     onDelete?: any;
//     onStatusChange? : any;
//   }, 
) 
    {
  const [pageSize, setPageSize] = useState(10);
  const pathname = usePathname();
  const show = pathname?.includes('/edit') || pathname?.includes(routes.products.product) ;
  const showSeller = pathname?.includes(routes.products.product);

  const {
    isFiltered,
    tableData,
    handleParPageData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(data, pageSize);

  const columns = useMemo(
    () =>
      getProductColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick:(value:string) => ({
          onClick: () => handleSort(value),
        }),
        onDeleteItem:onDelete,
        onChecked: handleRowSelect,
        handleSelectAll,
        showFields,
        show,
        showSeller,
        onStatusChange,
        onupdateProductApprovalStatus,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      sortConfig.key,
      sortConfig.direction,
      onDelete,
      handleRowSelect,
      handleSelectAll,
      onStatusChange,
      onupdateProductApprovalStatus
    ]
  );

  
  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <React.Fragment>
      <ControlledTable
        variant="modern"
        // isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize: (limit:any) => {
            setPageSize(limit),
            handleParPageData(limit)
          },
          total: totalItems,
          current: currentPage,
          // onChange: (page: number) => handlePaginate(page),
          onChange: handlePaginate,
        }}
        {
          ... (showSeller && {
            filterOptions:{
                searchTerm,
                onSearchClear: () => {
                  handleSearch('');
                  // fetchProduct({search: ''})
                },
                onSearchChange: (event) => {
                  handleSearch(event.target.value);
                  // fetchProduct({search: event.target.value}),
                  // setSearchTerm(event.target.value)
                },
                hasSearched: isFiltered,
                hideIndex: 1,
                columns,
                checkedColumns,
                setCheckedColumns,
                enableDrawerFilter: true,
              }
          })
        }
        filterElement= {
          showFields && <FilterElement
            filters={filters}
            isFiltered={isFiltered}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Products' : 'Product'}
            </Button>
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </React.Fragment>
  );
}

