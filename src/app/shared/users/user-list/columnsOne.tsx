/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import Link from "next/link";
import { HeaderCell } from "@/components/ui/table";
import { routes } from "@/config/routes";
import EyeIcon from "@/components/icons/eye";
import PencilIcon from "@/components/icons/pencil";
import AvatarCard, { capitalizeFirstLetter } from "@/components/ui/avatar-card";
import { PiStarFill } from "react-icons/pi";
import DateCell from "@/components/ui/date-cell";
import { ActionIcon, Badge, Select, Switch, Text, Tooltip } from "rizzui";
import DeletePopover from "@/components/ui/delete-popover";
import { authPutRequest } from "../../APIs/apis";
import { toCurrency } from "@/utils/to-currency";


// get status badge
function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{capitalizeFirstLetter(status)}</Text>
        </div>
      );
    case "publish":
    case "active":
    case "live":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{capitalizeFirstLetter(status)}</Text>
        </div>
      );
    case "inactive":
    case "notapproved":
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

// get stock status
// function getStockStatus(status: number) {
//   if (status === 0) {
//     return (
//       <div>
//         <Progressbar
//           value={status}
//           color="danger"
//           label={'out of stock'}
//           className="h-1.5 w-24 bg-red/20"
//         />
//         <Text className="pt-1.5 text-[13px] text-gray-500">out of stock </Text>
//       </div>
//     );
//   } else if (status <= 20) {
//     return (
//       <div>
//         <Progressbar
//           value={status}
//           color="warning"
//           label={'low stock'}
//           className="h-1.5 w-24 bg-orange/20"
//         />
//         <Text className="pt-1.5 text-[13px] text-gray-500">
//           {status} low stock
//         </Text>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <Progressbar
//           value={status}
//           color="success"
//           label={'stock available'}
//           className="h-1.5 w-24 bg-green/20"
//         />
//         <Text className="pt-1.5 text-[13px] text-gray-500">
//           {status} in stock
//         </Text>
//       </div>
//     );
//   }
// }

// get rating calculation
// function getRating(rating: number[]) {
//   let totalRating = rating.reduce((partialSum, value) => partialSum + value, 0);
//   let review = totalRating / rating?.length;

//   return (
//     <div className="flex items-center">
//       <span className="me-1 shrink-0">{review.toFixed(1)}</span>
//       {[...new Array(5)].map((arr, index) => {
//         return index < Math.round(review) ? (
//           <PiStarFill className="w-4 fill-orange text-orange" key={index} />
//         ) : (
//           <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
//         );
//       })}{' '}
//       <span className="ms-1 shrink-0">({totalRating})</span>
//     </div>
//   );
// }

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  showFields?: Boolean;
  show?: Boolean | any;
  showSeller ?: Boolean | any;
  onStatusChange?: any;
  onupdateProductApprovalStatus ?: any;
  handleTabClick?: any;
};

export const getProductColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  showFields,
  show,
  showSeller,
  onStatusChange,
  onupdateProductApprovalStatus,
  handleTabClick,
}: Columns) => {  
  return [
    // {
    //   title: <HeaderCell title="Product ID" />,
    //   dataIndex: "id",
    //   key: "id",
    //   width: 80,
    //   render: (value: string) => <Text className="text-sm">{value}</Text>,
    // },
    {
      title: <HeaderCell title="Product" />,
      dataIndex: "Images",
      key: "id",
      width: 230,
      render: (value: any, row: any) => {
        return (
          <AvatarCard
            src={value[value?.length -1]?.name || "https://prelo-api.i-nextgen.com/uploads/profile//1735543830462.jpg"}
            name={row.title}
            description={row?.description}
            avatarProps={{
              name: value[value?.length -1]?.name || "https://prelo-api.i-nextgen.com/uploads/profile//1735543830462.jpg",
              size: "lg",
              className: "rounded-lg",
            }}
          />
        );
      },
    },
    // {
    //   title: <HeaderCell title="Description" />,
    //   dataIndex: "description",
    //   key: "description",
    //   width: 250,
    //   render: (value: string) => <Text className="text-sm">{value}</Text>,
    // },
    {
      title: (
        <HeaderCell
          title="Price"
          sortable
          ascending={
            sortConfig?.direction === "asc" && sortConfig?.key === "price"
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick("price"),
      dataIndex: "price",
      key: "id",
      width: 100,
      render: (value: string) => (
        <Text className="font-medium text-gray-700">{toCurrency(value)}</Text>
      ),
    },
    { ...showSeller && {
      title: <HeaderCell title="Seller Information" />,
      dataIndex: "seller",
      key: "id",
      width: 230,
      render: (value: any, row: any) => {        
        return <AvatarCard
          src={value?.profileImage || "https://prelo-api.i-nextgen.com/uploads/profile//1735543830462.jpg"}
          name={value?.name}
          description={value?.email}
          avatarProps={{
            name: value?.profileImage || "https://prelo-api.i-nextgen.com/uploads/profile//1735543830462.jpg",
            size: "lg",
            className: "rounded-full",
          }}
        />
        },
    }      
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (value: string, row: any) => {              
        return show ? <Switch 
        checked={value === "active" ? true : false}
        onChange={() => {
          onStatusChange(row?.id, value,row?.seller?.id),
          handleTabClick('product')
        }}
        /> : getStatusBadge(value)
      },
    },
    {
      title: <HeaderCell title="Approval Status" />,
      dataIndex: "approvalStatus",
      key: "id",
      width: 160,
      render: (value:any, row:any) => {                      
        return showSeller ? <Select
        options={[
          {label: "Pending", value: 1,},
          {label: "Live", value: 2,},
          {label: "Not Approved", value: 3,},
        ]}
        size="md"
        value={capitalizeFirstLetter(value)}
        placeholder="Select a status"
        getOptionValue={(option) => option.value}
        onChange={(e:any) => onupdateProductApprovalStatus({productId : row?.id, approvalStatus : e})}
        disabled={!show}
      /> : getStatusBadge(value)
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
      key: "id",
      width: 150,
      render: (value: Date) => {
        return <DateCell date={value} />
        
      },
    },
    {
      ...(showSeller && {
        // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
        title: <HeaderCell title="Actions" className="opacity-0" />,
        dataIndex: "action",
        key: "action",
        width: 120,
        render: (_: string, row: any) => (
          <div className="flex items-center justify-end gap-3 pe-4">
            <Tooltip
              size="sm"
              content={"Edit Product"}
              placement="top"
              color="invert"
            >
              <Link href={routes.products.ediProduct(row.id)}>
                <ActionIcon
                  size="sm"
                  variant="outline"
                  aria-label={"Edit Product"}
                >
                  <PencilIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
            <Tooltip
              size="sm"
              content={"View Product"}
              placement="top"
              color="invert"
            >
              <Link href={`${routes.products.productDetails(row.id)}/view`}>
                <ActionIcon
                  size="sm"
                  variant="outline"
                  aria-label={"View Product"}
                >
                  <EyeIcon className="h-4 w-4" />
                </ActionIcon>
              </Link>
            </Tooltip>
            <DeletePopover
              title={`Delete the product`}
              description={`Are you sure you want to delete this #${row.title} product?`}
              onDelete={() => onDeleteItem(row.id)}
            />
          </div>
        ),
      }),
    },
  ];
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  showFields,
}: Columns) => [
  {
    title: <HeaderCell title="Product ID" />,
    dataIndex: "id",
    key: "id",
    width: 100,
    render: (value: string) => <Text className="text-sm">{value}</Text>,
  },
  {
    title: <HeaderCell title="Product" />,
    dataIndex: "product",
    key: "product",
    width: 200,
    hidden: "customer",
    render: (_: string, row: any) => (
      <AvatarCard
        src={row.image}
        name={row.name}
        description={row.category}
        avatarProps={{
          name: row.name,
          size: "lg",
          className: "rounded-full",
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Description" />,
    dataIndex: "description",
    key: "description",
    width: 250,
    render: (value: string) => <Text className="text-sm">{value}</Text>,
  },
  {
    title: (
      <HeaderCell
        title="Date"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "dueDate"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("dateAdded"),
    dataIndex: "dateAdded",
    key: "dateAdded",
    width: 150,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "price"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("price"),
    dataIndex: "price",
    key: "price",
    width: 120,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },
  {
    title: <HeaderCell title="Seller Information" />,
    dataIndex: "seller",
    key: "seller",
    width: 250,
    hidden: "customer",
    render: (_: string, row: any) => (
      <AvatarCard
        src={row?.seller["profile"]}
        name={row?.seller["name"]}
        description={row?.seller["contact"]}
        avatarProps={{
          name: row.name,
          size: "lg",
          className: "rounded-full",
        }}
      />
    ),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 150,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        {!showFields && (
          <Tooltip
            size="sm"
            content={"Edit Product"}
            placement="top"
            color="invert"
          >
            {/* <Link href={routes.eCommerce.ediProduct(row.id)}> */}
            <Link href={`/product/${row.id}/edit`}>
              <ActionIcon
                size="sm"
                variant="outline"
                aria-label={"Edit Product"}
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
        )}
        <Tooltip
          size="sm"
          content={"View Product"}
          placement="top"
          color="invert"
        >
          {/* <Link href={routes.eCommerce.productDetails(row.id)}> */}
          <Link href={`/product/${row.id}`}>
            <ActionIcon size="sm" variant="outline" aria-label={"View Product"}>
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        {!showFields && (
          <DeletePopover
            title={`Delete the product`}
            description={`Are you sure you want to delete this #${row.id} product?`}
            onDelete={() => onDeleteItem(row.id)}
          />
        )}
      </div>
    ),
  },
];

export const getOrderTableColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: <HeaderCell title="Order ID" />,
    dataIndex: "id",
    key: "id",
    width: 100,
    render: (value: string) => <Text className="text-sm">{value}</Text>,
  },
  {
    title: <HeaderCell title="Customer" />,
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'id',
    width: 300,
    hidden: 'customer',
    render: (_: any, row: any) => (
      <AvatarCard
        src={row.avatar}
        name={row.name}
        description={row.email.toLowerCase()}
      />
    ),
  },
  {
    title: <HeaderCell title="Product details" />,
    dataIndex: "product",
    key: "product",
    width: 150,
    hidden: "customer",
    render: (_: string, row: any) => (
      <AvatarCard
        // src={row['product'].image}
        src={
          "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp"
        }
        name={row["product"].product_title}
        description={row["product"].category}
        avatarProps={{
          name: row["product"].product_title,
          size: "lg",
          className: "rounded-full",
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Seller details" />,
    dataIndex: "seller",
    key: "seller",
    width: 150,
    hidden: "customer1",
    render: (_: string, row: any) => (
      <AvatarCard
        src={row["seller"].seller_image}
        name={row["seller"].seller_name}
        // description={row.product.category}
        avatarProps={{
          name: row["seller"].seller_name,
          size: "lg",
          className: "rounded-full",
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Buyer details" />,
    dataIndex: "buyer",
    key: "buyer",
    width: 200,
    hidden: "customer2",
    render: (_: string, row: any) => (
      <AvatarCard
        src={row["buyer"].buyer_image}
        name={row["buyer"].buyer_name}
        // description={row.product.category}
        avatarProps={{
          name: row["buyer"].buyer_id,
          size: "lg",
          className: "rounded-full",
        }}
      />
    ),
  },
  {
    title: (
      <HeaderCell
        title="Date"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "dueDate"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("order_date"),
    dataIndex: "order_date",
    key: "order_date",
    width: 150,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },
  {
    title: <HeaderCell title="Payment method" />,
    dataIndex: "payment_method",
    key: "payment_method",
    width: 120,
    render: (value: string) => <Text className="text-sm">{value}</Text>,
  },
  {
    title: <HeaderCell title="Delivery address" />,
    dataIndex: "delivery_address",
    key: "delivery_address",
    width: 120,
    render: (value: string) => <Text className="text-sm">{value}</Text>,
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 150,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={"Edit Product"}
          placement="top"
          color="invert"
        >
          <Link href={routes.products.ediProduct(row.id)}>
            <ActionIcon size="sm" variant="outline" aria-label={"Edit Product"}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={"View Product"}
          placement="top"
          color="invert"
        >
          <Link href={routes.products.productDetails(row.id)}>
            <ActionIcon size="sm" variant="outline" aria-label={"View Product"}>
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this #${row.id} product?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];

export const getCategoiresTableColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: <HeaderCell title="Category ID" />,
    dataIndex: "category_id",
    key: "category_id",
    // width: 100,
    render: (value: string) => <Text className="text-sm">{value}</Text>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: "name",
    key: "name",
    // width: 200,
    hidden: "customer",
    render: (_: string, row: any) => (
      <AvatarCard
        src={row.image}
        name={row.name}
        description={row.description}
        avatarProps={{
          name: row.category_id,
          size: "lg",
          className: "rounded-full",
        }}
      />
    ),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    // width: 200,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={"Edit Product"}
          placement="top"
          color="invert"
        >
          <Link href={routes.category.editCategory(row.id)}>
            <ActionIcon size="sm" variant="outline" aria-label={"Edit Product"}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={"View Product"}
          placement="top"
          color="invert"
        >
          <Link href={routes.category.categoryDetails(row.id)}>
            <ActionIcon size="sm" variant="outline" aria-label={"View Product"}>
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the product`}
          description={`Are you sure you want to delete this #${row.id} category?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
