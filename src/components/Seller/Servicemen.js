import React, { useState } from "react";
import { useSelector } from "react-redux";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import { formateDate, formatTime } from "../../utils/formatDate";

const Servicemen = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const totalActiveSellers = useSelector((state) => state.dashbord.totalActiveSellers);
  const totalInActiveSellers = useSelector((state) => state.dashbord.totalInActiveSellers);

  const allSellers = useSelector((state) => state.seller.sellers);

  const [details, setDetails] = useState([])


  //console.log(servicemen);

  const widgetList = [
    {
      title: "Total Active Sellers",
      totalAmount: totalActiveSellers.toString() || "0",
    },
    {
      title: "Total Inactive Sellers",
      totalAmount: totalInActiveSellers.toString() || "0",
    },
    // { title: "Air Conditioner", totalAmount: "unavailable" || "0" },
  ];

  const fields = [
    {
      key: "firstName",
      _style: { minWidth: "15%" },
      label: "First Name",
    },
    {
      key: "lastName",
      _style: { minWidth: "15%" },
      label: "Last Name",
    },
    {
      key: "phone",
      _style: { minWidth: "15%" },
      label: "Phone Number",
    },
    {
      key: "active",
      _style: { minWidth: "15%" },
      label: "status",
    },
    {
      key: "last_login",
      _style: { minWidth: "1%" },
    },
    {
      key: "view",
      _style: { minWidth: "1%" },
      label: "Action",

    },
  ];

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  return (
    <>
      <CButton
        size="md"
        color="primary"
        className="mb-4 float-md-right"
        onClick={() => history.push(`${url}/add`)}
      >
        Add +
      </CButton>
      <WidgetsDropdown widgetList={widgetList} />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {allSellers && allSellers.length > 0 && (
                <CDataTable
                  items={allSellers}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Sellers</h3>
                    </div>
                  }
                  scopedSlots={{
                    firstName: (seller) => (
                      <td>
                          {seller ? seller.firstName : null}
                      </td>
                    ),
                    number: (serviceman) => (
                      <td>{serviceman ? serviceman.phone : null}</td>
                    ),
                    no_of_jobs: (serviceman) => (
                      <td>
                        {serviceman ? serviceman.numberOfJobs : "Not Available"}
                      </td>
                    ),
                    active_status: (serviceman) => (
                      <td>
                        {serviceman.active_status === true
                          ? "active"
                          : "inactive"}
                      </td>
                    ),
                    date_created: (serviceman) => (
                      <td>
                        {formateDate(serviceman.date_created)}{" "}
                        {formatTime(serviceman.date_created)}
                      </td>
                    ),
                    view: (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="info"
                            variant="outline"
                            // shape="square"
                            size="sm"
                            onClick={() => history.push(`${url}/details/${item.id}`)}>
                             View
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Servicemen;
