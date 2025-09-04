/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { PhoneNumber } from '@/components/ui/phone-input';
import { Button, Input, Text } from 'rizzui';
import { routes } from '@/config/routes';
import { LocalStorageGetItem } from '@/app/shared/constants/LocalStorageData';

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

type SchemaType = z.infer<typeof schema>;

export default function AdminPostFeed() {
  const [open, setOpen] = useState(false);
  const [postLimit, setPostLimit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [currentPostID, setCurrentPostID] = useState(100);
  const router = useRouter(); 
  const adminData = LocalStorageGetItem('userData')?.data

  // function handleLoadMore() {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setPostLimit(postLimit + 3);
  //   }, 600);
  // }


  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    defaultValues: {
      name: adminData?.name || 'Admin admin',
      email: adminData?.email || 'admin@admin.com',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SchemaType) => {
    
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
              label="Name"
              // placeholder="person@mail.com"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              type="email"
              label="Email"
              // placeholder="person@mail.com"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

        </div>
          <div className="flex justify-end space-x-4 mt-4">
          <Button type="button" variant="outline" className="px-8" onClick={() => router.push(routes.dashboard)}>
            Cancel
          </Button>
          <Button type="submit" className="w-full md:w-auto px-8" onClick={() => router.push(routes.dashboard)}>
            Submit
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}
