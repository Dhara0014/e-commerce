/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  addProductApi,
  deleteProductApi,
  productDetailsApi,
  productListApi,
  productStatusChange,
  updateProductApi,
  updateProductApprovalStatusApi,
} from "@/app/shared/APIs/apiRoutes";
import {
  authDeleteRequest,
  authGetRequest,
  authPostRequest,
  authPutRequest,
} from "@/app/shared/APIs/apis";
import { LogOutHandler } from "@/app/shared/constants/LocalStorageData";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const useProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [productPages, setProductPages] = useState({
    total: 10,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const router = useRouter();
  const pathname = usePathname();

  const fetchProduct = useCallback(
    async ({
      search = "",
      page = "1",
      per_page = "10",
      sort = "createdAt",
      order = "DESC",
    }: any) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (page) params.append("page", String(page));
        if (per_page) params.append("per_page", String(per_page));
        if (sort) params.append("sort", String(sort));
        if (order) params.append("order", String(order));
        const response = await authGetRequest(
          `${productListApi}?${params?.toString()}`
        );
        const { status, data, message } = response;
        if (status) {
          setProducts(data?.products || []);
          setProductPages(data?.pagination);
          return {
            data: data?.products || [],
            status: status,
          };
        } else {
          toast.error(message);
          if (message == "Token has expired.") {
            LogOutHandler(router);
          }
          return {
            data: [],
            status: status,
          };
        }
      } catch (error) {
        toast.error("Failed to fetch products");
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

  const delteProduct = useCallback(
    async (id: string | number) => {
      try {
        const response = await authDeleteRequest(deleteProductApi, {
          productId: id,
        });
        const { status, message } = response;
        if (status) {
          toast.success(message);
          // fetchProduct({});
          setProducts((prev) => prev.filter((item) => item.id !== id));
        } else {
          toast.error(message);
          if (message == "Token has expired.") {
            LogOutHandler(router);
          }
        }
      } catch (error) {
        toast.error("Failed to delete product");
      }
    },
    [fetchProduct]
  );

  const changeProductStatus = useCallback(
    async (id: string | number, currentStatus: string) => {
      try {
        const response = await authPutRequest(productStatusChange, {
          id,
          status: currentStatus === "active" ? "inactive" : "active",
        });
        const { status, message } = response;
        if (status) {
          toast.success(message);
          // setTimeout
          // await fetchProduct({});
          setProducts((prev) =>
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
          if (message == "Token has expired.") {
            LogOutHandler(router);
          }
        }
      } catch (error) {
        toast.error("Failed to change status");
      }
    },
    []
  );

  const addProduct = useCallback(
    async (data: any) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("title", data?.title);
        formData.append("category", data?.category);
        formData.append("condition", data?.condition);
        formData.append("description", data?.description);
        formData.append("price", data?.price);
        // formData.append("poductImages", data?.poductImages);
        if (Array.isArray(data?.poductImages)) {
          data.poductImages.map((image: File | Blob, index: number) => {
            formData.append(`poductImages`, image);
          });
        }
        // formData.append("shippingOption", data?.shippingOption);
        if (Array.isArray(data?.shippingOption)) {
          data.shippingOption.forEach((option: any) => {
            formData.append("shippingOption", option);
          });
        }

        formData.append("userId", data?.userId);

        const response = await authPostRequest(addProductApi, formData);
        const { status, message } = response;
        if (status) {
          toast.success(message);
          fetchProduct({});
          return status;
        } else {
          toast.error(message);
          if (message == "Token has expired.") {
            LogOutHandler(router);
          }
          return status;
        }
      } catch (error) {
        toast.error("Failed to add product");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProduct]
  );

  const updateProduct = useCallback(
    async (data: any) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("title", data?.title);
        formData.append("category", data?.category);
        formData.append("condition", data?.condition);
        formData.append("description", data?.description);
        formData.append("price", data?.price);
        if (Array.isArray(data?.poductImages)) {
          data.poductImages.map((image: File | Blob, index: number) => {
            formData.append(`poductImages`, image);
          });
        }
        if(data?.deleteImages && data?.deleteImages?.length > 0) formData.append("deleteImages", JSON.stringify(data.deleteImages)  );
        // if(data?.deleteImages && data?.deleteImages?.length > 0){
        //   // if (Array.isArray(data?.deleteImages)) {
        //     data.deleteImages.forEach((option: any) => {
        //       formData.append("deleteImages", option);
        //     });
        //   // }
        // }
        formData.append("userId", data?.userId);
        formData.append("productId", data?.productId);
        // formData.append("shippingOption", data?.shippingOption);
        if (Array.isArray(data?.shippingOption)) {
          data.shippingOption.forEach((option: any) => {
            formData.append("shippingOption", option);
          });
        }


        const response = await authPutRequest(updateProductApi, formData);
        const { status, message } = response;
        if (status) {
          toast.success(message);
          setTimeout(() => {
            fetchProduct({});
          }, 300);
          return status;
        } else {
          toast.error(message);
          if (message == "Token has expired.") {
            LogOutHandler(router);
          }
          return status;
        }
      } catch (error) {
        toast.error("Failed to update product");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProduct]
  );

  const updateProductApprovalStatus = useCallback(
    async (data: any) => {
      // setIsLoading(true);
      try {
        const response = await authPostRequest(updateProductApprovalStatusApi, {
          productId: data?.productId,
          approvalStatus: data?.approvalStatus,
        });
        const { status, message } = response;
        if (status) {
          toast.success(message);
          // setTimeout(() => {
          //   fetchProduct({});
          // }, 300);
          const approvalStatusOptions = [
            { label: "pending", value: 1 },
            { label: "live", value: 2 },
            { label: "notApproved", value: 3 },
          ];
          const approvalStatusLabel = approvalStatusOptions.find(
            (option) => option.value === data?.approvalStatus
          )?.label;
          setProducts((prev) =>
            prev.map((item) =>
              item.id === data.productId
                ? {
                    ...item,
                    approvalStatus: approvalStatusLabel,
                  }
                : item
            )
          );
          return status;
        } else {
          toast.error(message);
          if (message == "Token has expired.") {
            LogOutHandler(router);
          }
          return status;
        }
      } catch (error) {
        toast.error("Failed to update product approve status");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProduct]
  );

  const productDetails = useCallback(async (id?: string | number) => {
    setIsLoading(true);
    try {
      const response = await authGetRequest(`${productDetailsApi}?id=${id}`);
      const { data, status, message } = response;
      if (status) {
        setProductData(data);
      } else {
        toast.error(message);
        if (message == "Token has expired.") {
          LogOutHandler(router);
        }
      }
    } catch (error) {
      toast.error("Failed to get product details");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pathname == "/product") {
      fetchProduct({});
    }
  }, [fetchProduct]);

  return {
    products,
    isLoading,
    fetchProduct,
    delteProduct,
    changeProductStatus,
    productData,
    productDetails,
    addProduct,
    updateProduct,
    updateProductApprovalStatus,
    productPages,
  };
};

export default useProduct;
