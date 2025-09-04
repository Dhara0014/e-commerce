    export const routes = {
        auth: {
            signIn: '/signin',
            forgotPassword: '/forgot-password',
            otp: '/otp',
            resetPassword: 'reset-password',
        },
        profile: '/profile',
        forms: {
            profileSettings: '/forms/profile-settings',
            notificationPreference: '/forms/profile-settings/notification',
            personalInformation: '/forms/profile-settings/profile',
            newsletter: '/forms/newsletter',
          },
        dashboard: "/dashboard",
        identificationApprovals: '/pendingUserIdentification',
        users: {
            user: "/user",
            userDetails: (id: string) => `/user/${id}`,
            editUser: (id: string) => `/user/${id}/edit`,
        },
        orders: {
            order: "/order",
            orderDetails: (id: string) => `/order/${id}`,
            editOrder: (id: string) => `/order/${id}/edit`,
            createOrder: '/order/create',
        },
        products: {
            product: "/product",
            productDetails: (id: string) => `/product/${id}`,
            ediProduct: (id: string) => `/product/${id}/edit`,
            createProduct: '/product/create',
        },
        category: {
            category: "/category",
            categoryDetails: (id: string) => `/category/${id}`,
            editCategory: (id: string) => `/category/${id}/edit`,
        },
        banner: {
            banner: '/banner',
            bannerDetails: (id: string) => `/banner/${id}`,
            editBanner: (id: string) => `/banner/${id}/edit`,
        },
        withdrawRequest: "/withdraw-request",
        settings: "/settings"
    }