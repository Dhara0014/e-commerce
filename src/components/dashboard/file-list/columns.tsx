/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import {
  PiCopySimple,
  PiDotsThreeOutlineVerticalFill,
  PiShareFat,
  PiTrashSimple,
} from "react-icons/pi";
import { HeaderCell } from "@/components/ui/table";
// import Favorite from '@/app/shared/file/manager/favorite';
import DateCell from "@/components/ui/date-cell";
import { ActionIcon, Badge, Button, Popover, Switch, Text, Tooltip } from "rizzui";
import Link from "next/link";
import PencilIcon from "@/components/icons/pencil";
import EyeIcon from "@/components/icons/eye";
import DeletePopover from "@/components/ui/delete-popover";
import AvatarCard from "@/components/ui/avatar-card";
import { authGetRequest, authPutRequest } from "@/app/shared/APIs/apis";
import { userListApi } from "@/app/shared/APIs/apiRoutes";
import toast from "react-hot-toast";
import { routes } from "@/config/routes";

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'approved':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'reject':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

type Columns = {
  sortConfig?: any;
  onDeleteItem: any;
  onHeaderCellClick: (value: string) => void;
  showFilter?: boolean | any;
  onStatusChange?: any;
  showIdentityApproval ?:any;
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: <HeaderCell title="Order ID" />,
    dataIndex: "orderId",
    key: "orderId",
    width: 100,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },

  {
    title: <HeaderCell title="Product name" />,
    dataIndex: "productName",
    key: "productName",
    width: 200,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },

  {
    title: <HeaderCell title="Buyer name" />,
    dataIndex: "buyerName",
    key: "buyerName",
    width: 200,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },

  {
    title: <HeaderCell title="Seller name" />,
    dataIndex: "sellerName",
    key: "sellerName",
    width: 200,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },

  {
    title: (
      <HeaderCell
        title="Order date"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "dueDate"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("orderDate"),
    dataIndex: "orderDate",
    key: "orderDate",
    width: 150,
    render: (value: Date) => <DateCell date={value} />,
  },

  {
    title: <HeaderCell title="Price" />,
    dataIndex: "price",
    key: "price",
    width: 100,
    render: (value: any) => <span className="text-gray-500"> $ {value} </span>,
  },

  {
    title: <HeaderCell title="Payment status" />,
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    width: 200,
    render: (value: any) => {
      return (
        <span
          className={`${value == "Paid" ? "text-green-700" : value == "Pending" ? "text-blue-700" : "text-red-700"}`}
        >
          {" "}
          &#9679; {value}{" "}
        </span>
      );
    },
  },

  {
    title: <HeaderCell title="Order status" />,
    dataIndex: "orderStatus",
    key: "orderStatus",
    width: 130,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },

  {
    title: <HeaderCell title="Delivery method" />,
    dataIndex: "deliveryMethod",
    key: "deliveryMethod",
    width: 200,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },

  {
    title: <HeaderCell title="Location" />,
    dataIndex: "location",
    key: "location",
    width: 200,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },
];

export const getUserColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  showFilter,
  onStatusChange,
  showIdentityApproval,
}: Columns) => [
  {
    title: <HeaderCell title="User" />,
    dataIndex: "profileImage",
    key: "id",
    width: 240,
    render: (value: string, row: any) => {
            return (
            <AvatarCard 
                src={value || "https://randomuser.me/api/portraits/men/1.jpg"}
                name={`${row.firstName} ${row.lastName}`}
                description={row.email}
                avatarProps={{
                  name: value ||"https://randomuser.me/api/portraits/men/1.jpg",
                  size: "lg",
                  className: "rounded-full",
                }}
            />
            );
          },
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "id",
    width: 100,
    render: (value: any, row: any) => (
      <div className="flex items-center">
        <Switch
          disabled={!showFilter}
          checked={value === "active" ? true : false}
          onChange={() => onStatusChange(row?.id, value)}
        />
      </div>
    ),
  },
  {
    ...!showIdentityApproval && {
      title: <HeaderCell title = "Identity status" />,
    dataIndex: "identityVerificationStatus",
    key : "id",
    width: 140,
    render: (value:any) => {
      return value !== "NotApproved" && getStatusBadge(value)
    }
    }
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
    key: "createdAt",
    width: 150,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    ...showFilter && {
      title: <div></div>,
      dataIndex: "action",
      key: "action",
      width: 140,
      render: (_: string, row: any) => (
        <div className="flex items-center justify-end gap-3 pe-3">
          <Tooltip size="sm" content={"Edit User"} placement="top" color="invert">
            {/* <Link href={`/user/${row.id}/edit`}> */}
            <Link href={routes.users.editUser(row.id)}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip size="sm" content={"View User"} placement="top" color="invert">
            {/* <Link href={`/user/${row.id}`}> */}
            <Link href={routes.users.userDetails(row.id)}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the User`}
            description={`Are you sure you want to delete this #${row.firstName}  ${row?.lastName}  user?`}
            onDelete={() => onDeleteItem({id:row.id})}
          />
        </div>
      ),
    },
  }
];

