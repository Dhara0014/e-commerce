/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { routes } from '@/config/routes';
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/utils/validators/reset-password.schema';
import { useRouter } from 'next/navigation';
import { SigninForm } from '@/components/signin/SigninForm';
import { Button, Password, Text } from 'rizzui';
import { authPostRequest } from '../shared/APIs/apis';
import { resetPasswordApi } from '../shared/APIs/apiRoutes';
import { LocalStorageGetItem, LocalStorageRemoveItem } from '../shared/constants/LocalStorageData';
import toast from 'react-hot-toast';

const initialValues = {
  password: '',
  confirmPassword: '',
};

export default function ResetPasswordForm() {
  const [reset, setReset] = useState({});
  const router = useRouter();

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async(result) => {
    const emailOtpData = LocalStorageGetItem('resetPassword');
    const response = await authPostRequest(resetPasswordApi,{
      Password: result?.password,
      ...emailOtpData
    });
    const {data, message, status} = response;
    if(status){
      LocalStorageRemoveItem('resetPassword');
      toast.success(message)
      setTimeout(() => {
        router.push(routes.auth.signIn)        
      }, 300);
    }else{
      toast.error(message);
    }
    setReset(initialValues);
  };

  return (
    <React.Fragment>
      <SigninForm<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium [&_svg]:text-[#8921FA]"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              label="Confirm Password"
              placeholder="Enter confirm password"
              size="lg"
              className="[&>label>span]:font-medium [&_svg]:text-[#8921FA]"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <Button className="mt-2 w-full rounded-full" type="submit" size="lg" style={{ backgroundColor: "#8921FA" }}>
              Reset Password
            </Button>
          </div>
        )}
      </SigninForm>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 lg:mt-8 lg:text-start xl:text-base">
        Don’t want to reset your password?{' '}
        <Link
          href={routes.auth.signIn}
          className="font-bold transition-colors "
          style={{ color: "#8921FA" }}
        >
          Sign In
        </Link>
      </Text>
    </React.Fragment>
  );
}
