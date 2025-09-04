/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { routes } from "@/config/routes";
import { HeaderCell } from "@/components/ui/table";
import EyeIcon from "@/components/icons/eye";
import PencilIcon from "@/components/icons/pencil";
import DateCell from "@/components/ui/date-cell";
import Image from "next/image";
import { ActionIcon, Switch, Tooltip } from "rizzui";
import DeletePopover from "@/components/ui/delete-popover";

// function getStatusBadge(status: string) {
//   switch (status.toLowerCase()) {
//     case 'pending':
//       return (
//         <div className="flex items-center">
//           <Badge color="warning" renderAsDot />
//           <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
//         </div>
//       );
//     case 'paid':
//       return (
//         <div className="flex items-center">
//           <Badge color="success" renderAsDot />
//           <Text className="ms-2 font-medium text-green-dark">{status}</Text>
//         </div>
//       );
//     case 'overdue':
//       return (
//         <div className="flex items-center">
//           <Badge color="danger" renderAsDot />
//           <Text className="ms-2 font-medium text-red-dark">{status}</Text>
//         </div>
//       );
//     default:
//       return (
//         <div className="flex items-center">
//           <Badge renderAsDot className="bg-gray-400" />
//           <Text className="ms-2 font-medium text-gray-600">{status}</Text>
//         </div>
//       );
//   }
// }

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: <HeaderCell title="" />,
    dataIndex: "profilePicture",
    key: "profilePicture",
    width: 70,
    render: (value: any, row: any) => (
      <div className="flex items-center">
        <Image
          src={row.profilePicture}
          alt={`${value}'s profile`}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="First name" />,
    dataIndex: "firstName",
    key: "firstName",
    width: 150,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },

  {
    title: <HeaderCell title="Last name" />,
    dataIndex: "lastName",
    key: "lastName",
    width: 150,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },

  {
    title: <HeaderCell title="Email" />,
    dataIndex: "email",
    key: "email",
    width: 250,
    render: (email: string) => email.toLowerCase(),
  },
  {
    title: <HeaderCell title="Phone number" />,
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 250,
    render: (email: string) => email.toLowerCase(),
  },
  {
    title: (
      <HeaderCell
        title="Registration date"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "dueDate"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("registrationDate"),
    dataIndex: "registrationDate",
    key: "registrationDate",
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },

  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (value: any, row: any) => (
      <div className="flex items-center">
        <Switch
          // checked={value === 'Active'}
          defaultChecked={value === "Active"}
          // onChange={(checked) => checked ? 'Active' : 'Inactive'}
        />
      </div>
    ),
  },

  // {
  //   title: (
  //     <HeaderCell
  //       title="Last login"
  //       sortable
  //       ascending={
  //         sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
  //       }
  //     />
  //   ),
  //   onHeaderCell: () => onHeaderCellClick('lastLogin'),
  //   dataIndex: 'lastLogin',
  //   key: 'lastLogin',
  //   width: 200,
  //   render: (value: Date) => <DateCell date={value} />,
  // },

  {
    title: <HeaderCell title="Location" />,
    dataIndex: "location",
    key: "location",
    width: 200,
    render: (value: any) => <span className="text-gray-500"> {value} </span>,
  },
  {
    title: <div></div>,
    dataIndex: "action",
    key: "action",
    width: 140,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={"Edit User"} placement="top" color="invert">
          <Link href={`/user/${row.id}/edit`}>
            {/* <Link href={routes.invoice.edit(row.id)}> */}
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
          {/* <Link href={routes.invoice.details(row.id)}> */}
          <Link href={`/user/${row.id}`}>
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
          description={`Are you sure you want to delete this #${row.id} user?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
