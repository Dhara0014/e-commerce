// /* eslint-disable @typescript-eslint/no-unused-vars */
// import ReactQuill, { type ReactQuillProps } from 'react-quill';
// import { FieldError } from 'rizzui';
// import cn from '@/utils/class-names';
// import 'react-quill/dist/quill.snow.css';

// interface QuillEditorProps extends ReactQuillProps {
//   error?: string;
//   label?: React.ReactNode;
//   className?: string;
//   labelClassName?: string;
//   errorClassName?: string;
//   toolbarPosition?: 'top' | 'bottom';
// }

// export default function QuillEditor({
//   id,
//   label,
//   error,
//   className,
//   labelClassName,
//   errorClassName,
//   toolbarPosition = 'top',
//   ...props
// }: QuillEditorProps) {
//   const quillModules = {
//     toolbar: [
//       // [{ header: [1, 2, 3, 4, 5, 6, false] }],

//       ['bold', 'italic', 'underline', 'strike'], // toggled buttons
//       ['blockquote', 'code-block'],

//       [{ list: 'ordered' }, { list: 'bullet' }],
//       [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
//       [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

//       [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//       [{ font: [] }],
//       [{ align: [] }],

//       ['clean'],
//     ],
//   };

//   // const quillFormats = [
//   //   'header',
//   //   'bold',
//   //   'italic',
//   //   'underline',
//   //   'strike',
//   //   'list',
//   //   'bullet',
//   //   'blockquote',
//   //   'code-block',
//   //   'script',
//   //   'indent',
//   //   'color',
//   //   'background',
//   //   'font',
//   //   'align',
//   // ];

//   return (
//     <div className={cn(className)}>
//       {label && (
//         <label className={cn('mb-1.5 block', labelClassName)}>{label}</label>
//       )}
//       <ReactQuill
//         modules={quillModules}
//         // formats={quillFormats}
//         className={cn(
//           'react-quill',
//           toolbarPosition === 'bottom' && 'react-quill-toolbar-bottom relative',
//           className
//         )}
//         {...props}
//       />
//       {error && (
//         <FieldError size="md" error={error} className={errorClassName} />
//       )}
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea, FieldError } from 'rizzui';
import cn from '@/utils/class-names';

interface TextareaEditorProps {
  error?: string;
  label?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean |any;
  placeholder?: string;
  disabled?: boolean;
}

export default function TextareaEditor({
  id,
  label,
  placeholder,
  error,
  className,
  labelClassName,
  errorClassName,
  value,
  onChange,
  disabled,
  readOnly=false,
  ...props
}: TextareaEditorProps) {
  return (
    <div className={cn(className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(`mb-1.5 block text-sm ${readOnly ? 'text-gray-200' : 'font-medium'}`, labelClassName)}
        >
          {label}
        </label>
      )}
      <Textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        // className={cn(className)}
        className={cn(
          'w-full',
          readOnly ? 'bg-gray-200 text-gray-200 cursor-not-allowed' : '',
          className
        )}
        {...props}
        error={error}
      />
      {/* {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )} */}
    </div>
  );
}
