/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import { Input } from "rizzui";

export default function ProductPricing({dealComponent, viewComp}: {dealComponent: any, viewComp: any}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Input
        label="Price"
        className="w-full"
        placeholder="10"
        {...register("price")}
        error={errors.price?.message as string}
        prefix={"$"}
        type="number"
        disabled={dealComponent?.dealComponent || viewComp}
      />
      <Input
        label="Cost Price"
        placeholder="15"
        {...register("costPrice")}
        error={errors.costPrice?.message as string}
        prefix={"$"}
        type="number"
        disabled={viewComp}
      />
      <Input
        label="Retail Price"
        placeholder="10"
        {...register("retailPrice")}
        error={errors.retailPrice?.message as string}
        prefix={"$"}
        type="number"
        disabled={viewComp}
      />
      <Input
        label="Sale Price"
        placeholder="20"
        {...register("salePrice")}
        error={errors.salePrice?.message as string}
        prefix={"$"}
        type="number"
        disabled={viewComp}
      />
    </>
  );
}
