/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { useFormContext } from 'react-hook-form';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import FormGroup from './form-group';
import cn from '@/utils/class-names';

interface ProductMediaProps {
  className?: string;
  viewComp?: boolean;
  cancle?: boolean;
  removedImages?:any;
  setRemovedImages?: any;
}

export default function ProductMedia({ className, viewComp, cancle, removedImages, setRemovedImages }: ProductMediaProps) {
  const { getValues, setValue,formState: { errors }, } = useFormContext();  
  return (
    <FormGroup
      title="Product images"
      // description="Upload your product image gallery here"
      className={cn(className)}
    >
      <UploadZone
        className="col-span-full"
        name="images"
        getValues={getValues}
        setValue={setValue}
        disabled={viewComp}
        error={errors?.images?.message}
        show={!viewComp}
        cancle={cancle}
        setRemovedImages={setRemovedImages}
        removedImages={removedImages}
      />
    </FormGroup>
  );
}
