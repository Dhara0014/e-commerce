/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */


import { addBannerApi, bannerDetailsApi, bannerListApi, bannerStatusChangeApi, categoryStatusChangeApi, deleteBannerApi, updateBannerApi } from '@/app/shared/APIs/apiRoutes';
import { authDeleteRequest, authGetRequest, authPostRequest, authPutRequest } from '@/app/shared/APIs/apis';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { LogOutHandler } from '@/app/shared/constants/LocalStorageData';
import { usePathname, useRouter } from 'next/navigation';

const useBanner = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [bannerData, setBannerData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [bannerPages, setBannerPages] = useState({
    "total": 10,
    "page": 1,
    "limit": 10,
    "totalPages": 1
});
  const {closeModal} = useModal();
  const router = useRouter();
  const pathname = usePathname();

  const fetchBanner = useCallback(async({
        search="", 
        page="1", 
        per_page="10",
        sort="",
        order="",
  }:any) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if(search) params.append('search',search);
      if(page) params.append('page',String(page));
      if (per_page) params.append('per_page', String(per_page));
      if (sort) params.append('sort', String(sort));
      if (order) params.append('order', String(order));
      const response = await authGetRequest(`${bannerListApi}?${params?.toString()}`);
      const { data, status, message } = response;
      if (status) {
        setBanners(data?.banners || []);
        setBannerPages(data?.pagination);
        return {
          data:data?.banners || [],
          status:status
        };
      } else {
        toast.error(message);
        if(message == "Token has expired.") LogOutHandler
        return {
          data:[],
          status:status
        }
      }
    } catch (error) {
      toast.error('Failed to fetch banners');
      return {
        data:[],
        status:false
      }
    } finally {
      setIsLoading(false);
    }
  },[]);  

  const deleteBanner = useCallback(
    async (id: string) => {
      try {
        const response = await authDeleteRequest(deleteBannerApi, { id });
        const { status, message } = response;
        if (status) {
          toast.success(message);
          // fetchBanner({});
          setBanners((prev) => prev.filter((item) => item.id !== id));
        } else {
          toast.error(message);
          if(message == "Token has expired.") LogOutHandler(router)
        }
      } catch (error) {
        toast.error('Failed to delete banner');
      }
    },
    [fetchBanner]
  );

  const changeBannerStatus = useCallback(
    async (id: string, currentStatus: string) => {
      try {
        const response = await authPutRequest(bannerStatusChangeApi, {
          id,
          status: currentStatus === 'active' ? 'inactive' : 'active',
        });
        const { status, message } = response;
        if (status) {
          toast.success(message);
          // fetchBanner({});
          setBanners((prev) =>
            prev.map((item) =>
              item.id === id
                ? {
                    ...item,
                    status: currentStatus === "active" ? "inactive" : "active",
                  }
                : item
            )
          );
        } else {
          toast.error(message);
          if(message == "Token has expired.") {
            LogOutHandler(router)
          }
        }
      } catch (error) {
        toast.error('Failed to change status');
      }
    },
    [fetchBanner]
  );

  const addBanner = useCallback(async (data:any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.images) {
          formData.append('bannerImage', data.images);
        }
      const response = await authPostRequest(addBannerApi,formData);
      const {status, message} = response;
      if(status){
        toast.success(message);
        closeModal();
        setTimeout(() => {
          fetchBanner({});          
        }, 300);
        return status;
      }else{
        toast.error(message);
        if(message == "Token has expired.") {
          LogOutHandler(router)
        }
        return status;
      }
    } catch (error) {
      toast.error('Failed to add banner');
      return false;
    } 
    finally {
      setIsLoading(false);
    }
  },[fetchBanner,]);

  const updateBanner = useCallback(async (data:{ id?: number|string|any, title: string; description: string; images: any }) => {
    // setIsLoading(true);
    try {
      const formData = new FormData();
        formData.append('id', data?.id);
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.images) {
          formData.append('bannerImage', data.images);
        }
      const response = await authPutRequest(updateBannerApi,formData);
      const {status, message} = response;      
      if(status){
        toast.success(message);
          fetchBanner({});
        return status
      }else{
        toast.error(message);
        if(message == "Token has expired.") {
          LogOutHandler(router)
        }
        return status
      }
    } catch (error) {      
      toast.error('Failed to update banner');
      return false;
    } finally {
      // setIsLoading(false);
    }
  },[fetchBanner]);

  const bannerDetails = useCallback(async (id?: number|string) => {
    setIsLoading(true);
    try {
      const response = await authGetRequest(`${bannerDetailsApi}?id=${id}`);
      const {data, message, status} = response;
      if(status){
        setBannerData(data);
      }else{
        toast.error(message);
        if(message == "Token has expired.") {
          LogOutHandler(router)
        }
      }
    } catch (error) {
      toast.error('Failed to get banner details');
    } finally {
      setIsLoading(false);
    }
  },[])

  useEffect(() => {
    if(pathname == '/banner'){
      fetchBanner({});
    }
  }, [pathname]);

return {
  banners,
  isLoading,
  fetchBanner,
  deleteBanner,
  changeBannerStatus,
  addBanner,
  updateBanner,
  bannerData,
  bannerDetails,
  bannerPages,

}
}

export default useBanner