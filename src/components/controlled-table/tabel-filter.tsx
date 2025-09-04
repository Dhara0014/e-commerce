/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ToggleColumns } from "@/components/ui/table";
import { PiMagnifyingGlassBold, PiFunnel, PiXBold } from "react-icons/pi";
import cn from "@/utils/class-names";
import { ActionIcon, Button, Input, Select, Title } from "rizzui";
import useMedia from "react-use/lib/useMedia";const Drawer = dynamic(() => import("rizzui").then((module) => module.Drawer), {
  ssr: false,
});

function FilterDrawerView({
  isOpen,
  drawerTitle,
  hasSearched,
  setOpenDrawer,
  children,
}: React.PropsWithChildren<{
  drawerTitle?: string;
  hasSearched?: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}>) {
  return (
    <Drawer
      size="sm"
      isOpen={isOpen ?? false}
      onClose={() => setOpenDrawer(false)}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      containerClassName="dark:bg-gray-100"
      className="z-[9999]"
    >
      <div className="flex h-full flex-col p-5">
        <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-5 pb-4">
          <Title as="h5">{drawerTitle}</Title>
          <ActionIcon
            size="sm"
            rounded="full"
            variant="text"
            title={"Close Filter"}
            onClick={() => setOpenDrawer(false)}
          >
            <PiXBold className="h-4 w-4" />
          </ActionIcon>
        </div>
        <div className="flex-grow">
          <div className="grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
            {children}
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => setOpenDrawer(false)}
          className="mt-5 h-11 w-full text-sm"
        >
          Show Results
        </Button>
      </div>
    </Drawer>
  );
}

export type TableFilterProps = {
  searchTerm: string;
  onSearchClear: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: { [key: string]: any }[];
  checkedColumns: string[];
  setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  hideIndex?: number;
  children?: React.ReactNode;
  drawerTitle?: string;
  hasSearched?: boolean;
  showSearchOnTheRight?: boolean;
  enableDrawerFilter?: boolean;
  menu?: React.ReactNode;
  onChangeStatusFilter?: any;
  onClearStatusFilter?: any;
  orderStatusOption?: any;
  orderOption?: any;
  showStatusFilter?: any;
  setSearchTerm?: any;
};

// const orderStatusOption = [
//   // {label:"Select status" ,value: 0},
//   {label:"Ordered" ,value: 1},
//   {label:"Item Sent" ,value: 2},
//   {label:"Item In Transit" ,value: 3},
//   {label:"Item Delivered" ,value: 4},
//   {label:"Item Approved" ,value: 5},
//   {label:"Payment Released" ,value: 6},
//   {label:"Payment Received" ,value: 7},
//   {label:"Refunded" ,value: 8},
//   {label:"Cancelled" ,value: 9},
// ];
// const withdrawStatusOption = [
//   {label: 'Pending', value:0 },
//   {label: 'Approved', value:1 },
//   {label: 'Rejected', value:2 },
// ];

export default function TableFilter({
  searchTerm,
  onSearchClear,
  onSearchChange,
  columns,
  checkedColumns,
  setCheckedColumns,
  hideIndex,
  drawerTitle = "Table Filters",
  hasSearched,
  enableDrawerFilter = false,
  showSearchOnTheRight = false,
  menu,
  children,
  onChangeStatusFilter,
  orderStatusOption,
  onClearStatusFilter,
  orderOption,
  showStatusFilter,
  setSearchTerm,
}: TableFilterProps) {
  const isMediumScreen = useMedia("(max-width: 1860px)", false);
  const [showFilters, setShowFilters] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="table-filter mb-4 flex items-center justify-end">
      <div className="flex justify-end">
        {showStatusFilter && (
          <>
            <span className="pe-3 self-center ">
              <Button size="sm" className="" onClick={onClearStatusFilter}>
                {" "}
                Clear{" "}
              </Button>
            </span>
            <Select
              options={orderStatusOption}
              placeholder="Select by status"
              size="md"
              value={orderOption}
              onChange={onChangeStatusFilter}
              // onChange={(e:any) => {
              //   setOrderOption(e);
              //   fetchOrder({ status: e?.value });
              // } }
              className="pe-4 "
            />
          </>
        )}

        {/* {!showSearchOnTheRight ? ( */}
        <Input
          type="search"
          placeholder="Search by anything..."
          value={searchTerm}
          onClear={onSearchClear}
          onChange={onSearchChange}
          inputClassName="h-10 w-56"
          clearable={true}
          prefix={<PiMagnifyingGlassBold className="h-4 w-5" />}
        />
      </div>
    </div>
  );
}
