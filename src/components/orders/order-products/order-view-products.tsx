/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Image from 'next/image';
import Table, { HeaderCell } from '@/components/ui/table';
import { useCart } from '@/store/quick-cart/cart.context';
import { toCurrency } from '@/utils/to-currency';
import { CartItem } from '@/types';
import { Avatar, Text, Title } from 'rizzui';

const columns = [
  {
    title: <HeaderCell title="Product" />,
    dataIndex: 'product',
    key: 'product',
    width: 250,
    render: (_: any, row: CartItem) => {      
      return <div className="flex items-center">
        <div className="relative aspect-square w-12 overflow-hidden rounded-lg">
          <Avatar 
            src={row?.Images[0]?.name}
            className="object-cover"
            size="lg"
            name="customer"
            rounded="md"
          />
        </div>
        <div className="ms-4">
          <Title as="h6" className="!text-sm font-medium">
            {row?.title}
          </Title>
          <Text>{row?.category?.title}</Text>
        </div>
      </div>
    },
  },
  // {
  //   title: <HeaderCell title="Product Price" align="right" />,
  //   dataIndex: 'price',
  //   key: 'price',
  //   width: 200,
  //   render: (price: string) => (
  //     <Text className="text-end text-sm">{toCurrency(price)}</Text>
  //   ),
  // },
  // {
  //   title: <HeaderCell title="Quantity" align="center" />,
  //   dataIndex: 'quantity',
  //   key: 'quantity',
  //   width: 150,
  //   render: (quantity: number) => (
  //     <Text className="text-center text-sm font-semibold">{quantity}</Text>
  //   ),
  // },

  {
    title: <HeaderCell title="Price" align="right" />,
    dataIndex: 'price',
    key: 'price',
    width: 200,
    render: (price: number, row: any) => {      
      return <Text className="text-end text-sm">
        {/* {toCurrency(price * row.quantity)} */}
        {toCurrency(price)}
      </Text>
    },
  },
];

export default function OrderViewProducts({data}:{data:any}) {
  const result:any = useCart();
  return (
    <Table
    data={data}
      // @ts-ignore
      columns={columns}
      className="text-sm"
      variant="minimal"
      // rowKey={(record) => console.log("record >>", record)}
      scroll={{ x: 800 }}
    />
  );
}
