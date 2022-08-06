import NAVITEM from './_navitem'
import Dash from './dashboard.svg'
import Order from './orders.svg'
import Users from './users.svg'
import Riders from './riders.svg'
import Notify from './notify.svg'
import Pay from './pay.svg'
import Verify from './verify.svg'
import Settings from './settings.svg'
import LocalStorage from "../../src/utils/localstorage";

const userData = LocalStorage.get("user_data");


let ver = {
  _tag:  "CSidebarNavItem",
  name:  <NAVITEM icon={Verify} name={"Verify"} />,
  to: "/verification",
}

console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%<<',userData)


let _nav =  [
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
    name: userData.notification_access && <NAVITEM icon={Notify} name={"Notifications"} />,
    to:  userData.notification_access &&  "/notifications",
  },
  {
    _tag:  "CSidebarNavItem",
    name: userData.payment_approval && <NAVITEM icon={Pay} name={"Payment"} />,
    to:  userData.payment_approval && "/payment",
  },
  {
    _tag:  "CSidebarNavItem",
    name:  userData.account_verify &&<NAVITEM icon={Verify} name={"Verify"} />,
    to: userData.account_verify &&  "/verification",
  },
  {
    _tag: "CSidebarNavItem",
    name: userData.setting_access && <NAVITEM icon={Settings} name={"Settings"} />,
    to: userData.setting_access && "/settings",
  }
]



 export default _nav;
