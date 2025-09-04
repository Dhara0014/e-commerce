// import NotificationDropdown from '@/layouts/notification-dropdown';
// import RingBellSolidIcon from '@/components/icons/ring-bell-solid';

'use client';
import SettingsButton from '@/components/settings/settings-button';
import ProfileMenu from './profile-menu';

export default function HeaderMenuRight() {
  return (
    <div className="ms-auto grid shrink-0  items-center gap-2 text-gray-700 ">
     
      <SettingsButton />
      <ProfileMenu />
    </div>
  );
}
