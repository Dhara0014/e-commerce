/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { Button, Popover, Text, Title, Select, Textarea } from 'rizzui';

type StatusPopoverProps = {
  title: string;
  description: string;
  currentStatus: string;
  currentComment?:any;
  options: { value: string; label: string }[];
  onStatusChange: (id:any,status: string, comment: string) => void;
  id?:any;
};

export default function StatusPopover({
  title,
  description,
  currentStatus,
  currentComment,
  id,
  options,
  onStatusChange,
}: StatusPopoverProps) {
  const [tempStatus, setTempStatus] = React.useState(currentStatus);
  const [comment, setComment] = React.useState(currentComment || "");
  const [error, setError] = React.useState('');

  const handleSave = async(setOpen: (open: boolean) => void) => {
    if (!comment.trim()) {
      setError('Please add a comment before saving.');
      return;
    }
    const response:any = await onStatusChange(id,tempStatus, comment);
    if(response){
      setError('');
    } else{
      setComment(currentComment)
    }
    
    setOpen(false);
  };

  const handleCancel = (setOpen: (open: boolean) => void) => {
    setTempStatus(currentStatus);
    setComment('');
    setError('');
    setOpen(false);
  };

  return (
    <Popover placement="bottom">
      <Popover.Trigger>
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer hover:border-gray-700"
        >
          {currentStatus || 'Change Status'}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        {({ setOpen }) => (
          <div className="w-64 pb-2 pt-1 text-left">
            <Title as="h6" className="text-sm text-gray-700 mb-1">
              {title}
            </Title>
            <Text className="text-gray-500 mb-2">{description}</Text>
            <div className="mb-3">
              <Select
                options={options}
                value={tempStatus}
                onChange={(value: string) => setTempStatus(value)}
                placeholder="Select a status"
                getOptionValue={(option) => option.value}
              />
            </div>
            <div className="mb-3">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Add your comment here..."
              />
            </div>
            {error && <Text className="text-red-500 text-sm mb-2">{error}</Text>}
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                className="h-7"
                onClick={() => handleSave(setOpen)}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => handleCancel(setOpen)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
