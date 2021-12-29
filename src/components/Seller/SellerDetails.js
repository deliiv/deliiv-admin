import React from "react";
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

  const servicemen = useSelector((state) => state.servicemen.servicemen);
  const totalActiveSellers = useSelector((state) => state.dashbord.totalActiveSellers);
  const totalInActiveSellers = useSelector((state) => state.dashbord.totalInActiveSellers);

  const allSellers = useSelector((state) => state.seller.sellers);

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
  ];

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
                      <h3>Seller Info</h3>
                    </div>
                  }
                  scopedSlots={{
                    firstName: (serviceman) => (
                      <td>
                        <Link
                          to={{
                            pathname: `${url}/serviceman-${serviceman._id}`,
                          }}
                        >
                          {serviceman ? serviceman.firstName : null}
                        </Link>
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
