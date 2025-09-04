/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import cn from "@/utils/class-names";
import Link from "next/link";
import { routes } from "@/config/routes";

export type BreadcrumbItemProps = {
  href?: string;
  className?: string;
  children?: any;
};

const BreadcrumbItem = ({
  href = "#",
  className,
  children,
// }: any) => (
}: BreadcrumbItemProps) => (
  <Link
    href={href}
    role="button"
    className={cn("inline-flex items-center gap-2 text-sm", className)}
  >
    {children}
  </Link>
);

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: React.ReactNode;
  disableCurrent?: boolean;
  children?: React.ReactNode;
  className?: string;
  separatorClassName?: string;
  separatorVariant?: "default" | "circle";
}

const Breadcrumb = ({
  separator = routes.dashboard || routes.dashboard,
  disableCurrent = true,
  children,
  className,
  separatorClassName,
  separatorVariant = "default",
}: any) => {
// }: BreadcrumbProps) => {
  const numOfItems = React.Children.count(children);

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      {React.Children.map(children, (child, index) => {
        // if (!React.isValidElement<BreadcrumbItemProps>(child)) return child;
        if (!React.isValidElement<BreadcrumbItemProps>(child)) return null;

        return (
          <React.Fragment>
            {React.cloneElement(child, {
              className: cn(
                "text-gray-700 last:text-gray-500 font-medium",
                disableCurrent && "last:pointer-events-none"
              ),
            })}
            {index < numOfItems - 1 &&
              (separatorVariant === "default" ? (
                <span
                  className={cn("text-sm text-gray-500", separatorClassName)}
                >
                  {separator}
                </span>
              ) : (
                <span className="h-1 w-1 rounded-full bg-gray-300" />
              ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.displayName = "Breadcrumb";
export default Breadcrumb;
