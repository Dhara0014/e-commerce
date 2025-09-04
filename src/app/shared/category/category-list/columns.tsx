/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import Image from "next/image";
import { routes } from "@/config/routes";
import { HeaderCell } from "@/components/ui/table";
import PencilIcon from "@/components/icons/pencil";
import AvatarCard from "@/components/ui/avatar-card";
import { ActionIcon, Badge, Select, Switch, Text, Title, Tooltip } from "rizzui";
import DeletePopover, { CommentPopover } from "@/components/ui/delete-popover";
import React from "react";
import DateCell from "@/components/ui/date-cell";
import StatusPopover from "@/components/ui/status-popover";
import { authGetRequest, authPutRequest } from "../../APIs/apis";
import { categoryListApi, categoryStatusChangeApi } from "../../APIs/apiRoutes";
import toast from "react-hot-toast";
import EyeIcon from "@/components/icons/eye";
import { toCurrency } from "@/utils/to-currency";

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onStatusChange ?: any,
  isLoading?: boolean;
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  onChecked,
  onStatusChange,
  isLoading
}: Columns) => [
  {
    title: <HeaderCell title="Category" />,
    dataIndex: "categoryImage",
    key: "id",
    width: 250,
    render: (value: string, row: any) => (
      <AvatarCard
        src={value}
        name={row.title}
        description={row.description}
        avatarProps={{
          name: value,
          size: "lg",
          className: "rounded-lg",
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (value: any, row: any) => (
      <div className="flex items-center">
        <Switch
          checked={value === "active" ? true : false} 
          onChange={() => onStatusChange(row?.id, value)}
          disabled={isLoading}
        />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created at"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "dueDate"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("createdAt"),
    dataIndex: "createdAt",
    key: "id",
    width: 250,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <React.Fragment></React.Fragment>,
    dataIndex: "action",
    key: "action",
    width: 150,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={"Edit Category"}
          placement="top"
          color="invert"
        >
          <Link href={routes.category.editCategory(row.id)}>
            <ActionIcon size="sm" variant="outline">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
            size="sm"
            content={'View Category'}
            placement="top"
            color="invert"
          >
            <Link href={routes.category.categoryDetails(row.id)}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:text-gray-700"
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
        <DeletePopover
          title={`Delete the category`}
          description={`Are you sure you want to delete this #${row.title} category?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];

export const getBannerColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  onChecked,
  onStatusChange,
  isLoading
}: Columns) => [
  {
    title: <HeaderCell title="Banner" />,
    dataIndex: "bannerImage",
    key: "id",
    width: 200,
    // hidden: 'customer',
    render: (value: string, row: any) => (
      <AvatarCard
        src={value}
        name={row.title || ""}
        description={row.description || ""}
        avatarProps={{
          name: value,
          size: "lg",
          className: "rounded-lg",
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (value: any, row: any) => (
      <div className="flex items-center">
        <Switch
          checked={value === "active" ? true : false}
          onChange={() => onStatusChange(row?.id, value)}
          disabled={isLoading}
        />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created at"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "dueDate"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("createdAt"),
    dataIndex: "createdAt",
    key: "id",
    width: 250,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <React.Fragment></React.Fragment>,
    dataIndex: "action",
    key: "id",
    width: 200,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={"Edit Banner"}
          placement="top"
          color="invert"
        >
          <Link href={`/banner/${row.id}/edit`}>
            <ActionIcon size="sm" variant="outline">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
            size="sm"
            content={'View Banner'}
            placement="top"
            color="invert"
          >
            <Link href={routes.banner.bannerDetails(row.id)}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:text-gray-700"
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
        <DeletePopover
          title={`Delete the banner`}
          description={`Are you sure you want to delete this #${row.title} banner?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];

export const getWithdrawRequestColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  onChecked,
  onStatusChange,
}: Columns) => [
  {
    title: <HeaderCell title="User" />,
    dataIndex: "user",
    key: "id",
    width: 150,
    render: (value: any, row: any) => (
      <AvatarCard
        src={value?.profileImage}
        name={value?.name}
        description={value?.email}
        avatarProps={{
          name: value?.name,
          size: "lg",
          className: "rounded-full",
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Amount" />,
    dataIndex: "amount",
    key: "amount",
    width: 150,
    render: (value: string) => (
      <Text className="truncate !text-sm ">{toCurrency(value)}</Text>
    ),
  },
  // {
  //   title: <HeaderCell title="Request ID" />,
  //   dataIndex: "request_id",
  //   key: "request_id",
  //   width: 150,
  //   render: (value: any) => (
  //     <Text className="truncate !text-sm ">{value}</Text>
  //   ),
  // },
    {
      title: <HeaderCell title="Transaction Details" />,
      dataIndex: "transactionType",
      key: "id",
      width: 250,
      render: (value: any, row:any) => (
        <div>
          <div><span className="font-bold">Payment Type:</span> {value}</div>
          <div className="flex row gap-1">
          {/* <div  title={(row?.comment == null || row?.comment?.length <=0) ? 'NA' : row?.comment}> */}
          <span className="font-bold" >Comment:</span> 
          {(row?.comment !== null || row?.comment?.length > 0) ? row?.comment?.length > 50 ? `${row?.comment.slice(0,50)}...` : row?.comment  :'NA' }
          {(row?.comment !== null &&  row?.comment?.length > 50) && <span className="">
                <CommentPopover title="View Comment" description={row?.comment} />
          </span>}
        </div> 
        </div>
      ),
    },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    width: 100,
    // render: (value: string) => getStatusBadge(value),
    render: (value:string, row:any) => {      
      return <StatusPopover
      title="Change Status"
      description="Update the status and provide a comment."
      currentStatus={value}
      currentComment={row?.comment}
      id={row?.id}
      options={[
        { value: "Pending", label: "Pending" },
        { value: "Approved", label: "Approved" },
        { value: "Rejected", label: "Rejected" },
      ]}
      onStatusChange={(id,newStatus, comment) => 
        onStatusChange({id, status: newStatus, comment})}
    />
      },
  },
  {
    title: (
      <HeaderCell
        title="Request date"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "dueDate"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("transactionDate"),
    dataIndex: "transactionDate",
    key: "transactionDate",
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  // {
  //   title: <React.Fragment></React.Fragment>,
  //   dataIndex: "action",
  //   key: "id",
  //   width: 200,
  //   render: (_: string, row: any) => (
  //     <div className="flex items-center justify-end gap-3 pe-4">
  //       {/* <Tooltip
  //         size="sm"
  //         content={'Edit Banner'}
  //         placement="top"
  //         color="invert"
  //       >
  //         {/* <Link href={routes.eCommerce.editCategory(row.id)}> */}
  //       {/* <Link href={`/banner/${row.id}/edit`}>
  //           <ActionIcon size="sm" variant="outline">
  //             <PencilIcon className="h-4 w-4" />
  //           </ActionIcon>
  //         </Link>
  //       </Tooltip> */}
  //       <DeletePopover
  //         title={`Delete the banner`}
  //         description={`Are you sure you want to delete this #${row.id} banner?`}
  //         onDelete={() => onDeleteItem(row.id)}
  //       />
  //     </div>
  //   ),
  // },
];
