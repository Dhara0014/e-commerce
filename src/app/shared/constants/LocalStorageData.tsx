
/* eslint-disable @typescript-eslint/no-explicit-any */

// export const LocalStorageGetItem = (name) => {
//     const user = localStorage.getItem(name);
//     return user != null || undefined ? JSON.parse(user) : []
// }

import { routes } from "@/config/routes";
// export const LocalStorageSetItem = (name, value) => {
//     return localStorage.setItem(name, JSON.stringify(value))
// }

// export const LocalStorageRemoveItem = (name) => {
//     return localStorage.removeItem(name);
// }

export const LocalStorageGetItem = (name:any) => {
    if (typeof window !== 'undefined' && localStorage) {
    // if (typeof window !== 'undefined'  && typeof localStorage !== "undefined") {
      const user = localStorage.getItem(name);
      return user ? JSON.parse(user) : [];
    }
    return [];
  };
  
  export const LocalStorageSetItem = (name:any, value:any) => {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(name, JSON.stringify(value));
      return true;
    }
    return false;
  };
  
  export const LocalStorageRemoveItem = (name:any) => {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem(name);
      return true;
    }
    return false;
  };

  // export const LogOutHandler = () => {
  //   const router = useRouter();
  //   return (
  //     router.push(routes.auth.signIn),
  //     localStorage.clear()
  //   )
  // }

  export const LogOutHandler = (router: any) => {
    localStorage.clear();
    router.push(routes.auth.signIn);
  };
  