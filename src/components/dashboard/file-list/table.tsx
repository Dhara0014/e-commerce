/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useTable } from "@/hooks/use-table";
import { getColumns, getUserColumns } from "./columns";
import ControlledTable from "@/components/controlled-table";
import { useColumn } from "@/hooks/use-column";
import { Button, Title } from "rizzui";
import InvoiceFilterElement from "./invoice-filter-element";
import TableFooter from "@/app/shared/table-footer";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";

export function UserListTable({
  className,
  data = [],
  tableName = "",
  isLoading,
  onDelete,
  onStatusChange,
}: {
  className?: string;
  data: any[];
  tableName?: string;
  isLoading: boolean;
  onDelete: any;
  onStatusChange: any;
}) {
  const [pageSize, setPageSize] = useState(10);
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
  
  const pathname = usePathname();
  const showFilter = pathname?.includes(routes.users.user) || pathname == routes.identificationApprovals ;
  const showIdentityApproval = pathname == routes.identificationApprovals ;

  const columns = useMemo(
    () => getUserColumns({ 
      sortConfig, 
      onHeaderCellClick:(value:string) => ({
        onClick: () => handleSort(value),
      }), 
      onDeleteItem:onDelete, 
      showFilter ,
      onStatusChange,
      showIdentityApproval,
    }),
    [sortConfig, onDelete, onStatusChange]
  );

  // const { visibleColumns } = useColumn(columns);
  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div className={className}>
      {tableName && (<div className="mb-3 flex items-center justify-between 2xl:mb-5">
        <Title
          as="h3"
          className="text-lg font-semibold text-gray-900 xl:text-xl"
        >
          {tableName}
        </Title>
      </div>)}
      <ControlledTable
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        // scroll={{ x: 1300 }}
        variant="modern"
        tableLayout="fixed"
        // rowKey={(record: { id: any }) => record.id}
        // className="overflow-hidden rounded-lg border border-muted text-sm"
        paginatorOptions={{
          pageSize,
          setPageSize : (limit:any) => {
            setPageSize(limit),
            handleParPageData(limit)
          },
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        {
          ...(showFilter && {
            filterOptions: {
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
              }
          })
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
    </div>
  );
}

const filterState = {
  amount: ['', ''],
  createdAt: [null, null],
  dueDate: [null, null],
  status: '',
};