/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { addCategoryApi, categoryDetailsApi, categoryListApi, categoryStatusChangeApi, deleteCategoryApi, updateCategoryApi } from '@/app/shared/APIs/apiRoutes';
import { authDeleteRequest, authGetRequest, authPostRequest, authPutRequest } from '@/app/shared/APIs/apis';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { LogOutHandler } from '@/app/shared/constants/LocalStorageData';
import { usePathname, useRouter } from 'next/navigation';


const useCategory = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesForProduct, setCategoriesForProduct] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState({
    "total": 10,
    "page": 1,
    "limit": 10,
    "totalPages": 1
});
  const {closeModal} = useModal();
  const router = useRouter();
  const pathname = usePathname();

  const fetchCategoryForProduct = useCallback(async({
    status="active"
}:any) => {
setIsLoading(true);
try {
  const params = new URLSearchParams();
  if (status) params.append('status', String(status));
  const response = await authGetRequest(`${categoryListApi}?${params?.toString()}`);
  const { data, message } = response;
  if (response?.status) {
    setCategoriesForProduct(data?.Categories || []);
    setPages(data?.pagination);
    return {
      data: data?.Categories || [],
      status: response?.status
    }
  } else {
    toast.error(message);
    if(message == "Token has expired.") {
      LogOutHandler(router);
    }
    return {
      data: [],
      status: response?.status
    }
  }
} catch (error) {
  toast.error('Failed to fetch categories');
  return {
    data: [],
    status: false
  }
} finally {
  setIsLoading(false);
}
},[]);

   const fetchCategory = useCallback(async({
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
      const response = await authGetRequest(`${categoryListApi}?${params?.toString()}`);
      const { data, status, message } = response;
      if (status) {
        setCategories(data?.Categories || []);
        setPages(data?.pagination);
        return {
          data: data?.Categories || [],
          status: status
        }
      } else {
        toast.error(message);
        if(message == "Token has expired.") {
          LogOutHandler(router);
        }
        return {
          data: [],
          status: status
        }
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
      return {
        data: [],
        status: false
      }
    } finally {
      setIsLoading(false);
    }
  },[]);  

  const deleteCategory = useCallback(
    async (id: string|number) => {
      try {
        const response = await authDeleteRequest(deleteCategoryApi, { id });
        const { status, message } = response;
        if (status) {
          toast.success(message);
          // fetchCategory({});
          setCategories((prev) => prev.filter((item) => item.id !== id));
        } else {
          toast.error(message);
          if(message == "Token has expired.") {
            LogOutHandler(router);
          }
        }
      } catch (error) {
        toast.error('Failed to delete category');
      }
    },
    [fetchCategory]
  );

  const changeCategoryStatus = useCallback(
    async (id: string, currentStatus: string) => {
      try {
        const response = await authPutRequest(categoryStatusChangeApi, {
          id,
          status: currentStatus === 'active' ? 'inactive' : 'active',
        });
        const { status, message } = response;
        if (status) {
          toast.success(message);
          // fetchCategory({});
          setCategories((prev) =>
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
            LogOutHandler(router);
          }
        }
      } catch (error) {
        toast.error('Failed to change status');
      }
    },
    [fetchCategory]
  );

  const addCategory = useCallback(async (data:any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.images) {
          formData.append('categoryImage', data.images);
        }
      const response = await authPostRequest(addCategoryApi,formData);
      const {status, message} = response;
      if(status){
        toast.success(message);
        closeModal();
        setTimeout(() => {
          fetchCategory({});
        }, 300);
      }else{
        toast.error(message);
        if(message == "Token has expired.") {
          LogOutHandler(router);
        }
      }
    } catch (error) {
      toast.error('Failed to add category');
    } finally {
        setIsLoading(false);        
    }
  },[fetchCategory]);  

  const updateCategory = useCallback(async (data:{ id?: number|string|any, title: string; description: string; images: any }) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
        formData.append('id', data?.id);
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.images) {
          formData.append('categoryImage', data.images);
        }
      const response = await authPutRequest(updateCategoryApi,formData);
      const {status, message} = response;      
      if(status){
        toast.success(message);
        fetchCategory({});
        return status;
      }else{
        toast.error(message);
        if(message == "Token has expired.") {
          LogOutHandler(router);
        }
        return status;
      }
    } catch (error) {      
      toast.error('Failed to update category');
      return false;
    } finally {
      setIsLoading(false);
    }
  },[fetchCategory]);

  const categoryDetails = useCallback(async (id?: number|string) => {
    setIsLoading(true);
    try {
      const response = await authGetRequest(`${categoryDetailsApi}?id=${id}`);
      const {data, message, status} = response;
      if(status){
        setCategoryData(data);
      }else{
        toast.error(message);
        if(message == "Token has expired.") {
          LogOutHandler(router);
        }
      }
    } catch (error) {
      toast.error('Failed to get category details');
    } finally {
      setIsLoading(false);
    }
  },[])

  useEffect(() => {
    if(pathname == '/category'){
      fetchCategory({});
    }
  }, [fetchCategory]);

  useEffect(() => {
    if(pathname?.includes('product') && (pathname?.includes('/create') ||  pathname?.includes('/edit')  ) ){
      fetchCategoryForProduct({});
    }
  },[fetchCategoryForProduct]);

return {
  categoriesForProduct,
  categories,
  isLoading,
  fetchCategory,
  deleteCategory,
  changeCategoryStatus,
  addCategory,
  updateCategory,
  categoryData,
  categoryDetails,
  pages,
  // fetchCategoryAsPerParams
}
}

export default useCategory;