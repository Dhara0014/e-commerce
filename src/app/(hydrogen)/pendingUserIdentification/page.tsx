/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import PageHeader from "@/app/shared/page-header";
import { UserListTable } from "@/components/dashboard/file-list/table";
import HydrogenLayout from "@/app/layouts/hydrogen/layout";
import { routes } from "@/config/routes";
import useUser from "@/hooks/use-user";

const pageHeader = {
  title: "Pending Identification Approvals",
  breadcrumb: [
    // {
    //   href: routes.users.user,
    //   name: "Home",
    // },
    // {
    //   href: routes.users.user,
    //   name: "User",
    // },
    // {
    //   name: "List",
    // },
  ],
};

export default function Page() {
  const { users, isLoading, deleteUser, changeUserStatus } = useUser();
  return (
    <HydrogenLayout>
      <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <UserListTable
          data={users}
          isLoading={isLoading}
          onDelete={deleteUser}
          onStatusChange={changeUserStatus}
        />
      )} 
      </>
    </HydrogenLayout>
  );
}
