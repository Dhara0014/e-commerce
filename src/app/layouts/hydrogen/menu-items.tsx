import { routes } from '@/config/routes';
import { PiUserListDuotone, PiFolderDuotone,} from 'react-icons/pi';
import { BsBoxSeamFill, BsCartCheck } from 'react-icons/bs';
import { BiMoneyWithdraw, BiSolidCategory } from 'react-icons/bi';
import { IoIosSettings } from "react-icons/io";
import { CgDisplayFullwidth } from "react-icons/cg";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  // {
  //   name: 'Overview',
  // },
  // label end
  {
    name: 'Dashboard',
    href: routes.dashboard,
    icon: <PiFolderDuotone />,
  },
  // label start
  {
    name: 'Apps Kit',
  },
  // label end
  {
    name: 'User',
    href: '#',
    icon: <PiUserListDuotone />,
    dropdownItems: [
      {
        name : 'User',
        href: routes.users.user,
      },
      {
        name : 'Identification Approvals',
        href: routes.identificationApprovals,
      }
    ],
  },
  {
    name: 'Product',
    href: routes.products.product,
    icon: <BsBoxSeamFill />,
  },
  {
    name: 'Order',
    href: routes.orders.order,
    icon: <BsCartCheck />,  
  },
  {
    name: 'Category',
    href: routes.category.category,
    icon: <BiSolidCategory />,
  },
  {
    name: 'Banner',
    href: routes.banner.banner,
    icon: <CgDisplayFullwidth />,
  },
  {
    name: 'Withdraw Request',
    href: routes.withdrawRequest,
    icon: <BiMoneyWithdraw />,
  },
{
    name: 'Settings',
    href: routes.settings,
    icon: <IoIosSettings />,
  },
];
