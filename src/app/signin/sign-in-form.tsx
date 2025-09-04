/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Password, type InputProps } from 'rizzui';
import { SigninForm } from '@/components/signin/SigninForm';
import { LoginSchema, loginSchema } from '@/utils/validators/login.schema';
import { SubmitHandler } from 'react-hook-form';
import { routes } from '@/config/routes';
import {authPostRequest} from '../shared/APIs/apis';
import {signinApi} from '../shared/APIs/apiRoutes';
import toast from 'react-hot-toast';
import { LocalStorageRemoveItem, LocalStorageSetItem } from '../shared/constants/LocalStorageData';

const initialValues: LoginSchema = {
  email: 'saroj@yopmail.com',
  password: 'Admin@123',
  // rememberMe: true,
};

export default function SignInForm() {
  const [reset, setReset] = useState({});
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (result) => {
    const response = await authPostRequest(signinApi, result)
    const {data, message, status} = response;
    if(status){
      router.push(routes.dashboard);
      LocalStorageSetItem('userData', data)
      LocalStorageRemoveItem('resetPassword');
    }else{
      toast.error(message);
    }
  };

  return (
    <React.Fragment>
      <SigninForm<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
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
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium [&_svg]:text-[#8921FA]"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-center pb-2">
              <Link
                href={routes.auth.forgotPassword}
                className="h-auto p-0 text-sm font-semibold no-underline transition-colors hover:no-underline"
                style={{ color: '#8921FA' }}
              >
                Forget Password?
              </Link>
            </div>
            <Button
              className="w-full rounded-full"
              type="submit"
              size="lg"
              style={{ backgroundColor: '#8921FA'}}
            >
              <span>Sign In</span>{' '}
            </Button>
          </div>
        )}
      </SigninForm>
    </React.Fragment>
  );
}
