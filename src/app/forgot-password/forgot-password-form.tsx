/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { routes } from '@/config/routes';
import {
  emailForOtpSchema,
  EmailForOtpSchema,
} from '@/utils/validators/reset-password.schema';
import { useRouter } from 'next/navigation';
import { SigninForm } from '@/components/signin/SigninForm';
import { Button, Input, Text } from 'rizzui';
import { authPostRequest } from '../shared/APIs/apis';
import { forgotPasswordApi } from '../shared/APIs/apiRoutes';
import { LocalStorageSetItem } from '../shared/constants/LocalStorageData';
import toast from 'react-hot-toast';

const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});
  const router = useRouter();

  const onSubmit: SubmitHandler<EmailForOtpSchema> = async(result) => {
    const response = await authPostRequest(forgotPasswordApi, result);    
    const {data, message, status} = response;
    if(status){
      LocalStorageSetItem('resetPassword', {email: result?.email });
      toast.success(message);
      setTimeout(() => {
        router.push(routes.auth.otp);        
      }, 300);
    }else{
      toast.error(message);
    }
    setReset(initialValues);
  };

  return (
    <React.Fragment>
      <SigninForm<EmailForOtpSchema>
        validationSchema={emailForOtpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => {          
          return <div className="space-y-6">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button className="mt-2 w-full rounded-full" type="submit" size="lg" style={{ backgroundColor: "#8921FA" }}>
              Get OTP
            </Button>
          </div>
        }}
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
