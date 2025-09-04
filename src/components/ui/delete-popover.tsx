/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { PiTrashFill } from 'react-icons/pi';
import { ActionIcon, Button, Popover, Text, Title } from 'rizzui';
import TrashIcon from '../icons/trash';
import EyeIcon from '../icons/eye';

type DeletePopoverProps = {
  title?: string;
  description?: string;
  onDelete?: () => void;
  isLoading?: boolean;
};

export default function DeletePopover({
  title,
  description,
  onDelete,
}: DeletePopoverProps) {
  return (
    <Popover placement="left">
      <Popover.Trigger>
        <ActionIcon
          size="sm"
          variant="outline"
          aria-label={'Delete Item'}
          className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
        >
          <TrashIcon className="h-4 w-4" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content>
        {({ setOpen }) => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
            >
              <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
            </Title>
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            <div className="flex items-center justify-end">
              <Button size="sm" className="me-1.5 h-7" onClick={onDelete}>
                Yes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}

export function CancleOrderPopover({
  title,
  description,
  onDelete,
  isLoading,
}: DeletePopoverProps) {
  return (
    <Popover placement="left">
      <Popover.Trigger>
        {/* <ActionIcon
          size="sm"
          variant="outline"
          aria-label={'Delete Item'}
          className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
        > */}
          {/* <TrashIcon className="h-4 w-4" /> */}
           <Button variant="outline" color="danger" className="ml-auto" isLoading={isLoading}>
          Cancle Order
       </Button>
        {/* </ActionIcon> */}
      </Popover.Trigger>
      <Popover.Content>
        {({ setOpen }) => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
            >
              <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
            </Title>
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            <div className="flex items-center justify-end">
              <Button size="sm" className="me-1.5 h-7" onClick={onDelete}>
                Yes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}

export function CommentPopover({
  title,
  description,
}: DeletePopoverProps) {
  return (
    <Popover placement="left" >
      <Popover.Trigger>
        <ActionIcon
          size="sm"
          variant="outline"
          aria-label={'Comment Item'}
          className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
          // title='view comment'
        >
          <EyeIcon className="h-4 w-4" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content>
        {({ setOpen }) => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
            >
              {/* <EyeIcon className="me-1 h-[17px] w-[17px]"/>  */}
              
              {title}
            </Title>
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            {/* <div className="flex items-center justify-end">
              <Button size="sm" className="me-1.5 h-7" onClick={onDelete}>
                Yes
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
            </div> */}
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
