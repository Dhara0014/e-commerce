/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TrashIcon from '@/components/icons/trash';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/components/ui/delete-popover';
import useUser from '@/hooks/use-user';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const UserReviews = ({data = [], userId}: {data: any[], userId:any}) => {
  const pathname = usePathname();
  const show = pathname?.includes('/edit');
  const {deleteUserReview, isLoading, userReviewData, userReviews} = useUser();
  
  useEffect(() => {
    const getReviews = async() => {
      const response = await userReviews({userId: userId});      
      // if(response?.status) {
      //   setUserProductData(response?.data)
      // }else{
      //   setUserProductData(response?.data);
      // }
    }
    getReviews();
  },[deleteUserReview])
  
  return (
    <div className="space-y-4">
      {isLoading ? <p>Loading</p> : <>
      { userReviewData?.length > 0 ?
      userReviewData?.map((itm:any, idx:number) => {        
        return <div
        key={idx}
        className="relative border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
      >
        <>
          {show &&<div className='' style={{float: "right"}}>
            <DeletePopover
          title={`Delete the Review`}
          description={`Are you sure you want to delete this review?`}
          onDelete={() => deleteUserReview({id: itm?.id, userId:userId})}
        />
          </div> 
          // <button
          //   className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          //   onClick={() => handleDelete(idx)}
          //   aria-label="Delete review"
          // >
          //   <TrashIcon className="w-5 h-5" />
          // </button>
          }
          <AvatarCard
              src={itm?.user?.profileImage}
              name={itm?.user?.name}
              description={itm?.rating}
              description_name="Rating : "
            />
          <div className='flex ps-12'>
          <span className=" font-semibold text-gray-800">Comment : </span>
          <p className=" text-gray-800">{itm?.comment}</p>
          </div>
          
          {/* <p className="text-gray-600 mt-2">{itm?.description}</p> */}
          </>
          <DateCell className='flex justify-end items-center' date={new Date(itm?.created_at)} />
        </div>
 } )
: <div className='flex justify-center font-semibold text-xl pt-5'>
  No Reviews
</div>
}
      </>}
    </div>
  )
}

export default UserReviews
