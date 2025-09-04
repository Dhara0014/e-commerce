/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import AvatarCard, { capitalizeFirstLetter } from '@/components/ui/avatar-card';
import { PiStarFill } from 'react-icons/pi';
import DateCell from '@/components/ui/date-cell';
import { ActionIcon, Badge, Text, Tooltip } from 'rizzui';
import DeletePopover from '@/components/ui/delete-popover';
import { toCurrency } from '@/utils/to-currency';

// get status badge
function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'active':
    case 'approved':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{capitalizeFirstLetter(status)}</Text>
        </div>
      );
    case 'inactive':
    case 'pending':
    case 'not approved':
      return (  
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{capitalizeFirstLetter(status)}</Text>
        </div>
      );
    case 'rejected':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{capitalizeFirstLetter(status)}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{capitalizeFirstLetter(status)}</Text>
        </div>
      );
  }
}

// get rating calculation
function getRating(buyerRating: number, sellerRating: number) {
  return (
    <div className="flex items-center">
      <div className="flex items-center me-2">
        <span className="me-1 shrink-0">Buyer Rating: {buyerRating}</span>
        {[...new Array(5)].map((arr, index) => {
          return index < Math.round(buyerRating) ? (
            <PiStarFill className="w-4 fill-orange text-orange" key={index} />
          ) : (
            <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
          );
        })}
      </div>
      <div className="flex items-center">
        <span className="me-1 shrink-0">Seller Rating: {sellerRating}</span>
        {[...new Array(5)].map((arr, index) => {
          return index < Math.round(sellerRating) ? (
            <PiStarFill className="w-4 fill-orange text-orange" key={index} />
          ) : (
            <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
          );
        })}
      </div>
    </div>
  );
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  showFields?: Boolean;
  name?: string;
  show?: Boolean | any;
};

export const getTransactionColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  showFields
}: Columns) => [
  {
    title: <HeaderCell title="Transaction ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 120,
    render: (value: string) => (
      <Text className="text-sm">#{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    render: (value: string) => <DateCell date={new Date(value)} />,
  },
  {
    title: (
      <HeaderCell
        title="Amount"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('amount'),
    dataIndex: 'amount',
    key: 'id',
    width: 120,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{toCurrency(value)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Description" />,
    dataIndex: 'description',
    key: 'id',
    width: 250,
    render: (value:string, row:any) => (
      <Text className='font-medium text-gray-700'>{row?.transactionType == 'Withdrawal' ? "Withdrawal Request":value }</Text>
    ),
  }, 
  {
    title: <HeaderCell title="Type" />,
    dataIndex: 'transactionType',
    key: 'id',
    width: 70,
    render: (value: string, row:any) => <Text className="text-sm">{value}</Text>,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'id',
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },
];

export const getSellColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  showFields,
  name,
  show
}: Columns) => [
  // {
  //   title: <HeaderCell title="Order ID" />,
  //   dataIndex: 'id',
  //   key: 'id',
  //   width: 80,
  //   render: (value: string) => <Text className="text-sm">{value}</Text>,
  // },
  {
    title: <HeaderCell title="Product ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 80,
    render: (value: string) => <Text className="text-sm">{value}</Text>,
  },
  {
    title: <HeaderCell title="Product" />,
    dataIndex: 'Images',
    key: 'id',
    width: 230,
    // hidden: 'customer',
    render: (value: any, row: any) => (
      <AvatarCard
        src={value[0]?.name}
        name={row.title}
        description={row.category?.title}
        avatarProps={{
          name: row.title,
          size: 'lg',
          className: 'rounded-lg',
        }}
      />
    ),
  },
  {
    title: <HeaderCell title={`${name != 'sell' ? 'Seller' : 'Buyer'}`} />,
    dataIndex: 'seller',
    key: 'id',
    width: 230,
    // hidden: 'customer',
    render: (value: any, row: any) => (
      <AvatarCard
        src={value['profileImage']}
        name={value['name']}
        description={value['email']}
        avatarProps={{
          name: value.name,
          size: 'lg',
          className: 'rounded-full',
        }}
      />
    ),
  },
  {
    title: (
      <HeaderCell
        title="Amount"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 100,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{toCurrency(value)}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created at"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'id',
    width: 150,
    render: (value: string) => <DateCell date={new Date(value)} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'id',
    width: 100,
    render: (value: string) => getStatusBadge(value),
  },
  // {... (show) && {
  //   // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
  //   title: <HeaderCell title="Actions" className="opacity-0" />,
  //   dataIndex: 'action',
  //   key: 'action',
  //   width: 120,
  //   render: (_: string, row: any) => (
  //     <div className="flex items-center justify-end gap-3 pe-4">
  //       {/* <Tooltip
  //         size="sm"
  //         content={'Edit Product'}
  //         placement="top"
  //         color="invert"
  //       >
  //         <Link href={routes.eCommerce.ediProduct(row.id)}>
  //           <ActionIcon size="sm" variant="outline" aria-label={'Edit Product'}>
  //             <PencilIcon className="h-4 w-4" />
  //           </ActionIcon>
  //         </Link>
  //       </Tooltip> */}
  //       <Tooltip
  //         size="sm"
  //         content={'View Product'}
  //         placement="top"
  //         color="invert"
  //       >
  //         <Link href={`/deal/${row.id}/edit`}>
  //           <ActionIcon size="sm" variant="outline" aria-label={'View Product'}>
  //             <EyeIcon className="h-4 w-4" />
  //           </ActionIcon>
  //         </Link>
  //       </Tooltip>
  //       {/* <DeletePopover
  //         title={`Delete the product`}
  //         description={`Are you sure you want to delete this #${row.id} product?`}
  //         onDelete={() => onDeleteItem(row.id)}
  //       /> */}
  //     </div>
  //   ),
  // }, }
]