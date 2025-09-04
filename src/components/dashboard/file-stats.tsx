/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
'use client';

import cn from '@/utils/class-names';
// import CircleProgressBar from '@/components/charts/circle-progressbar';
// import TrendingUpIcon from '@/components/icons/trending-up';
// import TrendingDownIcon from '@/components/icons/trending-down';
import { BsCartCheck ,BsBoxSeamFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { MdRateReview , MdOutlinePendingActions} from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { Text } from 'rizzui';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import MetricCard from '../cards/metric-card';
import React from 'react';
import { PiUserListDuotone } from 'react-icons/pi';
import useDashboard from '@/hooks/use-dashboard';


type FileStatsType = {
  className?: string;
};



export function FileStatGrid({ className }: { className?: string }) {
  const {dashboardData, isLoading} = useDashboard();
  const filesStatData = [
    {
      id: 7,
      title: 'Total Active Users',
      metric: `${Intl.NumberFormat('en-IN').format(dashboardData?.totalUser)}`,
      fill: '#15E2BB',
      icon: <PiUserListDuotone className="relative z-10 h-8 w-8 text-white"/>,
    },
    {
      id: 1,
      title: 'Total Orders',
      metric: `${Intl.NumberFormat('en-IN').format(dashboardData?.totalOrders)}`,
      fill: '#8921FA',
      icon: <BsCartCheck className="relative z-10 h-8 w-8 text-white"/>,
    },
    {
      id: 2,
      title: 'Total Products',
      metric:`${Intl.NumberFormat('en-IN').format(dashboardData?.totalProducts)}`,
      fill: '#808080',
      icon: <BsBoxSeamFill className="relative z-10 h-8 w-8 text-white"/>,
    },
    {
      id: 3,
      title: 'Total Reviews',
      metric: `${Intl.NumberFormat('en-IN').format(dashboardData?.totalReviews)}`,
      fill: '#8921FA',
      icon: <MdRateReview className="relative z-10 h-8 w-8 text-white"/>,
    },
    {
      id: 4,
      title: 'Total Sales',
      metric:`$${Intl.NumberFormat('en-IN').format(dashboardData?.totalSales)}`,
      fill: '#808080',
      icon: <GiProgression className="relative z-10 h-8 w-8 text-white"/>,
    },
  {
      id: 5,
      title: 'Pending Product Approvals',
      metric: `${Intl.NumberFormat('en-IN').format(dashboardData?.totalProductApproval)}`,
      fill: '#15E2BB',
      icon: <MdOutlinePendingActions className="relative z-10 h-8 w-8 text-white"/>,
    },
  {
      id: 8,
      title: 'Pending Withdraw Request Approvals',
      metric: `${Intl.NumberFormat('en-IN').format(dashboardData?.totalWithdrawApproval)}`,
      fill: '#808080',
      icon: <MdOutlinePendingActions className="relative z-10 h-8 w-8 text-white"/>,
    },
  {
      id: 6,
      title: 'Total Revenue',
      metric: `$${Intl.NumberFormat('en-IN').format(dashboardData?.totalRevenue)}`,
      fill: '#15E2BB',
      icon: <GrMoney className="relative z-10 h-8 w-8 text-white"/>,
    },
 
  ];

  return (
    <React.Fragment>
      {
        isLoading ? <p>Loading</p> : 
        <>
          {filesStatData.map((stat: any) => {
        return ( 
        <div 
          className={cn(
            'flex flex-wrap gap-5',
            'md:gap-6 3xl:gap-8',
            className
          )}
        >
          <MetricCard
            key={stat.id}
            title={stat.title}
            metric={stat.metric}
            metricClassName="3xl:text-[22px]"
            // className={cn('w-full max-w-full justify-between', className)}
            className={cn('flex-grow basis-[50%] max-w-[50%] ', className)}
            chart={
              <div className="relative flex items-center justify-center h-20">
                  {stat.icon}
                  <div
                    // className="absolute h-full w-full rounded-full"
                    className="absolute h-14 w-14 rounded-full"
                    style={{
                      backgroundColor: stat.fill,
                    }}
                  ></div>
                </div>
            }
          >
            <Text className="mt-3 flex items-center leading-none text-gray-500">
              <Text
                as="span"
                className={cn(
                  'me-2 inline-flex items-center font-medium',
                  stat.increased ? 'text-green' : 'text-red'
                )}
              >
              </Text>
            </Text>
          </MetricCard>

          </div>
        );
      })}
        </>
      }
    </React.Fragment>
  );
}

export default function FileStats({ className }: FileStatsType) {
  const {
    sliderEl,
    // sliderPrevBtn,
    // sliderNextBtn,
    // scrollToTheRight,
    // scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <div className="w-full ">
        <div
          ref={sliderEl}
          // className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 3xl:gap-8"
          // className=" grid grid-flow-row-dense grid-cols-3 grid-rows-2 gap-5 "
          className="grid gap-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 grid-flow-row-dense"
        >
          <FileStatGrid className="min-w-full" />
        </div>
      </div>
    </div>
  );  
}
