/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import {
  getCategoiresTableColumns,
  getOrderTableColumns,
} from './columnsOne';
import { Button } from 'rizzui';
// import { getColumns } from './columns';
const FilterElement = dynamic(
  () => import('./filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('./table-footer'), {
  ssr: false,
});

const filterState = {
  amount: ['', ''],
  createdAt: [null, null],
  dueDate: [null, null],
  status: '',
};

// export default function InvoiceTable({ data = [] }: { data: any[] }) {
//   const [pageSize, setPageSize] = useState(10);

//   const onHeaderCellClick = (value: string) => ({
//     onClick: () => {
//       handleSort(value);
//     },
//   });

//   const onDeleteItem = useCallback((id: string) => {
//     handleDelete(id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const {
//     isLoading,
//     isFiltered,
//     tableData,
//     currentPage,
//     totalItems,
//     handlePaginate,
//     filters,
//     updateFilter,
//     searchTerm,
//     handleSearch,
//     sortConfig,
//     handleSort,
//     selectedRowKeys,
//     setSelectedRowKeys,
//     handleRowSelect,
//     handleSelectAll,
//     handleDelete,
//     handleReset,
//   } = useTable(data, pageSize, filterState);

//   const columns = React.useMemo(
//     () =>
//       getColumns({
//         data,
//         sortConfig,
//         checkedItems: selectedRowKeys,
//         onHeaderCellClick,
//         onDeleteItem,
//         onChecked: handleRowSelect,
//         handleSelectAll,
//       }),
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [
//       selectedRowKeys,
//       onHeaderCellClick,
//       sortConfig.key,
//       sortConfig.direction,
//       onDeleteItem,
//       handleRowSelect,
//       handleSelectAll,
//     ]
//   );

//   const { visibleColumns, checkedColumns, setCheckedColumns } =
//     useColumn(columns);

//   return (
//     <React.Fragment>
//       <ControlledTable
//         variant="modern"
//         data={tableData}
//         isLoading={isLoading}
//         showLoadingText={true}
//         // @ts-ignore
//         columns={visibleColumns}
//         paginatorOptions={{
//           pageSize,
//           setPageSize,
//           total: totalItems,
//           current: currentPage,
//           onChange: (page: number) => handlePaginate(page),
//         }}
//         filterOptions={{
//           searchTerm,
//           onSearchClear: () => {
//             handleSearch('');
//           },
//           onSearchChange: (event) => {
//             handleSearch(event.target.value);
//           },
//           hasSearched: isFiltered,
//           columns,
//           checkedColumns,
//           setCheckedColumns,
//         }}
//         filterElement={
//           <FilterElement
//             isFiltered={isFiltered}
//             filters={filters}
//             updateFilter={updateFilter}
//             handleReset={handleReset}
//           />
//         }
//         tableFooter={
//           <TableFooter
//             checkedItems={selectedRowKeys}
//             handleDelete={(ids: string[]) => {
//               setSelectedRowKeys([]);
//               handleDelete(ids);
//             }}
//           >
//             <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
//               Re-send {selectedRowKeys.length}{' '}
//               {selectedRowKeys.length > 1 ? 'Invoices' : 'Invoice'}{' '}
//             </Button>
//           </TableFooter>
//         }
//         className="overflow-hidden rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
//       />
//     </React.Fragment>
//   );
// }

export function OrdersTable({ data = [] }: { data: any[] }) {
  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
    isFiltered,
    tableData,
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
  } = useTable(data, pageSize, filterState);

  const columns = React.useMemo(
    () =>
      getOrderTableColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <React.Fragment>
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
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
              Re-send {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Invoices' : 'Invoice'}{' '}
            </Button>
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </React.Fragment>
  );
}

export function CategoiresTable({ data = [] }: { data: any[] }) {
  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
    isFiltered,
    tableData,
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
  } = useTable(data, pageSize, filterState);

  const columns = React.useMemo(
    () =>
      getCategoiresTableColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <React.Fragment>
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
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
              Re-send {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Invoices' : 'Invoice'}{' '}
            </Button>
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </React.Fragment>
  );
}
