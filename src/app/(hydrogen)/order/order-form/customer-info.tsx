/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';
import { Avatar, Text, Title } from 'rizzui';
import { capitalizeFirstLetter } from '@/components/ui/avatar-card';

interface CustomerInfoProps {
  className?: string;
}

export default function CustomerInfo({ className }: CustomerInfoProps) {
  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = useFormContext();  

  return (
    <div
      className={cn(
        'pb-7 pt-0 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3',
        className
      )}
    >
      <div className="rounded-xl border border-gray-300 p-5 @sm:p-6 @md:p-7">
        <div className="relative  border-gray-300 pb-0">
          {/* <Title as="h6" className="mb-6">
            Customer Info
          </Title> */}
          <div className="flex">
            <div className="relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-full @5xl:h-20 @5xl:w-20">
              <Avatar
              name='customer-profile'
                src={getValues('customer_profileImage') ||
                  'https://isomorphic-furyroad.s3.amazonaws.com/public/avatar.png'
                }
                // size='xl'
                customSize="(max-width: 768px) 100vw"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ps-4 @5xl:ps-6">
              <Title as="h6" className="mb-0 font-semibold">
                {capitalizeFirstLetter(getValues('customer_name'))}
              </Title>
              <Text as="p" className="mb-2 break-all last:mb-0">
                {getValues('customer_email')}
              </Text>
              {/* <Text as="p" className="mb-2 last:mb-0">
                New York, USA
              </Text> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Payment method option
const paymentOptions = [
  {
    value: 'paypal',
    label: 'PayPal',
  },
  {
    value: 'skrill',
    label: 'Skrill',
  },
  {
    value: 'visa',
    label: 'Visa',
  },
  {
    value: 'mastercard',
    label: 'Mastercard',
  },
];

// shipping option
const shippingOption = [
  {
    value: 'ups',
    label: 'UPS',
  },
  {
    value: 'usps',
    label: 'USPS',
  },
  {
    value: 'fedex',
    label: 'FedEx',
  },
];
