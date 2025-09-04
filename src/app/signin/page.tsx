import Link from 'next/link';
import SignInForm from './sign-in-form';
import Image from 'next/image';
import { Text, Title } from 'rizzui';
import { preloLogo } from '@/assests';
import React from 'react';
import { routes } from '@/config/routes';

export default function SignIn() {
  return ( 
  <React.Fragment>
      <div className="min-h-screen justify-between gap-x-8 px-4 py-8 md:pt-0 lg:flex lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-0 [&>div]:min-h-[calc(100vh-80px)] ">
        {/* Left Side - Form and Social Login */}
        <div className="relative flex w-full items-center justify-center lg:w-5/12 2xl:justify-center 2xl:pe-24">
          <div className=" w-full max-w-sm md:max-w-md lg:py-7 lg:ps-3 lg:pt-0 2xl:w-[630px] 2xl:max-w-none 2xl:ps-0 2xl:pt-0">
            <div className="mb-7 px-6 text-center md:pt-0 lg:px-0 lg:text-center xl:mb-8 2xl:mb-10">
              <Link href={routes.dashboard} className="mb-6 inline-flex max-w-[168px] xl:mb-8">
                <Image src={preloLogo} alt="Isomorphic" />
              </Link>
              <Title
                as="h6"
                className="mb-5 ps-5 text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-7 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl  "
              >
                Sign In
              </Title>
            </div>
            <SignInForm />
          </div>
        </div>

        {/* Right Side - Page Image */}
        <div className="hidden w-7/12 items-center justify-center rounded-[20px] bg-gray-50 px-6 dark:bg-gray-100/40 lg:flex xl:justify-start 2xl:px-16">
          <div className="pb-8 text-center xl:pt-16 2xl:block 2xl:w-[1063px]">
            <div className="mx-auto mb-10 max-w-sm pt-2 2xl:max-w-lg">
              <Title
                as="h2"
                className="mb-5 font-semibold !leading-normal lg:text-[26px] 2xl:px-10 2xl:text-[32px]"
              >
                Welcome Back!
              </Title>
              <Text className="leading-[1.85] text-gray-700 md:leading-loose 2xl:px-6">
                Sign in to access your account and manage your content easily.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
