/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { routes } from '@/config/routes';
import TableAvatar from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import { ActionIcon, Badge, Text, Tooltip } from 'rizzui';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/components/ui/delete-popover';
import { toCurrency } from '@/utils/to-currency';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'item in transit':
    case 'item sent':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'ordered':
    case 'item delivered':
    case 'payment received':
    case 'delivered':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'payment released':
    case 'item approved':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-yellow-600">{status}</Text>
        </div>
      );
    case 'refunded':
      return (
        <div className="flex items-center">
          <Badge color="info" renderAsDot />
          <Text className="ms-2 font-medium text-blue-dark">{status}</Text>
        </div>
      );
    case 'cancelled':
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
  onDeleteItem?: any;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  show ?: boolean | any;
};

export const getColumns = ({
  sortConfig,
  onHeaderCellClick,
  show
}: Columns) => [
  {
    title: <HeaderCell title="Order ID " />,
    dataIndex: 'order_code',
    key: 'id',
    width: 200,
    render: (value: string) => <Text>#{value}</Text>,
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'user',
    key: 'id',
    width: 300,
    render: (value: any, row: any) => (
      <TableAvatar
        src={value?.profile || "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp"}
        name={value.name}
        description={value.email.toLowerCase()}
      />
    ),
  },
  {
    title: <HeaderCell title="Seller" />,
    dataIndex: 'seller',
    key: 'id',
    width: 300,
    render: (value: any, row: any) => (
      <TableAvatar
        src={value?.profile || "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-14.webp"}
        name={value?.name}
        description={value?.email.toLowerCase()}
      />
    ),
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('total_amount'),
    dataIndex: 'total_amount',
    key: 'id',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{toCurrency(value)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'shipping_status',
    key: 'id',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    title: (
      <HeaderCell
        title="Created at"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'order_date'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('order_date'),
    dataIndex: 'order_date',
    key: 'order_date',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    ...show && {
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (_: string, row: any) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={'View Order'}
            placement="top"
            color="invert"
          >
            <Link href={routes.orders.orderDetails(row.id)}>
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
        </div>
      ),
    },
  }
];

export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell title="Order ID" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: any) => (
      <Link
        href={routes.orders.editOrder(row.id)}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    hidden: 'customer',
    render: (_: any, row: any) => (
      <TableAvatar
        src={row.avatar}
        name={row.name}
        description={row.email.toLowerCase()}
      />
    ),
  },
  {
    title: <HeaderCell title="Items" />,
    dataIndex: 'items',
    key: 'items',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: (
      <HeaderCell
        title="Modified"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Order'}
          placement="top"
          color="invert"
        >
          {/* <Link href={routes.eCommerce.editOrder(row.id)}> */}
          <Link href={`/order/${row.id}/edit`}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Order'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Order'}
          placement="top"
          color="invert"
        >
          <Link href={`/order/${row.id}`}>
          {/* <Link href={routes.eCommerce.orderDetails(row.id)}> */}
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'View Order'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
