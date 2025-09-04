/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { dashboardListApi } from "@/app/shared/APIs/apiRoutes";
import { authGetRequest } from "@/app/shared/APIs/apis";
import { LogOutHandler } from "@/app/shared/constants/LocalStorageData";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast";



const useDashboard = () => {
    const [dashboardData, setDashboardData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchDashboardData = useCallback(async() => {
        setIsLoading(true);
        try {
            const response = await authGetRequest(dashboardListApi);
            const {data, status, message} = response;
            if(status){
                setDashboardData(data);
            }else{
                toast.error(message);
                if(message == "Token has expired.") {
                    LogOutHandler(router);
                }
            }
        } catch (error) {
            toast.error('Failed to fetch dashboard data');
        } finally {
            setIsLoading(false);
        }
    },[]);

    useEffect(() => {
        fetchDashboardData();
    },[fetchDashboardData]);

    return {
        dashboardData,
        isLoading,
    }
}

export default useDashboard;