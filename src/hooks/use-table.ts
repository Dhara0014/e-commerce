/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import isString from "lodash/isString";
import { authGetRequest } from "@/app/shared/APIs/apis";
import { productListApi } from "@/app/shared/APIs/apiRoutes";
import toast from "react-hot-toast";
import { LogOutHandler } from "@/app/shared/constants/LocalStorageData";
import { usePathname, useRouter } from "next/navigation";
import useProduct from "./use-product";
import useUser from "./use-user";
import useCategory from "./use-category";
import useOrder from "./use-order";
import useBanner from "./use-banner";
import useTransaction from "./use-transaction";

interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  initialFilterState?: Partial<Record<string, any>>
) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  },[initialData]);
  
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();  
  const {fetchProduct, productPages } = useProduct();
  const {fetchUser, userPages, userDataPages, userProduct, userSell, userPurchased, userTransaction} = useUser();
  const {fetchCategory, pages} = useCategory();
  const {fetchOrder, orderPages} = useOrder();
  const {fetchBanner, bannerPages} = useBanner();
  const {fetchTransaction, transactionPages} = useTransaction();

  const hash = typeof window !== "undefined" && window.location.hash;

  const page = pathname == "/category" ? pages : pathname == '/banner' ? bannerPages : pathname == "/product" ?  productPages : (hash == '#product' || hash == '#sales' || hash == '#purchases' || hash == '#transaction' ) ? userDataPages : (pathname == '/user' || pathname == '/pendingUserIdentification') ?  userPages : pathname == '/order' ? orderPages : transactionPages;

  const userId = pathname?.split('/')[2]

  useEffect(() => {
    const get = async() => {
      if(pathname?.includes('/user')){
        if(hash == '#product'){
          userProduct({userId:userId})
        }
        else if(hash == '#sales'){
          userSell({userId:userId})
        }
      else if(hash == '#purchases'){
          userPurchased({userId:userId})
        }
      else if(hash == '#transaction'){
          userTransaction({userId:userId})
        }
      }
    }
    get();
  },[])

  useEffect(() => {
    setLoading(false);
  }, []);

  // Handle row selection
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };
  const handleSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data.map((record) => record.id));
    }
  };

  //  Handle sorting
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: null,
    direction: null,
  });

  function sortData(data: T[], sortKey: string, sortDirection: string) {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const sortedData = useMemo(() => {
    let newData = data;
    if (!sortConfig.key) {
      return newData;
    }
    return sortData(newData, sortConfig.key, sortConfig.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig, data]);

  function handleSort(key: string) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  // Handle pagination
  const [currentPage, setCurrentPage] = useState(page?.page);
  function paginatedData(data: T[] = sortedData) {
    const start = (currentPage - 1) * countPerPage;
    const end = start + countPerPage;

    if (data.length > start) return data.slice(start, end);
    return data;
  }

  async function handlePaginate(pageNumber: number) { 
    setCurrentPage(pageNumber);
    try {
      if(pathname == '/banner'){
        const response = await fetchBanner({page: pageNumber, per_page: perPage});
        setData(response?.status ? response?.data : response?.data);
      }else if(pathname == '/category'){
        const response = await fetchCategory({page: pageNumber, per_page: perPage});
        setData(response?.status ? response?.data : []);
      }
      else if(pathname == '/product'){
        const response = await fetchProduct({page: pageNumber, per_page: perPage});
        response?.status ? setData(response?.data) : setData(response?.data)
      }
      else if(pathname == '/user'){
        const response = await fetchUser({page: pageNumber, per_page: perPage});
        response?.status ? setData(response?.data) : setData(response?.data)
      }else if( pathname == '/pendingUserIdentification'){
        await fetchUser({page: pageNumber, per_page:perPage, identityVerificationStatus: 'Pending'})
      } else if(pathname == '/order'){
        const response = await fetchOrder({page: pageNumber, per_page: perPage});
        response?.status ? setData(response?.data) : setData(response?.data)
      }
      else if(pathname == '/withdraw-request') {
        const response = await fetchTransaction({page: pageNumber, per_page: perPage});
        response?.status ? setData(response?.data) : setData(response?.data)
      } 
      // else  if(pathname?.includes('/user') ){
       else if(hash == '#product'){
          const response = await userProduct({page: pageNumber, per_page: perPage, userId: userId});
          setData(response?.status ? response?.data : response?.data)        
        }else if(hash == '#sales'){
          const response = await userSell({page: pageNumber, per_page: perPage, userId: userId});
          setData(response?.status ? response?.data : response?.data)
        }else if(hash == '#purchases'){
          const response = await userPurchased({page: pageNumber, per_page: perPage, userId: userId});
          setData(response?.status ? response?.data : response?.data) 
        }
      else if(hash == '#transaction'){
          const response = await userTransaction({page: pageNumber, per_page: perPage, userId: userId});
          setData(response?.status ? response?.data : response?.data) 
        }
      // }
    } catch (error) {
      // console.log("error <><>", error)
    }
   
  }

  const [perPage, setPerPage] = useState(10);
  async function handleParPageData(limit: number) {
    setPerPage(limit);
    if(pathname =='/banner'){
      const response = await fetchBanner({page: 1, per_page: limit});
      setData(response?.status ? response?.data : response?.data);
    }else if(pathname == '/category'){
      const response = await fetchCategory({page: 1, per_page: limit});
      setData(response?.status ? response?.data : []);
    }
    else if(pathname == '/product'){
      const response = await fetchProduct({page: 1, per_page: limit});
      response?.status ? setData(response?.data) : setData(response?.data)
    }
    else if(pathname == '/user'){
      const response = await fetchUser({page: 1, per_page: limit});
      response?.status ? setData(response?.data) : setData(response?.data)
    } else if( pathname == '/pendingUserIdentification'){
      await fetchUser({page: 1, per_page:limit, identityVerificationStatus: 'Pending'})
    }
    else if(pathname == '/order'){
      const response = await fetchOrder({page: 1, per_page: limit});
      response?.status ? setData(response?.data) : setData(response?.data)
    }
    else if(pathname == '/withdraw-request') {
      const response = await fetchTransaction({page: 1, per_page: limit});
      response?.status ? setData(response?.data) : setData(response?.data)
    }
    else 
    // if(pathname?.includes('/user') ){
      if(hash == '#product'){
        const response = await userProduct({page: 1, per_page: limit, userId: userId});
        setData(response?.status ? response?.data : response?.data)        
      }else if(hash == '#sales'){
        const response = await userSell({page: 1, per_page: limit, userId: userId});
        setData(response?.status ? response?.data : response?.data) 
      }else if(hash == '#purchases'){
        const response = await userPurchased({page: 1, per_page: limit, userId: userId});        
        setData(response?.status ? response?.data : response?.data) 
      }
    else if(hash == '#transaction'){
        const response = await userTransaction({page: 1, per_page: limit, userId: userId});
        setData(response?.status ? response?.data : response?.data) 
      }
    // }
  }

  //  Handle delete
  function handleDelete(id: string | string[]) {
    const updatedData = Array.isArray(id)
      ? data.filter((item) => !id.includes(item.id))
      : data.filter((item) => item.id !== id);

    setData(updatedData);
  }

  //  Handle Filters and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  );

  function updateFilter(columnId: string, filterValue: string | any[]) {
    if (!Array.isArray(filterValue) && !isString(filterValue)) {
      throw new Error("filterValue data type should be string or array of any");
    }

    if (Array.isArray(filterValue) && filterValue.length !== 2) {
      throw new Error("filterValue data must be an array of length 2");
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: filterValue,
    }));
  }

  function applyFilters() {
    const searchTermLower = searchTerm.toLowerCase();

    return (
      sortedData
        .filter((item) => {
          const isMatchingItem = Object.entries(filters).some(
            ([columnId, filterValue]) => {
              if (
                Array.isArray(filterValue) &&
                typeof filterValue[1] === "object"
              ) {
                const itemValue = new Date(item[columnId]);
                return (
                  // @ts-ignore
                  itemValue >= filterValue[0] && itemValue <= filterValue[1]
                );
              }
              if (
                Array.isArray(filterValue) &&
                typeof filterValue[1] === "string"
              ) {
                const itemPrice = Math.ceil(Number(item[columnId]));
                return (
                  itemPrice >= Number(filterValue[0]) &&
                  itemPrice <= Number(filterValue[1])
                );
              }
              if (isString(filterValue) && !Array.isArray(filterValue)) {
                const itemValue = item[columnId]?.toString().toLowerCase();
                if (itemValue !== filterValue.toString().toLowerCase()) {
                  return false;
                }
                return true;
              }
            }
          );
          return isMatchingItem;
        })
        // global search after running filters
        .filter((item) =>
          Object.values(item).some((value) =>
            typeof value === "object"
              ? value &&
                Object.values(value).some(
                  (nestedItem) =>
                    nestedItem &&
                    String(nestedItem).toLowerCase().includes(searchTermLower)
                )
              : value && String(value).toLowerCase().includes(searchTermLower)
          )
        )
    );
  }

 
  //  Handle searching
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  function handleSearch(searchValue: string) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      if(pathname == "/product"){
        const response = await fetchProduct({ page: 1, per_page: 10, search: searchValue, order: "price" });
        response?.status ? setData(response?.data) : setData(response?.data)
      }else if(pathname == '/user'){
        await fetchUser({page: 1, per_page: 10, search: searchValue,})
      }else if( pathname == '/pendingUserIdentification'){
        await fetchUser({page: 1, per_page: 10, search: searchValue,identityVerificationStatus: 'Pending'})
      } else if(pathname == '/category'){
        const response = await fetchCategory({page: 1, per_page: 10, search: searchValue,});
        response?.status ? setData(response?.data) : setData([])
      } else if(pathname == '/order'){
        fetchOrder({page: 1, per_page: 10, search: searchValue,})
      } else if(pathname == '/banner'){
        const response = await fetchBanner({ search: searchValue,});
        response?.status ? setData(response?.data) : setData(response?.data)
      } else if(pathname == '/withdraw-request'){
        const response = await fetchTransaction({search: searchValue});
        response?.status ? setData(response?.data) : setData(response?.data)
      }
    }, 500);
    setSearchTerm(searchValue);
  }

  function searchedData() {
    if (!searchTerm) return sortedData;

    const searchTermLower = searchTerm.toLowerCase();

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        typeof value === "object"
          ? value &&
            Object.values(value).some(
              (nestedItem) =>
                nestedItem &&
                String(nestedItem).toLowerCase().includes(searchTermLower)
            )
          : value && String(value).toLowerCase().includes(searchTermLower)
      )
    );
  }

  // Reset search and filters
  function handleReset() {
    setData(() => initialData);
    handleSearch("");
    if (initialFilterState) return setFilters(initialFilterState);
  }

  // Set isFiltered and final filtered data
  const isFiltered = applyFilters().length > 0;
  function calculateTotalItems() {
    if (isFiltered) {
      return applyFilters().length;
    }
    if (searchTerm) {
      
      // return searchedData().length;
        return page?.total
    }
    return page?.total;
  }
  const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();
  const tableData = paginatedData(filteredAndSearchedData);

  // Go to first page when data is filtered and searched
  useEffect(() => {
    // handlePaginate(1);
  }, [isFiltered, searchTerm]);

  // useTable returns
  return {
    isLoading,
    isFiltered,
    // fetchProduct,
    tableData,
    handleParPageData,
    // pagination
    currentPage: page?.page,
    handlePaginate,
    totalItems: page?.total,
    // totalItems: calculateTotalItems(),
    // sorting
    sortConfig,
    handleSort,
    // row selection
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    // searching
    searchTerm,
    handleSearch,
    // filters
    filters,
    updateFilter,
    applyFilters,
    handleDelete,
    handleReset,
  };
}
