import NAVITEM from './_navitem'
import Dash from './dashboard.svg'
import Order from './orders.svg'
import Users from './users.svg'
import Riders from './riders.svg'
import Notify from './notify.svg'
import Pay from './pay.svg'
import Verify from './verify.svg'
import Settings from './settings.svg'

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: <NAVITEM icon={Dash} name={"Dashboard"} />,
    to: "/",
  },
  {
    _tag: "CSidebarNavItem",
    name: <NAVITEM icon={Order}
    name={"Orders"} />,
    to: "/orders",
  },
  {
    _tag: "CSidebarNavItem",
    name: <NAVITEM icon={Users} name={"Customers"} />,
    to: "/customers",
  },
  {
    _tag: "CSidebarNavItem",
    name: <NAVITEM icon={Users} name={"Agencies"} />,
    to: "/agencies",
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: <NAVITEM icon={Riders} name={"Riders"} />,
    route: '/riders',
    _children: [

      {
        _tag: 'CSidebarNavItem',
        name: 'Agency Riders',
        to: '/riders',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Solo Riders',
        to: '/riders-solo',
      }

    ],
  },

  {
    _tag: "CSidebarNavItem",
    name: <NAVITEM icon={Notify} name={"Notifications"} />,
    to: "/notifications",
  },
  {
    _tag: "CSidebarNavItem",
    name: <NAVITEM icon={Pay} name={"Payment"} />,
    to: "/payment",
  },
  {
    _tag: "CSidebarNavItem",
    name: <NAVITEM icon={Verify} name={"Verify"} />,
    to: "/verification",
  },
  {
    _tag: "CSidebarNavItem",
    name: <NAVITEM icon={Settings} name={"Settings"} />,
    to: "/settings",
  }
];

export default _nav;
