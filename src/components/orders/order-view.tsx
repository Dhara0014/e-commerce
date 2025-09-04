/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import { useAtomValue } from "jotai";
import isEmpty from "lodash/isEmpty";
import { PiCheckBold } from "react-icons/pi";
import {
  billingAddressAtom,
  orderNoteAtom,
  shippingAddressAtom,
} from "@/store/checkout";
import OrderViewProducts from "./order-products/order-view-products";
// import { useCart } from '@/store/quick-cart/cart.context';
import { toCurrency } from "@/utils/to-currency";
import { formatDate, formatDateTime } from "@/utils/format-date";
import usePrice from "@/hooks/use-price";
import cn from "@/utils/class-names";
import { Avatar, Button, Text, Title } from "rizzui";
import useOrder from "@/hooks/use-order";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { CancleOrderPopover } from "../ui/delete-popover";

const orderStatus = [
  { id: 1, label: "Ordered" },
  // { id: 2, label: "Payment processed and held" },
  { id: 3, label: "Item send" },
  { id: 4, label: "Item in transit" },
  { id: 5, label: "Item deliverd" },
  { id: 6, label: "Item approved" },
  { id: 7, label: "Payment released" },
  { id: 8, label: "Payment received" },
  { id: 9, label: "Refunded" },
  { id: 10, label: "Cancelled" },
];

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "item in transit":
    case "item sent":
      return (
        <span className="my-2 ms-5 rounded-3xl border-r border-muted bg-orange-lighter px-3 py-1 text-xs text-orange-dark first:ps-0 last:border-r-0">
          {status}
        </span>
      );
    case "ordered":
    case "item delivered":
    case "payment received":
    case "delivered":
      return (
        <span className="my-2 ms-5 rounded-3xl border-r border-muted bg-green-lighter px-3 py-1 text-xs text-green-dark first:ps-0 last:border-r-0">
          {status}
        </span>
      );
    case "payment released":
    case "item approved":
      return (
        <span className="my-2 ms-5 rounded-3xl border-r border-muted bg-yellow-lighter px-3 py-1 text-xs text-yellow-dark first:ps-0 last:border-r-0">
          {status}
        </span>
      );
    case "refunded":
      return (
        <span className="my-2 ms-5 rounded-3xl border-r border-muted bg-blue-lighter px-3 py-1 text-xs text-blue-dark first:ps-0 last:border-r-0">
          {status}
        </span>
      );
    case "cancelled":
      return (
        <span className="my-2 ms-5 rounded-3xl border-r border-muted bg-red-lighter px-3 py-1 text-xs text-red-dark first:ps-0 last:border-r-0">
          {status}
        </span>
      );
    default:
      return (
        <span className="my-2 ms-5 rounded-3xl border-r border-muted bg-gray-lighter px-3 py-1 text-xs text-gray-dark first:ps-0 last:border-r-0">
          {status}
        </span>
      );
  }
}

function WidgetCard({
  title,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  childrenWrapperClass?: string;
}) {
  return (
    <div className={className}>
      <Title
        as="h3"
        className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
      >
        {title}
      </Title>
      <div
        className={cn(
          "rounded-lg border border-muted px-5 @sm:px-7 @5xl:rounded-xl",
          childrenWrapperClass
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function OrderView({ data }: { data: any }) {
  const { cancleOrder, isLoading } = useOrder();
  const router = useRouter();

  // const currentOrderStatus = data?.shipping_status == 'Ordered' ? 1 : data?.shipping_status == 'Ordered';
  const currentOrderStatus = orderStatus?.filter(
    (itm) => itm.label?.toLowerCase() == data?.shipping_status?.toLowerCase()
  )[0]?.id;
  const orderNote = useAtomValue(orderNoteAtom);
  const billingAddress = useAtomValue(billingAddressAtom);
  const shippingAddress = useAtomValue(shippingAddressAtom);

  const cancleOrderHandler = async () => {
    const response = await cancleOrder({ orderCode: data?.order_code });
    if (response) {
      router.push(routes.orders.order);
    }
  };

  return (
    <div className="@container">
      <div className="flex flex-wrap justify-between border-b border-t border-gray-300 py-4 font-medium text-gray-700">
        <span className="my-2 border-r border-muted px-3 py-0.5 first:ps-0 last:border-r-0">
          OrderID #{data?.order_code}
        </span>
        <span className="my-2 border-r border-muted px-3 py-0.5 first:ps-0 last:border-r-0">
          {formatDate(new Date(data?.order_date), "MMMM D, YYYY")} at{" "}
          {formatDate(new Date(data?.order_date), "h:mm A")}
        </span>
        <>{getStatusBadge(data?.shipping_status)}</>
        <div className="ml-auto mt-2 sm:mt-0">
          {data?.shipping_status !== "Refunded" &&
            data?.shipping_status !== "Cancelled" && (
              <CancleOrderPopover
                title={`Cancel Order`}
                description={`Are you sure you want to cancel this order?`}
                onDelete={cancleOrderHandler}
                isLoading={isLoading}
              />
            )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center border-b border-t border-gray-300 py-4 font-medium text-gray-700 @5xl:justify-start">
        <span className="my-2 border-r border-muted px-3 py-0.5 first:ps-0 last:border-r-0">
          Shipping Method {data?.shipping_method}
        </span>
        <span className="my-2 border-r border-muted px-3 py-0.5 first:ps-0 last:border-r-0">
          Shipping Tracking Number {data?.shipping_tracking_number ?? "N/A"}
        </span>
        <span className="my-2 border-r border-muted px-3 py-0.5 first:ps-0 last:border-r-0">
          {1} Item
        </span>
        <span className="my-2 border-r border-muted px-3 py-0.5 first:ps-0 last:border-r-0">
          Total {toCurrency(data?.total_amount)}.00
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-3 md:grid-cols-2">
        <WidgetCard
          title="Seller Details"
          childrenWrapperClass="py-5 @5xl:py-8 flex h-[120px] items-center"
        >
          <div className=" relative aspect-square  shrink-0 @5xl:h-20 @5xl:w-20">
            <Avatar
              src={data?.user?.profile}
              // className="object-cover rounded-full  h-full"
              className="object-cover h-20"
              size="xl"
              name="customer"
              // rounded="full"
              customSize={"(max-height: 10px)"}
            />
          </div>
          <div className="ps-4 @5xl:ps-6">
            <Title
              as="h3"
              className="mb-0 text-base font-semibold @7xl:text-lg"
            >
              {data?.user?.name}
            </Title>
            <Text as="p" className="mb-2 break-all last:mb-0">
              {data?.user?.email}
            </Text>
          </div>
        </WidgetCard>
        <WidgetCard
          title="Buyer Details"
          childrenWrapperClass="py-5 @5xl:py-8 flex h-[120px] items-center"
        >
          <div className="relative aspect-square h-18 w-18 shrink-0 @5xl:h-20 @5xl:w-20">
            <Avatar
              src={data?.seller?.profile}
              // className="object-cover h-full rounded-full"
              className=" object-cover h-20 "
              size="xl"
              name="seller"
              // rounded="full"
              customSize={"(max-height: 10px)"}
            />
          </div>
          <div className="ps-4 @5xl:ps-6">
            <Title
              as="h3"
              className="mb-0 text-base font-semibold @7xl:text-lg"
            >
              {data?.seller?.name}
            </Title>
            <Text as="p" className="mb-2 break-all last:mb-0">
              {data?.seller?.email}
            </Text>
          </div>
        </WidgetCard>
        <WidgetCard
          title="Payment Mode"
          childrenWrapperClass="@5xl:py-6 py-5 h-[120px] items-center"
        >
          <div>
            <span className="font-semibold">Trasaction ID</span> :{" "}
            {data?.payment_transaction_id}
          </div>
          <div>
            <span className="font-semibold">Payment Method</span> : TX001
          </div>
        </WidgetCard>
       <WidgetCard
          title="Seller's Address"
          childrenWrapperClass="@5xl:py-6 py-5 h-[120px] items-center"
          className="mt-4"
        >
          <Title
            as="h3"
            className="mb-2.5 text-base font-semibold @7xl:text-lg"
          ></Title>
          <Text as="p" className="mb-2 leading-loose last:mb-0">
            {data?.seller?.address}
          </Text>
        </WidgetCard>
        <WidgetCard
          title="Buyer's Address"
          className="mt-4"
          childrenWrapperClass="@5xl:py-6 py-5 h-[120px] items-center"
        >
          <Title
            as="h3"
            className="mb-2.5 text-base font-semibold @7xl:text-lg"
          ></Title>
          <Text as="p" className="mb-2 leading-loose last:mb-0">
            {data?.user?.address}
          </Text>
        </WidgetCard>


       <WidgetCard
          title="Shipping Details"
          childrenWrapperClass="@5xl:py-6 py-5 h-[120px] items-center"
          className="mt-4"
        >
          <Title
            as="h3"
            className="mb-2.5 text-base font-semibold @7xl:text-lg"
          ></Title>
          <Text as="p" className="mb-2 leading-loose last:mb-0">
            {data?.shipping_address}
          </Text>
        </WidgetCard>

        
      </div>

      <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
          {orderNote && (
            <div className="">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Notes About Order
              </span>
              <div className="rounded-xl border border-muted px-5 py-3 text-sm leading-[1.85]">
                {orderNote}
              </div>
            </div>
          )}

          <div className="pb-5">
            <OrderViewProducts data={data?.products} />
            <div className="border-t border-muted pt-7 @5xl:mt-3">
              <div className="ms-auto max-w-lg space-y-6">
                <div className="flex justify-between font-medium">
                  Sub Total <span>{toCurrency(data?.total_amount)}.00</span>
                </div>
                {/* <div className="flex justify-between font-medium">
                  Store Credit <span>{toCurrency(0)}</span>
                </div> */}
                <div className="flex justify-between font-medium">
                  Shipping Fee <span>{toCurrency(data?.shipping_fee)}</span>
                </div>
                <div className="flex justify-between border-t border-muted pt-5 text-base font-semibold">
                  Total <span>{toCurrency(data?.total_amount)}.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
          <WidgetCard
            title="Order Status"
            childrenWrapperClass="py-5 @5xl:py-8 flex"
          >
            <div className="ms-2 w-full space-y-5 border-s-2 border-gray-100">
              {orderStatus.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative ps-6 text-sm font-medium before:absolute before:-start-[9px] before:top-px before:h-4 before:w-4 before:-translate-x-px before:rounded-full before:bg-gray-100 before:content-[''] after:absolute after:-start-[2px] after:top-4  after:h-11 after:w-0.5  after:content-[''] last:after:hidden",
                    currentOrderStatus > item.id
                      ? "before:bg-primary after:bg-primary"
                      : "after:hidden",
                    currentOrderStatus === item.id && "before:bg-primary"
                  )}
                >
                  {/* {currentOrderStatus >= item.id ? (
                    <span className="absolute -start-1.5 top-1 text-white">
                      <PiCheckBold className="h-auto w-3" />
                    </span>
                  ) : null} */}

                  <div
                    className={`${item.id == currentOrderStatus ? "font-bold" : ""}`}
                  >
                    {item.label}
                  </div>
                  {item.id == currentOrderStatus && (
                    <div>{formatDateTime(data?.order_date)}</div>
                  )}
                </div>
              ))}
            </div>
          </WidgetCard>

          {/* <WidgetCard
  title="Order Status"
  childrenWrapperClass="py-5 @5xl:py-8 flex"
>
  <div className="ms-2 w-full space-y-4 relative">
    {orderStatus.map((item, index) => (
      <div
        key={item.id}
        className={cn(
          "relative ps-6 text-sm font-medium before:absolute before:-start-[10px] before:top-2 before:h-3.5 before:w-3.5 before:rounded-full before:content-[''] after:absolute after:-start-[5px] after:top-5 after:h-11 after:w-0.5 after:bg-gray-200 last:after:hidden",
          currentOrderStatus > item.id
            ? "before:bg-primary after:bg-primary"
            : "before:bg-gray-300",
          currentOrderStatus === item.id && "font-bold text-black"
        )}
      >
        <div>{item.label}</div>
        {item.id === 1 && (
          <div className="text-gray-400 text-xs mt-1">01/03/2024 4:00 PM</div>
        )}
      </div>
    ))}
  </div>
</WidgetCard> */}

          {!isEmpty(shippingAddress) && (
            <WidgetCard
              title="Billing Address"
              childrenWrapperClass="@5xl:py-6 py-5"
            >
              <Title
                as="h3"
                className="mb-2.5 text-base font-semibold @7xl:text-lg"
              >
                {shippingAddress?.customerName}
              </Title>
              <Text as="p" className="mb-2 leading-loose last:mb-0">
                {shippingAddress?.street}, {shippingAddress?.city},{" "}
                {shippingAddress?.state}, {shippingAddress?.zip},{" "}
                {shippingAddress?.country}
              </Text>
            </WidgetCard>
          )}
        </div>
      </div>
    </div>
  );
}
