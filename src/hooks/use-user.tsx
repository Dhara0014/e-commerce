/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { deleteUserApi, deleteUserReviewApi, productStatusChange, updateUserDetailsApi, userDetailsApi, userListApi, userProductList, userPurchasedList, userReviewList, userSelltList, userStatusChangeApi, userTransactionList } from "@/app/shared/APIs/apiRoutes";
import { authDeleteRequest, authGetRequest, authPutRequest } from "@/app/shared/APIs/apis";
import { LogOutHandler } from "@/app/shared/constants/LocalStorageData";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast";

const useUser = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [usersForProduct, setUsersForProduct] = useState<any[]>([]);
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState<any[]>([]);    
    const [userReviewData, setUserReviewData] = useState([]);
    const [userPages, setUserPages] = useState({
        "total": 10,
        "page": 1,
        "limit": 10,
        "totalPages": 1
    });

    const [userDataPages, setUserDataPages] = useState({
        "total": 10,
        "page": 1,
        "limit": 10,
        "totalPages": 1
    });    
    const router = useRouter();
    const pathname = usePathname();

    const fetchUserForProduct = useCallback(async() => {
        setIsLoading(true);
        try {
            const response = await authGetRequest(userListApi);
            const {data, status, message} = response;
            if(status){
                setUsersForProduct(data?.users || []);
                setUserPages(data?.pagination);
                return {
                    data: data?.users,
                    status: status
                }
            }else{
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
            toast.error('Failed to fetch users');
            return {
                data: [],
                status: false
            }
        } finally {
            setIsLoading(false);
        }
    },[]);

    const fetchUser = useCallback(async({
        search="", 
        page="1", 
        per_page="10",
        sort="",
        order="",
        identityVerificationStatus=""
    }:any) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if(search) params.append('search',search);
            if(page) params.append('page',String(page));
            if (per_page) params.append('per_page', String(per_page));
            if (sort) params.append('sort', String(sort));
            if (order) params.append('order', String(order));
            if (identityVerificationStatus) params.append('identityVerificationStatus', String(identityVerificationStatus));
            const response = await authGetRequest(`${userListApi}?${params?.toString()}`);
            const {data, status, message} = response;
            if(status){
                setUsers(data?.users || []);
                setUserPages(data?.pagination);
                return {
                    data: data?.users,
                    status: status
                }
            }else{
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
            toast.error('Failed to fetch users');
            return {
                data: [],
                status: false
            }
        } finally {
            setIsLoading(false);
        }
    },[]);

    const deleteUser = useCallback(async ({id}:{id: string |number}) => {
        try {
            const response = await authDeleteRequest(`${deleteUserApi}?id=${id}`);
            const {status, message} = response;
            if(status){
                toast.success(message);
                // fetchUser({});
                setUsers((prev) => prev.filter((item) => item.id !== id));
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
            }
        } catch (error) {
            toast.error('Failed to delete user');
        }
    },[fetchUser]);

    const changeUserStatus = useCallback( async(id: string|number, currentStatus: string) => {
        try {
            const response = await authPutRequest(userStatusChangeApi, {
                userId: id,
                status: currentStatus === 'active' ? 'inactive': 'active',
            });
            const {status, message} = response;
            if(status){
                toast.success(message);
                // fetchUser({});
                setUsers((prev) =>
                    prev.map((item) =>
                      item.id === id
                        ? {
                            ...item,
                            status: currentStatus === "active" ? "inactive" : "active",
                          }
                        : item
                    )
                  );
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
            }
        } catch (error) {
            toast.error('Failed to change status')
        }
    },[fetchUser]);

    const updateUser = useCallback(async(data:any) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('userId', data?.userId);
        if(data?.firstName) formData.append('firstName', data?.firstName.trim());
        if(data?.lastName) formData.append('lastName', data?.lastName.trim());
        if(data?.email) formData.append('email', data?.email);
        if(data?.phoneNumber) formData.append('phoneNumber', data?.phoneNumber);
        if(data?.address) formData.append('address', data?.address);
        if(data?.identityVerificationStatus) formData.append('identityVerificationStatus', data?.identityVerificationStatus);
        if(data?.profileImage) formData.append('profileImage', data?.profileImage);
        if(data?.status) formData.append('status', data?.status);
        if(data?.comment) formData.append('verificationComment', data?.comment);
        try {
            const response = await authPutRequest(updateUserDetailsApi,formData);
            const {status, message} = response;
            if(status){
                toast.success(message);
                fetchUser({});
                return status;
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
                return status;
            }
        } catch (error) {
            toast.error('Failed to update user');
            return false;
        } finally {
            setIsLoading(false);
        }
    },[fetchUser]);

    const userDetails = useCallback(async (id?: number|string|any) => {
        setIsLoading(true);
        try {
            const response = await authGetRequest(`${userDetailsApi}?id=${id}`);
            const {data, message, status} = response;
            if(status){
                setUserData(data);
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
            }
        } catch (error) {
            toast.error('Failed to get user details');
        } finally {
            setIsLoading(false);
        }
    },[]);

    const userProduct = useCallback(async({
        userId="",
        search="", 
        page="1", 
        per_page="10",
        sort="",
        order="",
      }: {
        userId?:string|number|any;
        search?:string;
        page?: number | string; 
        per_page?: number | string;
        sort?: string;
        order?: string;
      }) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if(userId) params.append('userId',userId);
            if(search) params.append('search',search);
            if(page) params.append('page',String(page));
            if (per_page) params.append('per_page', String(per_page));
            if(sort) params.append('sort',sort);
            if(order) params.append('order',order);
            const response = await authGetRequest(`${userProductList}?${params?.toString()}`);
            const {data, status, message} = response;            
            if(status){
                setProductData(data?.sallerProducts || []);
                setUserDataPages(data?.pagination)
                return {
                    data: data?.sallerProducts || [],
                    status
                }                
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
                return {
                    data:[],
                    status
                };
            }
        } catch (error) {
            toast.error('Failed to load user data');
            return {
                data:[],
                status:false
            }
        } finally {
            setIsLoading(false);
        }
    },[]);

    const changeUserProductStatus = useCallback( async(id: string|number, currentStatus: string, userId?: any) => {
        // setIsLoading(true);
        try {
            const response = await authPutRequest(productStatusChange, {
                id,
                status: currentStatus === 'active' ? 'inactive': 'active',
            });
            const {status, message} = response;
            if(status){
                toast.success(message);
                // setTimeout(() => {
                //     userProduct({userId:userId});
                // }, 300);
                setProductData((prev) =>
                    prev.map((item) =>
                      item.id === id
                        ? { ...item, status: currentStatus === 'active' ? 'inactive' : 'active' }
                        : item
                    )
                  );
                return status;
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
                  return status;
            }
        } catch (error) {
            toast.error('Failed to change status');
            return false;
        } finally {
            setIsLoading(false);
        }
    },[userProduct]);


const userSell = useCallback(async({
        userId="",
        search="", 
        page="1", 
        per_page="10",
        sort="",
        order="",
      }: {
        userId?:string|number|any;
        search?:string;
        page?: number | string; 
        per_page?: number | string;
        sort?: string;
        order?: string;
      }) => {
        try {
            const params = new URLSearchParams();
            if(userId) params.append('userId',userId);
            if(search) params.append('search',search);
            if(page) params.append('page',String(page));
            if (per_page) params.append('per_page', String(per_page));
            if(sort) params.append('sort',sort);
            if(order) params.append('order',order);
            const response = await authGetRequest(`${userSelltList}?${params?.toString()}`);
            const {data, status, message} = response;            
            if(status){
                // setUserProductData(data?.sallerProducts);
                setUserDataPages(data?.pagination)
                return {
                    data: data?.sallerProducts || [],
                    status
                }                
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
                return {
                    data:[],
                    status
                };
            }
        } catch (error) {
            toast.error('Failed to load user data');
            return {
                data:[],
                status:false
            }
        }
    },[]);

  const userPurchased = useCallback(async({
        userId="",
        search="", 
        page="1", 
        per_page="10",
        sort="",    
        order="",
      }: {
        userId?:string|number|any;
        search?:string;
        page?: number | string; 
        per_page?: number | string;
        sort?: string;
        order?: string;
      }) => {
        try {
            const params = new URLSearchParams();
            if(userId) params.append('userId',userId);
            if(search) params.append('search',search);
            if(page) params.append('page',String(page));
            if (per_page) params.append('per_page', String(per_page));
            if(sort) params.append('sort',sort);
            if(order) params.append('order',order);
            const response = await authGetRequest(`${userPurchasedList}?${params?.toString()}`);
            const {data, status, message} = response;            
            if(status){
                // setUserProductData(data?.sallerProducts);
                setUserDataPages(data?.pagination)
                return {
                    data: data?.sallerProducts || [],
                    status
                }                
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
                return {
                    data:[],
                    status
                };
            }
        } catch (error) {
            toast.error('Failed to load user data');
            return {
                data:[],
                status:false
            }
        }
    },[]);

    const userReviews = useCallback(async({
        userId="",
        search="", 
        page="", 
        per_page="",
        sort="",    
        order="",
      }: {
        userId?:string|number|any;
        search?:string;
        page?: number | string; 
        per_page?: number | string;
        sort?: string;
        order?: string;
      }) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if(userId) params.append('userId',userId);
            if(search) params.append('search',search);
            if(page) params.append('page',String(page));
            if (per_page) params.append('per_page', String(per_page));
            if(sort) params.append('sort',sort);
            if(order) params.append('order',order);
            const response = await authGetRequest(`${userReviewList}?${params?.toString()}`);
            const {data, status, message} = response;            
            if(status){
                setUserReviewData(data?.reviews);
                return {
                    data: data?.reviews,
                    status
                }                
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
                return {
                    data:[],
                    status
                };
            }
        } catch (error) {
            toast.error('Failed to load user data');
            return {
                data:[],
                status:false
            }
        } finally {
            setIsLoading(false);
        }
    },[]);

    const deleteUserReview = useCallback(async({id,userId}:{id:any,userId:any}) =>{
        setIsLoading(true);
        try {
            const response = await authDeleteRequest(`${deleteUserReviewApi}?id=${id}`);
            const {status, message} = response;
            if(status){
                toast.success(message);
                userReviews({userId:userId});
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
            }
        } catch (error) {
            toast.error('Failed to delete review');
        } finally {
            setIsLoading(false);
        }
    },[userReviews]);

    const userTransaction = useCallback(async({
        userId="",
        search="", 
        page="1", 
        per_page="10",
        sort="",    
        order="",
      }: {
        userId?:string|number|any;
        search?:string;
        page?: number | string; 
        per_page?: number | string;
        sort?: string;
        order?: string;
      }) => {
        try {
            const params = new URLSearchParams();
            if(userId) params.append('userId',userId);
            if(search) params.append('search',search);
            if(page) params.append('page',String(page));
            if (per_page) params.append('per_page', String(per_page));
            if(sort) params.append('sort',sort);
            if(order) params.append('order',order);
            const response = await authGetRequest(`${userTransactionList}?${params?.toString()}`);
            const {data, status, message} = response;            
            if(status){
                // setUserProductData(data?.sallerProducts);
                setUserDataPages(data?.pagination)
                return {
                    data: data?.transactions || [],
                    status
                }                
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                  }
                return {
                    data:[],
                    status
                };
            }
        } catch (error) {
            toast.error('Failed to load user data');
            return {
                data:[],
                status:false
            }
        }
    },[]);

    useEffect(()=>{
        if(pathname == '/user' ){
            fetchUser({});
        }
        else if(pathname == '/pendingUserIdentification'){
            fetchUser({identityVerificationStatus: 'Pending'})
        }
    },[fetchUser]);

    useEffect(() => {
        if(pathname?.includes('product') && (pathname?.includes('/create') ||  pathname?.includes('/edit')  ) ){
            fetchUserForProduct();
        }
    },[fetchUserForProduct])

    
    return {
        usersForProduct,
        users,
        isLoading,
        fetchUser,
        deleteUser,
        changeUserStatus,
        updateUser,
        userData,
        userDetails,
        userProduct,
        productData,
        userSell,
        userPurchased,
        userReviews,
        userTransaction,
        deleteUserReview,
        userReviewData,
        changeUserProductStatus,
        userPages,
        userDataPages,
    }
}

export default useUser;