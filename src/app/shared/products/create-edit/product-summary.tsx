/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';
import {
  // categoryOption,
  conditionOption,
  shipping_option,
} from './form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
import FormGroup from './form-group';
import { Input, MultiSelect } from 'rizzui';
// import CustomerInfo from '../../../(hydrogen)/order/order-form/customer-info';
import useCategory from '@/hooks/use-category';
import { useState } from 'react';
const Select = dynamic(
  () => import('rizzui').then((mod) => mod.Select),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className, viewComp, cancle }: { className?: string, viewComp?: Boolean | any, cancle?:boolean}) {
  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
    watch
  } = useFormContext();
  const {isLoading, categoriesForProduct} = useCategory();  
  const [remainingOptions, setRemainingOptions] = useState(shipping_option);
  const selectedShippingOptions = watch('shippingOption') || [];

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      setValue('shippingOption', [...selectedShippingOptions, selectedOption]);
      // Remove selected option from the remaining options
      setRemainingOptions((prev) =>
        prev.filter((option) => option.value !== selectedOption.value)
      );
    }
  };
  return (
    <FormGroup
      title="Summary"
      description="Edit your product description and necessary information from here"
      className={cn(className)}
    >

      <Controller
        control={control}
        name="title"
        render={({ field }) => (
        <Input
        label="Product title"
        placeholder="Product title"
        {...register('title')}
        error={errors.title?.message as string}
        disabled={viewComp || isLoading}
        />
        )}
        />
          
      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
          placeholder='Select Product Category'
            options={!isLoading && categoriesForProduct?.map((itm:any)=> ({
                label: itm?.title,
                value: itm?.id
              }))|| []}
            value={value}
            onChange={onChange}
            label="Categories"
            error={errors?.categories?.message as string}
            // getOptionValue={(option) => option.value}
            disabled={viewComp || isLoading}
          />
        )}
      />

     <Controller
        name="condition"
        control={control}
        render={({ field: { onChange, value } }) => {  
          return <Select
            placeholder='Select Product Condition'
            options={conditionOption}
            value={value}
            onChange={onChange}
            label="Condition"
            error={errors?.condition?.message as string}
            // getOptionValue={(option) => option.value}
            disabled={viewComp || isLoading}
          />
        }}
      />

          <Input
            label="Price"
            type='number'
            placeholder="Product price"
            step="any"
            {...register('price', {
              // required: 'Price is required',
              // valueAsNumber: true,
              // validate: (value) =>
              //   value >= 0 || 'Price must be a positive number',
            })}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value && Number(target.value) < 0) {
                target.value = '0';
              }
            }}
            error={errors.price?.message as string}
            disabled={viewComp || isLoading}
          />

          <Controller
            // name="shipingOption"
            {...register('shippingOption')}
            control={control}
            render={({ field: { onChange, value } }) => {   
              return <MultiSelect
                placeholder='Select Shipping Option'
                options={shipping_option}
                value={value}
                onChange={onChange}
                label="Shipping"
                clearable={true}
                onClear={() => setValue("shippingOption",[])}
                error={errors?.shippingOption?.message as string}
                // getOptionValue={(option) => option.value}
                disabled={viewComp || isLoading}
              />
            }}
        />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Description"
            placeholder='Product Description'
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            // readOnly={viewComp}
            disabled={viewComp || isLoading}
            error={errors?.description?.message as  string}
          />
        )}
      />
    </FormGroup>
  );
}
