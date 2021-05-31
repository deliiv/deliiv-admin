import React from "react";
import { useSelector } from "react-redux";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import { CCard, CCardBody, CCol, CDataTable, CRow } from "@coreui/react";
import { Link, useRouteMatch } from "react-router-dom";

import { formateDate, formatTime } from "../../utils/formatDate";

const Servicemen = (props) => {
  const { path, url } = useRouteMatch();

  const servicemen = useSelector((state) => state.servicemen.servicemen);
  const totalServicemen = useSelector(
    (state) => state.servicemen.totalServicemen
  );

  //console.log(servicemen);

  const widgetList = [
    {
      title: "Total Servicemen",
      totalAmount: totalServicemen.toString() || "0",
    },
    {
      title: "Generator",
      totalAmount: "unavailable" || "0",
    },
    { title: "Air Conditioner", totalAmount: "unavailable" || "0" },
  ];

  const fields = [
    {
      key: "name",
      _style: { minWidth: "15%" },
      label: "Name",
    },
    {
      key: "number",
      _style: { minWidth: "15%" },
      label: "Phone Number",
    },
    {
      key: "no_of_jobs",
      _style: { minWidth: "15%" },
      label: "No of Jobs",
    },
    {
      key: "active_status",
      _style: { minWidth: "15%" },
      label: "status",
    },
    {
      key: "date_created",
      _style: { minWidth: "1%" },
    },
  ];

  return (
    <>
      <WidgetsDropdown widgetList={widgetList} />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {servicemen && (
                <CDataTable
                  items={servicemen}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  table-filter
                  cleaner
                  scopedSlots={{
                    name: (serviceman) => (
                      <td>
                        <Link
                          to={{
                            pathname: `${url}/serviceman`,
                            state: serviceman._id,
                          }}
                        >
                          {serviceman ? serviceman.name : null}
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
