/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-expressions */

"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useTable } from "@/hooks/use-table";
import { useColumn } from "@/hooks/use-column";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import ControlledTable from "@/components/controlled-table";
import cn from "@/utils/class-names";
import { ActionIcon, Title } from "rizzui";
import Link from "next/link";
import { routes } from "@/config/routes";
import { usePathname } from "next/navigation";
import { getColumns } from "./columns";
import ExpandedOrderRow from "./expanded-row";
// dynamic import
const FilterElement = dynamic(() => import("./filter-element"), { ssr: false });

function CustomExpandIcon(props: any) {
  return (
    <ActionIcon
      size="sm"
      variant="outline"
      rounded="full"
      className="expand-row-icon ms-2"
      onClick={(e) => {
        props.onExpand(props.record, e);
      }}
    >
      {props.expanded ? (
        <PiCaretUpBold className="h-3.5 w-3.5" />
      ) : (
        <PiCaretDownBold className="h-3.5 w-3.5" />
      )}
    </ActionIcon>
  );
}

const filterState = {
  price: ["", ""],
  createdAt: [null, null],
  updatedAt: [null, null],
  status: "",
};
const orderStatusOption = [
  // {label:"Select status" ,value: 0},
  {label:"Ordered" ,value: 1},
  {label:"Item Sent" ,value: 2},
  {label:"Item In Transit" ,value: 3},
  {label:"Item Delivered" ,value: 4},
  {label:"Item Approved" ,value: 5},
  {label:"Payment Released" ,value: 6},
  {label:"Payment Received" ,value: 7},
  {label:"Refunded" ,value: 8},
  {label:"Cancelled" ,value: 9},
];

export default function OrderTable({
  data = [],
  variant = "modern",
  className,
  tableName = "",
  fetchOrder,
}: {
  data: any;
  variant?: "modern" | "minimal" | "classic" | "elegant" | "retro";
  className?: string;
  tableName?: string;
  fetchOrder?: any;
}) {
  const [pageSize, setPageSize] = useState(10);
  const pathname = usePathname();
  const show = pathname?.includes(routes.orders.order);
  const [orderOption, setOrderOption] = useState<any>({});  

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const {
    isLoading,
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
    handleDelete,
    handleReset,
  } = useTable(data, pageSize, filterState);

  const columns = useMemo(
    () => getColumns({ sortConfig, onHeaderCellClick, show}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onHeaderCellClick, sortConfig.key, sortConfig.direction, show]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div className={cn(className)}>
      {tableName && (<div className="mb-3 flex items-center justify-between 2xl:mb-5">
        <Title
          as="h3"
          className="text-lg font-semibold text-gray-900 xl:text-xl"
        >
          {tableName}
        </Title>
      </div>)}
      <ControlledTable
        variant={variant}
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        // expandable={{
        //   expandIcon: CustomExpandIcon,
        //   expandedRowRender: (record: any) => (
        //     <ExpandedOrderRow record={record} />
        //   ),
        // }}
        {...(show && {
          paginatorOptions: {
            pageSize,
            setPageSize: (limit:any) => {
              setPageSize(limit),
              handleParPageData(limit)
            },
            total: totalItems,
            current: currentPage,
            onChange: (page: number) => handlePaginate(page),
          },
          filterOptions: {
            searchTerm,
            onSearchClear: () => {
              handleSearch("");
            },
            onSearchChange: (event: { target: { value: string } }) => {
              handleSearch(event.target.value);
            },
            onChangeStatusFilter: (event: any) => {
              setOrderOption(event);
              fetchOrder({status: event?.value});
            },
            onClearStatusFilter: ()=> {
              setOrderOption({});
              fetchOrder({})
            },
            orderStatusOption: orderStatusOption,
            orderOption:orderOption,
            showStatusFilter: true,
            hasSearched: isFiltered,
            hideIndex: 1,
            columns,
            checkedColumns,
            setCheckedColumns,
            enableDrawerFilter: true,
          },
          filterElement: (
            <FilterElement
              isFiltered={isFiltered}
              filters={filters}
              updateFilter={updateFilter}
              handleReset={handleReset}
            />
          ),
        })}
        className={
          "overflow-hidden rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        }
      />
    </div>
  );
}
