/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';
import FormGroup from './form-group';
import { Input } from 'rizzui';

export default function ProductSeo({ className, viewComp }: { className?: string,viewComp?: Boolean|any }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Search Engine Optimization"
      description="Add your product's seo info here"
      className={cn(className)}
    >
      <Input
        label="Page Title"
        placeholder="page title"
        {...register('pageTitle')}
        error={errors.pageTitle?.message as string}
        disabled={viewComp}
      />
      <Input
        label="Meta Keywords"
        placeholder="meta keywords"
        {...register('metaKeywords')}
        error={errors.metaKeywords?.message as string}
        disabled={viewComp}
      />
      <Input
        label="Meta Description"
        placeholder="meta description"
        {...register('metaDescription')}
        error={errors.metaDescription?.message as string}
        disabled={viewComp}
      />
      <Input
        label="Product URL"
        type="url"
        placeholder="https://"
        {...register('productUrl')}
        error={errors.productUrl?.message as string}
        disabled={viewComp}
      />
      
    </FormGroup>
  );
}
