/* eslint-disable @typescript-eslint/no-explicit-any */

import cn from '@/utils/class-names';
import React from 'react';
import { Avatar ,Text, type AvatarProps } from 'rizzui';

// export function capitalizeFirstLetter(str: string): string {
//   const formattedStr = str
//   .replace(/([a-z])([A-Z])/g, "$1 $2")
//   .trim();

// return str
//   .split(" ")
//   .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
//   .join(" ");
// }

export function capitalizeFirstLetter(str: string | undefined | null): string {
  if (!str || typeof str !== 'string') {
    return ''; // Return an empty string or a default value for invalid input
  }

  const formattedStr = str.replace(/([a-z])([A-Z])/g, "$1 $2").trim();

  return formattedStr
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" ");
}


interface AvatarCardProps {
  src: string;
  name: string;
  className?: string;
  description?: string;
  avatarProps?: AvatarProps;
  description_name?: any;
}

export default function AvatarCard({
  src,
  name,
  className,
  description,
  avatarProps,
  description_name,
}: AvatarCardProps) {
  return (
    <figure className={cn('flex items-center gap-3', className)}>
      <Avatar name={name} src={src} {...avatarProps} />
      <figcaption className="grid gap-0.5">
        <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700" title={name}>
          {capitalizeFirstLetter(name)}
        </Text>
        {description && (
          // <Text className="text-[13px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap " title={description}>{description}</Text>
          <div className='flex'>
          {description_name && <span> {description_name} </span>}
          <Text className="text-[13px] text-gray-500 overflow-hidden whitespace-wrap " title={description}>{description?.length > 70 ? `${description?.slice(0,70)}...` : description}</Text>
          </div>
        )}
      </figcaption>
    </figure>
  );
}
