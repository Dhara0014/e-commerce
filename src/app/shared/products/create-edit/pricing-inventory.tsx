/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cn from "@/utils/class-names";
import { usePathname } from "next/navigation";
import FormGroup from "./form-group";
import CustomerInfo from "@/app/(hydrogen)/order/order-form/customer-info";
import { Controller, useFormContext } from "react-hook-form";
import useUser from "@/hooks/use-user";
import { Select } from "rizzui";
import { capitalizeFirstLetter } from "@/components/ui/avatar-card";

interface PricingInventoryProps {
  className?: string;
  viewComp?: boolean;
  cancle?: boolean;
}

export default function PricingInventory({
  className,
  viewComp,
}: PricingInventoryProps) {
  const pathname = usePathname();
  const viewComponent = pathname?.includes("/view");
    const {
      register,
      control,
      formState: { errors },
    } = useFormContext();
    const {usersForProduct, isLoading} = useUser();    
  return (
    <div>
      <FormGroup
        title="Seller Information"
        // description="Add your product pricing here"
        className={cn(className)}
      >
{
  viewComponent ? <CustomerInfo /> : 
  <Controller
  name="user"
  control={control}
  render={({ field: { onChange, value } }) => (
    <Select
      placeholder="Select Seller"
      options={usersForProduct?.map((itm: any) => ({
        label: capitalizeFirstLetter(`${itm?.firstName} ${itm?.lastName}`),
        value: itm?.id,
      }))}
      value={value}
      // value={capitalizeFirstLetter(value)}
      onChange={onChange}
      label=""
      error={errors?.user?.message as string}
      disabled={viewComp || isLoading}
    />
  )}
/>
}
  </FormGroup>
    </div>
  );
}
