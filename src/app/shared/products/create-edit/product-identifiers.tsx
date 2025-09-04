/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';
import CustomFields from './custom-fields';
import FormGroup from './form-group';
import { Input } from 'rizzui';

interface ProductIdentifiersProps {
  className?: string;
  viewComp?: Boolean | any;
}

export default function ProductIdentifiers({
  className, viewComp
}: ProductIdentifiersProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Product Identifiers"
      description="Edit your product identifiers here"
      className={cn(className)}
    >
      <Input
        label="Global Trade Item Number"
        placeholder="12345"
        {...register('tradeNumber')}
        error={errors.tradeNumber?.message as string}
        disabled={viewComp}
      />
      <Input
        label="Manufacturer Part Number"
        placeholder="145782"
        {...register('manufacturerNumber')}
        error={errors.manufacturerNumber?.message as string}
        disabled={viewComp}
      />
      <Input
        label="Brand Name"
        placeholder="brand name"
        {...register('brand')}
        error={errors.brand?.message as string}
        disabled={viewComp}
      />
      <Input
        label="Product UPC/EAN "
        placeholder="145782"
        {...register('upcEan')}
        error={errors.upcEan?.message as string}
        disabled={viewComp}
      />
      {!viewComp && <CustomFields />}
    </FormGroup>
  );
}
