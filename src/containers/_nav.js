import NAVITEM from './_navitem'

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: "cil-speedometer",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Orders",
    to: "/orders",
    icon: "cil-gift",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Customers",
    to: "/customers",
    icon: "cil-group",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Seller",
    to: "/seller",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Category",
    to: "/category",
    icon: "cil-settings",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Parts Categories",
  //   to: "/parts-category",
  //   icon: "cil-view-column",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Costing",
  //   to: "/costing",
  //   icon: "cil-money",
  // },

  {
    _tag: 'CSidebarNavDropdown',
    name: <NAVITEM icon={<i class="fas fa-tasks"></i>
  } name={"Extras"} />,
    route: '/orders',
    _children: [
      
      {
        _tag: 'CSidebarNavItem',
        name: 'Service Charge', 
        to: '/service-charge',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Regions', 
        to: '/regions',
      },
      
    ],
  },

  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Components"],
  // },
  //
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Base",
  //   route: "/base",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Breadcrumb",
  //       to: "/base/breadcrumbs",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Cards",
  //       to: "/base/cards",
  //     },
  //   ],
  // },
];

export default _nav;
