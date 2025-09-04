/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import isEmpty from 'lodash/isEmpty';
import prettyBytes from 'pretty-bytes';
import { useCallback, useEffect, useRef, useState } from 'react';
// import type { FileWithPath } from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react/hooks';
import { PiCheckBold, PiTrashBold, PiUploadSimpleBold } from 'react-icons/pi';
import {
  // UploadFileResponse,
  generateClientDropzoneAccept,
} from 'uploadthing/client';
import { useUploadThing } from '@/utils/uploadthing';
import cn from '@/utils/class-names';
import UploadIcon from '@/components/shape/upload';
import { endsWith } from 'lodash';
import { Button, Text , FieldError} from 'rizzui';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface UploadZoneProps {
  label?: string;
  name: string;
  getValues: any;
  setValue: any;
  className?: string;
  error?: string| any;
  viewComp?: boolean;
  disabled?: boolean;
  show?: boolean;
  preview?: string,
  setPreview?: any,
  cancle ?: boolean;
  removedImages?: any;
  setRemovedImages?:any;
}

interface FileType {
  name: string;
  url: string;
  size: number;
  viewComp?: Boolean | any;
}

//new
// import React, { useState, useEffect } from "react";

// interface UploadZoneProps {
//   name: string;
//   label: string;
//   getValues: () => any; // Function to get the current field value from Formik
//   setValue: (fieldName: string, fieldValue: any) => void; // Function to set the Formik field value
//   error?: string; // Optional error message
// }

const UploadZone: React.FC<UploadZoneProps> = ({
  name,
  label,
  getValues,
  setValue,
  error,
  disabled,
  show,
  removedImages,
  setRemovedImages,
  cancle,
  preview,
  setPreview,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<any[] | any>([]);
  const [addFile, setAddFile] = useState<File[]>([]); // Array for file objects

  async function getFileFromUrl(url: any, name: any, defaultType = 'image/jpeg') {
    const corsProxyUrl = "https://api.allorigins.win/raw?url=";
    const res = await fetch(corsProxyUrl + encodeURIComponent(url));
    const blob = await res.blob();
    const file = new File([blob], name, { type: blob.type });
    setValue(name, file);
  }
  useEffect(() => {
    // const currentValue = getValues();
    const currentImages = getValues(name);
    const getData = async () => {
    //   if (typeof currentValue === "object" && currentValue?.images) {
    //     setPreviews(currentValue?.images);
    //     const convertFile = currentValue?.images?.split("/");
    //     await getFileFromUrl(currentValue?.images, convertFile[convertFile?.length - 1] || "image.png");
    //   } else {
    //     setPreviews(currentValue?.images);
    //   }
    // };
    // getData();

    if (Array.isArray(currentImages)) {
      // Filter URLs or files and generate previews
      const newPreviews = currentImages.map((image) =>
        typeof image === "string" ? image : URL.createObjectURL(image)
      );
      setPreviews(newPreviews);
    } 
     else if (typeof currentImages === "object" && currentImages?.images) {
          setPreviews(currentImages?.images || currentImages);
          const convertFile = currentImages?.images?.split("/");
          await getFileFromUrl(currentImages?.images, convertFile[convertFile?.length - 1] || "image.png");
          
        } 
    else {
          setPreview(currentImages?.images || currentImages);
        }
      
      }
      getData();
  }, [getValues]);

  // Reset input field when preview becomes false
  // useEffect(() => {
  //   if (!preview && inputRef.current) {
  //     inputRef.current.value = '';
  //   }
  // }, [preview]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const fileArray = Array.from(files).filter((file) => file.type.startsWith("image/"));
  
      // Set files in Form and previews
      const existingFiles = getValues(name) || [];
      if(typeof existingFiles == 'string'){
        if (files[0].type.startsWith("image/")) {
              setPreview(URL.createObjectURL(files[0]));
              setValue(name, files[0]);
            }
      }else{
        setValue(name, [...existingFiles, ...fileArray]);
    
        // Update previews
        const newPreviews = fileArray.map((file) => URL.createObjectURL(file));  
        setPreviews((prev:any) => [...prev, ...newPreviews]);

      }
    }
    // const file = event.target.files?.[0];
    // if (files && files.length > 0) {
    //   const imagePreviews: string[] = [];
    //   const fileArray: File[] = [];

    //   Array.from(files).forEach((file) => {
    //     if (file.type.startsWith("image/")) {
    //       // setPreviews([URL.createObjectURL(file), ...previews])
    //       imagePreviews.push(URL.createObjectURL(file));
    //       fileArray.push(file);
    //     } else {
    //       // Handle invalid file types
    //       console.error(`${file.name} is not a valid image file.`);
    //     }
    //   });
    //   console.log("fileArray >>", fileArray)
    //   console.log("imagePreviews >>", imagePreviews)
    //   setPreviews((pre) => [...pre, ...imagePreviews]);
    //   setAddFile((pre) => [...pre, ...fileArray]);
    //   setValue("images", [...addFile, ...fileArray]); // Save all files in Form
    // }
    // if (file) {
    //   if (file.type.startsWith("image/")) {
    //     setPreview(URL.createObjectURL(file));
    //     setValue(name, file);
    //   } else {
    //     // Display an error if the file is not an image
    //   }
    // }
  };

  const removeImage = (index: number) => {
    // Remove selected image from previews and files
    const updatedPreviews = [...previews];
    const updatedFiles = [...addFile];
    setRemovedImages([updatedPreviews[index]?.split('/product/')[1], ...removedImages])

    updatedPreviews.splice(index, 1);
    updatedFiles?.length > 0 && updatedFiles.splice(index, 1);

    setPreviews(updatedPreviews);
    updatedFiles?.length > 0 && setAddFile(updatedFiles);

    // Update Form data
    setValue(name, updatedPreviews);
    // setValue(name, updatedFiles);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-2 space-y-4">
        {/* Show all previews */}
        {/* <div className="flex flex-wrap gap-4">
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              className="w-40 h-40 rounded-md object-cover border"
            />
          ))}
        </div> */}

        {previews.length > 0 ? (
          previews.length === 1 ? (
            // If only one image, display it as a static image
            <div className="relative">
              {
                !preview ? <img
                src={previews[0]}
                alt="Preview"
                className="w-40 h-40 rounded-md object-cover"
              /> : 
              <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 rounded-md object-cover"
            />
              }
             {cancle && <button
                type="button"
                onClick={() => removeImage(0)}
                className="absolute top-2 right-2  bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center self-center"
              >
                &times;
              </button>}
            </div>
          ) : (
            // If multiple images, show the slider
            <Slider {...settings}>
              {previews.map((preview:any, index:number) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-40 h-40 rounded-md object-cover"
                  />
                  {cancle && <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>}
                </div>
              ))}
            </Slider>
          )
        ) : preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 rounded-md object-cover border"
                />
              ) : 
         (
          <p className="text-gray-500">No images uploaded yet.</p>
        )}

        {show && (
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            disabled={disabled}
            multiple // Allow multiple file uploads
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
            onChange={handleFileChange}
            className="block w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
          />
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
    // <div>
    //   <label className="block text-sm font-medium text-gray-700">{label}</label>
    //   <div className="mt-2 flex items-center space-x-4">
    //     {/* Show preview if available */}
    //     {preview && (
    //       <img
    //         src={preview}
    //         alt="Preview"
    //         className="w-40 h-40 rounded-md object-cover border"
    //       />
    //     )}

    //     {show && (
    //       <input
    //         type="file"
    //         ref={inputRef}
    //         accept="image/*"
    //         disabled={disabled}
    //         style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    //         onChange={handleFileChange}
    //         className="block w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
    //       />
    //     )}
    //   </div>
    //   {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    // </div>
  );
};

export default UploadZone;


// const data = [
//     {
//         "id": "1737551661852-nbo63p.jpg",
//         "name": "https://prelo-api.i-nextgen.com/uploads/product/1737551661852-nbo63p.jpg"
//     },
//     {
//         "id": "1737551661853-wnrvg7.gif",
//         "name": "https://prelo-api.i-nextgen.com/uploads/product/1737551661853-wnrvg7.gif"
//     }
// ]
// import React, { useRef } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface UploadZoneProps {
//   name: string;
//   label: string;
//   getValues: () => Record<string, any>;
//   setValue: (field: string, value: any) => void;
//   error?: string;
//   disabled?: boolean;
//   show: boolean;
//   setPreview: (previews: string[]) => void;
//   preview: string[];
// }

// const UploadZone: React.FC<UploadZoneProps> = ({
//   name,
//   label,
//   getValues,
//   setValue,
//   error,
//   disabled,
//   show,
//   setPreview,
//   preview,
// }) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     const validFiles = files.filter((file) => file.type.startsWith("image/"));

//     if (validFiles.length > 0) {
//       const filePreviews = validFiles.map((file) => URL.createObjectURL(file));
//       setPreview([...preview, ...filePreviews]);
//       setValue(name, [...(getValues()[name] || []), ...validFiles]);
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     const updatedPreview = preview.filter((_, i) => i !== index);
//     setPreview(updatedPreview);
//     const updatedFiles = (getValues()[name] || []).filter((_: any, i: number) => i !== index);
//     setValue(name, updatedFiles);
//   };

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <div className="mt-2">
//         {/* React Slick Slider */}
//         {data.length > 0 && (
//           <Slider {...sliderSettings} className="max-w-md">
//             {data.map((src, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={src.name}
//                   alt={`Preview ${index + 1}`}
//                   className="w-full h-40 object-cover rounded-md"
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
//                   onClick={() => handleRemoveImage(index)}
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </Slider>
//         )}

//         {show && (
//           <input
//             type="file"
//             ref={inputRef}
//             accept="image/*"
//             multiple
//             disabled={disabled}
//             style={{ cursor: disabled ? "not-allowed" : "pointer" }}
//             onChange={handleFileChange}
//             className="mt-4 block w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
//           />
//         )}
//       </div>
//       {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
//     </div>
//   );
// };

// export default UploadZone;






//2
// export default function UploadZone({
//   label,
//   name,
//   className,
//   getValues,
//   setValue,
//   error,
//   viewComp
// }: UploadZoneProps) {
//   const [files, setFiles] = useState<File[]>([]);

//   const onDrop = useCallback(
//     (acceptedFiles: any) => {
//       setFiles([
//         ...acceptedFiles.map((file:any) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         ),
//       ]);
//       // setValue([
//       //   ...acceptedFiles.map((file:any) =>
//       //     Object.assign(file, {
//       //       preview: URL.createObjectURL(file),
//       //     })
//       //   ),
//       // ])
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [files]
//   );

//   function handleRemoveFile(index: number) {
//     // Make a copy of the files array
//     const updatedFiles = [...files];

//     // Remove the file at the specified index
//     updatedFiles.splice(index, 1);

//     // Update the state
//     setFiles(updatedFiles);
//   }

//   const uploadedItems = isEmpty(getValues(name)) ? [] : getValues(name);

//   const notUploadedItems = files.filter(
//     (file) =>
//       !uploadedItems?.some(
//         (uploadedFile: FileType) => uploadedFile.name === file.name
//       )
//   );

//   const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
//     'generalMedia',
//     {
//       onClientUploadComplete: (res: any | undefined) => {
//         if (setValue) {
//           // const respondedUrls = res?.map((r) => r.url);
//           setFiles([]);
//           const respondedUrls = res?.map((r:any) => ({
//             name: r.name,
//             size: r.size,
//             url: r.url,
//           }));
//           setValue(name, files);
//         }
//         toast.success(
//           <Text as="b" className="font-semibold">
//             portfolio Images updated
//           </Text>
//         );
//       },
//       onUploadError: (error: Error) => {
//         toast.error(error.message);
//       },
//     }
//   );

//   const fileTypes = permittedFileInfo?.config
//     ? Object.keys(permittedFileInfo?.config)
//     : [];

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
//   });

//   return (
//     <div className={cn('grid @container', className)}>
//       {label && (
//         <span className="mb-1.5 block font-normal text-gray-900">
//           {label}
//         </span>
//       )}
//       <div
//         className={cn(
//           'rounded-md border-[1.8px]',
//           !isEmpty(files) &&
//             'flex flex-wrap items-center justify-between @xl:flex-nowrap @xl:pr-6'
//         )}
//       >
//         <div
//           {...getRootProps()}
//           className={cn(
//             'flex cursor-pointer items-center gap-4 px-6 py-5 transition-all duration-300',
//             isEmpty(files)
//               ? 'justify-center'
//               : 'flex-grow justify-center @xl:justify-start'
//           )}
//         >
//           <input {...getInputProps()} disabled={viewComp} />
//           <UploadIcon className="h-12 w-12" />
//           <Text className="text-base font-medium">Drop or select file</Text>
//         </div>

//         {/* {!isEmpty(files) && !isEmpty(notUploadedItems) && (
//           <UploadButtons
//             files={notUploadedItems}
//             isLoading={isUploading}
//             onClear={() => setFiles([])}
//             onUpload={() => startUpload(notUploadedItems)}
//           />
//         )}

//         {isEmpty(files) && !isEmpty(notUploadedItems) && (
//           <UploadButtons
//             files={notUploadedItems}
//             isLoading={isUploading}
//             onClear={() => setFiles([])}
//             onUpload={() => startUpload(notUploadedItems)}
//           />
//         )}

//         {!isEmpty(files) && isEmpty(notUploadedItems) && (
//           <UploadButtons
//             files={files}
//             isLoading={isUploading}
//             onClear={() => setFiles([])}
//             onUpload={() => startUpload(files)}
//           />
//         )} */}
//       </div>

//       {(!isEmpty(uploadedItems) || !isEmpty(notUploadedItems)) && (
//         <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))]">
//           {uploadedItems.map((file: any, index: number) => (
//             <div key={index} className={cn('relative')}>
//               <figure className="group relative h-40 rounded-md bg-gray-50">
//                 <MediaPreview name={file.name} url={file.url} />
//                 <button
//                   type="button"
//                   className="absolute right-0 top-0 rounded-full bg-gray-700 p-1.5 transition duration-300"
//                 >
//                   <PiCheckBold className="text-white" />
//                 </button>
//               </figure>
//               <MediaCaption name={file.name} size={file.size} />
//             </div>
//           ))}
//           {notUploadedItems.map((file: any, index: number) => (
//             <div key={index} className={cn('relative')}>
//               <figure className="group relative h-40 rounded-md bg-gray-50">
//                 <MediaPreview name={file.name} url={file.preview} />
//                 {isUploading ? (
//                   <div className="absolute inset-0 z-50 grid place-content-center rounded-md bg-gray-800/50">
//                     <LoadingSpinner />
//                   </div>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveFile(index)}
//                     className="absolute right-0 top-0 rounded-full bg-gray-700/70 p-1.5 opacity-20 transition duration-300 hover:bg-red-dark group-hover:opacity-100"
//                   >
//                     <PiTrashBold className="text-white" />
//                   </button>
//                 )}
//               </figure>
//               <MediaCaption name={file.path} size={file.size} />
//             </div>
//           ))}
//         </div>
//       )}

//       {error && <FieldError error={error} />}
//     </div>
//   );
// }

function UploadButtons({
  files,
  onClear,
  onUpload,
  isLoading,
}: {
  files: any[];
  isLoading: boolean;
  onClear: () => void;
  onUpload: () => void;
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 px-6 pb-5 @sm:flex-nowrap @xl:w-auto @xl:justify-end @xl:px-0 @xl:pb-0">
      <Button
        variant="outline"
        className="w-full gap-2 @xl:w-auto"
        isLoading={isLoading}
        onClick={onClear}
      >
        <PiTrashBold />
        Clear {files.length} files
      </Button>
      <Button
        className="w-full gap-2 @xl:w-auto"
        isLoading={isLoading}
        onClick={onUpload}
      >
        <PiUploadSimpleBold /> Upload {files.length} files
      </Button>
    </div>
  );
}

// export default function UploadZone({
//   label,
//   name,
//   className,
//   getValues,
//   setValue,
//   error,
//   viewComp
// }: UploadZoneProps) {
//   const [file, setFile] = useState<File | any>(null);

//   // Handle file drop or file selection
//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       if (acceptedFiles.length > 0) {
//         const uploadedFile = acceptedFiles[0];
//         const preview: any = URL.createObjectURL(uploadedFile);
//         setFile({ ...uploadedFile, preview });
//         setValue(name, uploadedFile);  // Store the File object in Formik
//       }
//     },
//     [setValue, name]
//   );

//   // Handle removing the uploaded file
//   function handleRemoveFile() {
//     setFile(null);
//     setValue(name, null);  // Remove value from Formik when the file is removed
//   }

//   const uploadedFile = getValues(name);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       'image/*': ['.jpg', '.jpeg', '.png'], // Restrict to image types
//     },
//     multiple: false,  // Allow only one file
//   });

//   return (
//     <div className={cn('grid @container', className)}>
//       {label && <span className="mb-1.5 block font-normal text-gray-900">{label}</span>}
      
//       <div className="rounded-md border-[1.8px] flex flex-wrap items-center justify-between @xl:flex-nowrap @xl:pr-6">
//         <div {...getRootProps()} className="flex cursor-pointer items-center gap-4 px-6 py-5 transition-all duration-300">
//           <input {...getInputProps()} disabled={viewComp} />
//           <UploadIcon className="h-12 w-12" />
//           <Text className="text-base font-medium">Drop or select file</Text>
//         </div>

//         {/* Display the uploaded file if it exists */}
//         {file && (
//           <div className="relative flex items-center justify-between">
//             <figure className="group relative h-40 rounded-md bg-gray-50">
//               <MediaPreview name={file.name} url={file.preview} />
//               <button
//                 type="button"
//                 onClick={handleRemoveFile}
//                 className="absolute right-0 top-0 rounded-full bg-gray-700 p-1.5 transition duration-300 hover:bg-red-700"
//               >
//                 <PiTrashBold className="text-white" />
//               </button>
//             </figure>
//             <MediaCaption name={file.name} size={file.size} />
//           </div>
//         )}
//       </div>

//       {error && <FieldError error={error} />}
//     </div>
//   );
// }


function MediaPreview({ name, url }: { name: string; url: string }) {
  return endsWith(name, '.pdf') ? (
    <object data={url} type="application/pdf" width="100%" height="100%">
      <p>
        Alternative text - include a link <a href={url}>to the PDF!</a>
      </p>
    </object>
  ) : (
    <Image
      fill
      src={url}
      alt={name}
      className="transform rounded-md object-contain"
    />
  );
}

function MediaCaption({ name, size }: { name: string; size: number }) {
  return (
    <div className="mt-1 text-xs">
      <p className="break-words font-medium text-gray-700">{name}</p>
      <p className="mt-1 font-mono">{prettyBytes(size)}</p>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor="#fff" stopOpacity="0" offset="0%" />
          <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
          <stop stopColor="#fff" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}
