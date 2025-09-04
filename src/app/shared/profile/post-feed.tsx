/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { PhoneNumber } from '@/components/ui/phone-input';
import { Button, Input, Select, Text, Textarea } from 'rizzui';
import { routes } from '@/config/routes';
import useUser from '@/hooks/use-user';

const schema = z.object({
  firstName: z.string()
  .nonempty({message: "First Name is required"})  
  .min(3, { message: "Please enter a valid name (at least 3 characters)" })
  .max(15,{message: "First Name must be at most 15 characters" }),
  lastName: z.string()
  .nonempty({ message: "Last Name is required" })
  .min(1, { message: "Please enter a valid name (at least 3 characters)" })
  .max(20,{message: "Last Name must be at most 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Plan is required" }),
  address: z.string().min(3,{message: 'Address is required'}),
  identityVerificationStatus: z.enum(["NotApproved", "Reject", "Approved"], {
    invalid_type_error: "Verification status is required",
    required_error: "Verification status is required",
  }),
  profileImage: z.string().optional(),
  status : z.string().optional(),
  // comment: z.string().min(3, {message: 'Comment is required'}),
  comment: z.string().optional(),
}).refine((data) => {
  if (data.identityVerificationStatus === "Reject" && !data.comment) {
    return false;
  }
  return true;
}, {
  message: "Comment is required",
  path: ["comment"],

});
type SchemaType = z.infer<typeof schema>; 

export default function PostFeed({data, userId}:{data:any, userId:any}) {
  
  const pathname = usePathname();
  const showFields = !pathname?.includes('/edit');
  const router = useRouter(); 
  const {updateUser, isLoading} = useUser();
  const [status, setStatus] = useState(data?.identityVerificationStatus);
  
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SchemaType>({
    defaultValues: {
      firstName: data?.firstName ,
      lastName: data?.lastName,
      email:  data?.email ,
      phoneNumber: data?.phoneNumber,
      address: data?.address ,
      identityVerificationStatus: data?.identityVerificationStatus || "NotApproved",
      // profileImage : data?.profileImage ,
      status: data?.status,
      comment: data?.verificationComment ?? "",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = async (formData : SchemaType) => {
      const response = await updateUser({
        ...formData,
        userId,
      });
      if (response) router.push(routes.users.user);
  };

  return (
    <React.Fragment>
    <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-y-6 items-end"
      >
        <div>
          <Text className="font-semibold mb-4"></Text>
          <div className="grid grid-cols-2 gap-x-6 items-end">
            <Input
              type="text"
              label="First Name"
              placeholder="Enter First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
              disabled={showFields || isLoading}
              onInput={(e:any) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
              }}
            />
            <Input
              label="Last Name"
              placeholder="Enter Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
              disabled={showFields || isLoading}
              onInput={(e:any) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
              }}
            />
          </div>

          <div className="grid grid-cols-2 mt-3 gap-x-6 items-end">
          <Input
              type="email"
              label="email"
              placeholder="Enter Email"
              {...register("email")}
              error={errors.email?.message}
              disabled={showFields || isLoading}
            />
            <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <PhoneNumber
                      label="Phone Number"
                      placeholder='Enter Phone Number'
                      country="au"
                      value={value}
                      onChange={onChange}
                      error={errors.phoneNumber?.message}
                      disabled={showFields || isLoading}
                    />
                  )}
                />

          </div>
          <div className='grid grid-cols-2 mt-3 gap-x-6 items-end'>
          <div className="mt-4">
        <Textarea
          rows={4}
          label="Address"
          {...register("address")}
          error={errors.address?.message}
          placeholder="Enter your address"
          disabled={showFields || isLoading}
        />
      </div>
          </div>

        <div className="mt-6 p-4 border border-gray-300 rounded-md">
        <Text className="font-semibold text-lg mb-4">Profile Verification</Text>
        <div className="grid grid-cols-2 gap-x-6 items-start">
          {/* Display Identity Photo */}
          <div>
            <Text className="mb-2">Identity Photo</Text>
            {data?.identityPhoto ? (
              <img
                src={data?.identityPhoto}
                alt="Identity"
                className="w-40 h-40 object-cover rounded-md border"
              />
            ) : (
              <Text>No identity photo uploaded</Text>
            )}
          </div>

          {/* Dropdown for Identity Verification Status */}
          <div>
          <Controller
              name="identityVerificationStatus"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Identity Verification Status"
                  placeholder="Select Verification Status"
                  options={[
                    { value: "NotApproved", label: "Not Approved" },
                    { value: "Reject", label: "Reject" },
                    { value: "Approved", label: "Approved" },
                  ]}
                  value={[
                    { value: "NotApproved", label: "Not Approved" },
                    { value: "Reject", label: "Reject" },
                    { value: "Approved", label: "Approved" },
                  ].find(option => option.value === value)}
                  onChange={(selected:any) => {
                    setStatus(selected.label)
                    onChange(selected.value)
                  }}
                  error={errors.identityVerificationStatus?.message}
                  disabled={showFields || isLoading}
                />
              )}              
            />  
            {status == "Reject" && <Textarea
             label="Comment"
             placeholder="Enter Comment"
             {...register("comment")}
             error={errors.comment?.message}
             disabled={showFields || isLoading}
             className='pt-2'
            /> }
             
          </div>
               
        </div>

        {/* <div className="grid grid-cols-2 gap-x-6">
            <Input
              label="Last Name"
              placeholder="Enter Last Name" 
              {...register("lastName")}
              error={errors.lastName?.message}
              disabled={showFields || isLoading}
            />
          </div> */}
      </div>

        </div>
          {!showFields && <div className="flex justify-end space-x-4 mt-4">
          <Button type="button" variant="outline" className="px-8" onClick={() => router.push(routes.users.user)}>
            Cancel
          </Button>
          <Button type="submit" className="w-full md:w-auto px-8" isLoading={isLoading} >
            Submit
          </Button>
        </div>}
      </form>
    </React.Fragment>
  );
}
