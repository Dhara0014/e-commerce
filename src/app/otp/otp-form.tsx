/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { otpVarifySchema, OtpVerifySchema } from '@/utils/validators/reset-password.schema';
import { routes } from '@/config/routes';
import { Button, PinCode } from 'rizzui';
import { SigninForm } from '@/components/signin/SigninForm';
import { authPostRequest } from '../shared/APIs/apis';
import { forgotPasswordApi, verifyOtp } from '../shared/APIs/apiRoutes';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { LocalStorageGetItem } from '../shared/constants/LocalStorageData';

const initialValues = {
  otp : '',
};

export default function OtpForm() {
  const router = useRouter();  
  const onSubmit: SubmitHandler<OtpVerifySchema> = async(result) => {   
    const storedEmail  = LocalStorageGetItem('resetPassword'); 
    const response = await authPostRequest(verifyOtp, {
      ...storedEmail,
      otp: result?.otp
    });
    const {data, message, status} = response;
    if(status){
      toast.success(message);
      setTimeout(() => {
        router.push(routes.auth.resetPassword);
      }, 300);
    }else{
      toast.error(message);
    }
  };

  const handleResendOtp = async() => {
    const storedEmail  = LocalStorageGetItem('resetPassword');
  const response = await authPostRequest(forgotPasswordApi, storedEmail);    
    const {data, message, status} = response;
    if(status){
      toast.success(message);
    }else{
      toast.error(message);
    }
  }
  
  return (
    <SigninForm<OtpVerifySchema> 
    validationSchema={otpVarifySchema}
    onSubmit={onSubmit}
    useFormProps={{
      mode: "onChange",
      defaultValues: initialValues
    }}
    >
      {({ setValue, formState: {errors} }) => (
        <div className="space-y-10 ">
          <PinCode
            length={6}
            variant="outline"
            type='number'
            setValue={(value) => setValue('otp', String(value))}
            size="lg"
            className="lg:justify-start "
            error={errors.otp?.message}
          />
          <Button
            className="w-full rounded-full"
            type="submit"
            size="lg"
            style={{ backgroundColor: "#8921FA" , color: "white"}}
          >
            Verify OTP
          </Button>
          <div className="">
            <div
              className="-mt-4 w-full p-0 text-base font-medium text-primary lg:inline-flex lg:w-auto"
              // type=""
              // variant="text"
            >
              Don&apos;t receive the OTP? {' '}  <span style={{color: "#8921FA", cursor: "pointer"}} onClick={handleResendOtp}>Resend</span>
            </div>
          </div>
        </div>
      )}
    </SigninForm>
  );
}
