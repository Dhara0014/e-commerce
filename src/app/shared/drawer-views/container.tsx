/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDrawer } from './use-drawer';
import { Drawer } from 'rizzui';

export default function GlobalDrawer() {
  const { isOpen, view, placement, customSize, closeDrawer } = useDrawer();
  const pathname = usePathname();
  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const numericPlacement = placement ? Number(placement) : undefined;
  const numericCustomSize = customSize ? Number(customSize) : undefined;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      placement={placement}
      // customSize={customSize}
      // placement={numericPlacement}
      customSize={numericCustomSize}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      containerClassName="dark:bg-gray-100"
      className="z-[9999]"
    >
      {view}
    </Drawer>
  );
}
