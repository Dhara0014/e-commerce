/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cancleOrderApi, orderListApi, viewOrderListApi } from "@/app/shared/APIs/apiRoutes";
import { authGetRequest, authPutRequest } from "@/app/shared/APIs/apis";
import { LogOutHandler } from "@/app/shared/constants/LocalStorageData";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast";
const useOrder = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [orderPages, setOrderPages] = useState({
        "total": 10,
        "page": 1,
        "limit": 10,
        "totalPages": 1
    })
    const router = useRouter();
    const pathname = usePathname();

    const fetchOrder = useCallback(async({
        search="", 
        page="1", 
        per_page="10",
        sort="",
        order="",
        status="",
    }:any) => {
        setIsLoading(true);
        try {
        const params = new URLSearchParams();
      if(search) params.append('search',search);
      if(page) params.append('page',String(page));
      if (per_page) params.append('per_page', String(per_page));
         if (sort) params.append('sort', String(sort));
         if (order) params.append('order', String(order));
         if (status) params.append('status', String(status));
            const response = await authGetRequest(`${orderListApi}?${params?.toString()}`);
            const {data, message} = response;            
            if(response?.status){
                setOrders(data?.orders || []);
                setOrderPages(data?.pagination)
                return {
                    data: data?.orders || [],
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
            toast.error('Failed to fetch orders'); 
            return {
                data: [],
                status: false
            }   
        } finally {
            setIsLoading(false);
        }
    },[]);

    const viewOrder = useCallback(async (id?:number|string) => {
        setIsLoading(true);
        try {
            const response = await authGetRequest(`${viewOrderListApi}?id=${id}`);
            const {data, message, status} = response;
            if(status){
                setOrderDetails(data?.order_details);
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                }
            }
        } catch (error) {
            toast.error('Failed to fetch order');
        }finally {
            setIsLoading(false);
        }
    },[]);

   const cancleOrder = useCallback(async (orderCode?:any) => {
        setIsLoading(true);
        try {
            const response = await authPutRequest(cancleOrderApi, orderCode);
            const {message, status} = response;
            if(status){
                toast.success(message);
                fetchOrder({});
                return status;
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                }
                return status
            }
        } catch (error) {
            toast.error('Failed to fetch order');
            return false;
        }finally {
            setIsLoading(false);
        }
    },[fetchOrder]);

    useEffect(() => {
        if(pathname == '/order'){
            fetchOrder({});
        }
    },[fetchOrder]);

    return {
        orders, 
        orderDetails, 
        isLoading, 
        viewOrder, 
        cancleOrder,
        fetchOrder,
        orderPages,
    }
}

export default useOrder;