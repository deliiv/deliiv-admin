import React from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  // CDropdown,
  // CDropdownMenu,
  // CDropdownItem,
  // CDropdownToggle,
} from "@coreui/react";
// import CIcon from "@coreui/icons-react";
// import ChartLineSimple from "../charts/ChartLineSimple";

import { useSelector } from "react-redux";

const WidgetsDropdown = (props) => {
  const backgroundColor = useSelector((state) => state.UI.backgroundColor);

  const WidgetList = props.widgetList.map((widget, i) => (
    <CCol sm="6" lg="3" key={i}>
      <CWidgetDropdown
        style={{ backgroundColor: backgroundColor }}
        header={widget.totalAmount}
        text={widget.title}
        footerSlot={<div style={{ height: "70px" }}></div>}
      ></CWidgetDropdown>
    </CCol>
  ));
  // render
  return (
    <CRow>
      {WidgetList}

      {/* <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header="9.823"
          text="Members online"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-location-pin"/>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol> */}
    </CRow>
  );
};

export default WidgetsDropdown;
