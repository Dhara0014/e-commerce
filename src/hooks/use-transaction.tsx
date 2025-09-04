/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  updateWalletTransaction,
  walletTransactionApi,
} from "@/app/shared/APIs/apiRoutes";
import { authGetRequest, authPutRequest } from "@/app/shared/APIs/apis";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LogOutHandler } from "@/app/shared/constants/LocalStorageData";
import { usePathname, useRouter } from "next/navigation";

const useTransaction = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [transactions, setTransaction] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionPages, setTransactionPages] = useState({
    total: 10,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const fetchTransaction = useCallback(
    async ({
      search = "",
      page = "1",
      per_page = "10",
      sort = "",
      order = "",
      status,
    }: {
      search?: string;
      page?: number | string | any;
      per_page?: number | string | any;
      sort?: string;
      order?: string;
      status?: any;
    }) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (page) params.append("page", page);
        if (per_page) params.append("per_page", per_page);
        if (sort) params.append("sort", sort);
        if (order) params.append("order", order);
        if (status) params.append("status", status);
        const response = await authGetRequest(
          `${walletTransactionApi}?${params?.toString()}`
        );
        const { data, message } = response;
        if (response?.status) {
          setTransaction(data?.transactions || []);
          setTransactionPages(data?.pagination);
          return {
            data: data?.transactions || [],
            status: status,
          };
        } else {
          toast.error(message);
          if (message == "Token has expired.") LogOutHandler(router);
          return {
            data: [],
            status: status,
          };
        }
      } catch (error) {
        toast.error("Failed to fetch transactions");
        return {
          data: [],
          status: false,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const changeTransactionStatus = useCallback(
    async (data: any) => {
      try {
        const response = await authPutRequest(updateWalletTransaction, data);
        const { status, message } = response;
        if (status) {
          toast.success(message);
          // fetchTransaction({});
          setTransaction((prev) =>
            prev.map((item) =>
              item.id === data.id
                ? { ...item, comment: data.comment, status: data.status }
                : item
            )
          );
          return status;
        } else {
          toast.error(message);
          if (message == "Token has expired.") LogOutHandler(router);
          return status;
        }
      } catch (error) {
        toast.error("Failed to change status");
        return false;
      }
    },
    [fetchTransaction]
  );

  useEffect(() => {
    if (pathname == "/withdraw-request") {
      fetchTransaction({});
    }
  }, [fetchTransaction]);

  return {
    transactions,
    isLoading,
    fetchTransaction,
    changeTransactionStatus,
    transactionPages,
  };
};

export default useTransaction;
