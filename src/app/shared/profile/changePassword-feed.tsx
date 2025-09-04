/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Button, Password, Text} from 'rizzui';
import { validateConfirmPassword, validatePassword } from '@/utils/validators/common-rules';
import { Controller, useForm } from 'react-hook-form';
import { authPostRequest } from '../APIs/apis';
import { changeAdminPasswordApi } from '../APIs/apiRoutes';
import { LocalStorageGetItem } from '../constants/LocalStorageData';
import toast from 'react-hot-toast';
import { routes } from '@/config/routes';

const schema = z.object({
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  oldPassword: z.string().min(1, { message: "Old Password is required" }),
});

type SchemaType = z.infer<typeof schema>;

export default function ChangePasswordFeed() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [postLimit, setPostLimit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [currentPostID, setCurrentPostID] = useState(100);
  const router = useRouter();

  // useEffect(() => {
  //   setOpen(() => false);
  // }, [pathname]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    // defaultValues: {
    //   company: "",
    // },
    resolver: zodResolver(schema),
  });

  const onSubmit = async(data: SchemaType) => {
    setLoading(true);
    try {
      const response = await authPostRequest(changeAdminPasswordApi,{
        email: LocalStorageGetItem('userData')?.data?.email,
        oldPassword: data?.oldPassword,
        newPassword: data?.password,
      });
      const {status, message} = response;
      if(status){
        toast.success(`${message}, Please Signin again !!`);
        router.push(routes.auth.signIn);
      }else{
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something wen't wrong")
    } finally {
      setLoading(false);
    }
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
          <div className="grid grid-cols-3 gap-x-6 items-end">
          <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  label="Old Password"
                  placeholder="Enter your old password"
                  size="lg"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  error={errors.oldPassword?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  label="New Password"
                  placeholder="Enter your new password"
                  size="lg"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  error={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  label="Confirm Password"
                  placeholder="Enter your confirm password"
                  size="lg"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </div>
        </div>
          <div className="flex justify-end space-x-4 mt-4">
          <Button type="button" variant="outline" className="px-8" onClick={() => router.push(routes.dashboard)}>
            Cancel
          </Button>
          <Button type="submit" className="w-full md:w-auto px-8">
            Submit
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}
