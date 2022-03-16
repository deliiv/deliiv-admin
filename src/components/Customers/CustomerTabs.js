import React, { useState } from "react";
import {
  CCol,
  CRow,
} from "@coreui/react";
import CustomerPayload from "./CustomerPayload";

const Tabs = ({ paystack, adminTopups, topusers }) => {
  const [active, setActive] = useState(1);
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.";

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CustomerPayload/>
 </CCol>
    </CRow>
  );
};

export default Tabs;
