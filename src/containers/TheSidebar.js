import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import Logo from "../assets/images/deliiv.svg";

// sidebar nav config
import navigation from "./_nav";

//ui action for dispatch
import { uiActions } from "../store/ui-slice";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.UI.sidebarShow);

  return (
    <CSidebar
      show={show}
      unfoldable
      onShowChange={() => dispatch(uiActions.toggleSidebarMobile())}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={Logo} alt="sendmeerrand Logo" style={{ height: "100px", paddingTop:20, paddingBottom:20 }} />
      </CSidebarBrand>

      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
        <CSidebarNavDivider />
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
