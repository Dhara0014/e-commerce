/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { useCallback, useMemo, useState } from 'react';
import { useTable } from '@/hooks/use-table';
import { getBannerColumns, getColumns, getWithdrawRequestColumns } from './columns';
// dynamic import
const TableFooter = dynamic(
  () => import('./table-footer'),
  { ssr: false }
);

interface CategoryTableProps {
  data: any;
  isLoading?: boolean;
  onDelete?: any;
  onStatusChange?: any;
  onFetchCategory?:any;
  fetchTransaction?: any;
}

export default function CategoryTable({
  data = [],
  isLoading,
  onDelete,
  onStatusChange,
  onFetchCategory,
  pages,
// }: CategoryTableProps) {
}: any) {
  const [pageSize, setPageSize] = useState(10);

  const {
    isFiltered,
    tableData,
    handleParPageData,
    currentPage,
    totalItems,
    handlePaginate,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
  } = useTable(data, pageSize);

  const columns = useMemo(
    () =>
      getColumns({
        sortConfig,
        onHeaderCellClick: (value: string) => ({
          onClick: () => handleSort(value),
        }),
        onDeleteItem: onDelete,
        onChecked: (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
          if (event.target.checked) {
            // Handle checkbox logic
          } else {
            // Handle checkbox logic
          }
        },
        onStatusChange,
        isLoading,
      }),
    [sortConfig, onDelete, onStatusChange]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

  return (
    <ControlledTable
      variant="modern"
      isLoading={isLoading}
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
        // total: pages?.total,
        current: currentPage,
        onChange: handlePaginate,
      }}
      filterOptions={{
        searchTerm,
        onSearchClear: () => handleSearch(''),
        onSearchChange: (event: { target: { value: string } }) =>
          handleSearch(event.target.value),
        hasSearched: isFiltered,
        columns,
        checkedColumns,
        setCheckedColumns,
      }}
    />
  );
}

export function BannerTable({
  data = [],
  isLoading,
  onDelete,
  onStatusChange,
  // pages,
// }: CategoryTableProps) {
}: any) {
  // const {pages} = useBanner();
  const [pageSize, setPageSize] = useState(10); 
  const {
    isFiltered,
    tableData,
    handleParPageData,
    currentPage,
    totalItems,
    handlePaginate,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
  } = useTable(data, pageSize,);

  const columns = useMemo(
    () =>
      getBannerColumns({
        sortConfig,
        onHeaderCellClick: (value: string) => ({
          onClick: () => handleSort(value),
        }),
        onDeleteItem: onDelete,
        onChecked: (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
          if (event.target.checked) {
            // Handle checkbox logic
          } else {
            // Handle checkbox logic
          }
        },
        onStatusChange,
        isLoading
      }),
    [sortConfig, onDelete, onStatusChange]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

  return ( 
    <ControlledTable
      variant="modern"
      isLoading={isLoading}
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
        onChange: handlePaginate,
      }}
      filterOptions={{
        searchTerm,
        onSearchClear: () => handleSearch(''),
        onSearchChange: (event: { target: { value: string } }) =>
          handleSearch(event.target.value),
        hasSearched: isFiltered,
        columns,
        checkedColumns,
        setCheckedColumns,
      }}
    />
  );
}

const withdrawStatusOption = [
  {label: 'Approved', value: 1 },
  {label: 'Rejected', value: 2 },
  {label: 'Pending', value: 3 },
];

export function WithdrawRequestTable({
  data=[],
  isLoading,
  onStatusChange,
  fetchTransaction,
}:CategoryTableProps) {
  const [pageSize, setPageSize] = useState(10);
  const [orderOption, setOrderOption] = useState<any>({});

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const {
    isFiltered,
    tableData,
    handleParPageData,
    currentPage,
    totalItems,
    handlePaginate,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleDelete,
  // } = useTable(categories, pageSize);
  } = useTable(data, pageSize);

  const columns = useMemo(
    () =>
      getWithdrawRequestColumns({ 
        sortConfig, 
        onHeaderCellClick, 
        onDeleteItem, 
        onChecked,
        onStatusChange,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      onChecked,
      // onStatusChange,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <ControlledTable
      variant="modern"
      isLoading={isLoading}
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
        onChange: (page: number) => handlePaginate(page),
      }}
      filterOptions={{
        searchTerm,
        onSearchClear: () => {
          handleSearch('');
        },
        onSearchChange: (event: { target: { value: string; }; }) => {
          handleSearch(event.target.value);
        },
        onChangeStatusFilter: (event: any) => {
          setOrderOption(event);
          fetchTransaction({status: event?.value});
        },
        onClearStatusFilter: ()=> {
          setOrderOption({});
          fetchTransaction({})
        },
        orderStatusOption: withdrawStatusOption,
        orderOption:orderOption,
        showStatusFilter: true,
        hasSearched: isFiltered,
        columns,
        checkedColumns,
        setCheckedColumns,
      }}
      tableFooter={
        <TableFooter
          checkedItems={checkedItems}
          handleDelete={(ids: string[]) => {
            handleDelete(ids);
            setCheckedItems([]);
          }}
        />
      }
      style={{width: '100% !important'}}
      className="overflow-hidden rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0 "
    />
  );
}




