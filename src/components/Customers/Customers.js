import { CCard, CCardBody, CCol, CDataTable, CRow } from "@coreui/react";
import React from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { Link, useRouteMatch } from "react-router-dom";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";

const Customers = (props) => {
  const { path, url } = useRouteMatch();

  const customers = useSelector((state) => state.users.users);
  const totalCustomers = useSelector((state) => state.dashbord.totalUsers);


  const fields = [
    {
      key: "firstname",
      _style: { minWidth: "15%" },
      label: "First Name",
    },
    {
      key: "lastname",
      _style: { minWidth: "15%" },
      label: "Last Name",
    },
    {
      key: "customernumber",
      _style: { minWidth: "15%" },
      label: "Number",
    },
    {
      key: "customeaddress",
      _style: { minWidth: "15%" },
      label: "Address",
    },
    {
      key: "customeremail",
      _style: { minWidth: "15%" },
      label: "Email",
    },
    {
      key: "last_login",
      _style: { minWidth: "1%" },
    },
  ];

  const widgetList = [
    {
      title: "Total Customers",
      totalAmount: totalCustomers.toString() || "0",
    },
  ];

  return (
    <>
      <WidgetsDropdown widgetList={widgetList} />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {customers && (
                <CDataTable
                  items={customers}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  columnFilter
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Customers</h3>
                    </div>
                  }
                  scopedSlots={{
                    customername: (customer) => (
                      <td>
                        <Link
                          to={{
                            pathname: `${url}/customer-${customer._id}`,
                          }}
                        >
                          {customer ? customer.fullname : null}
                        </Link>
                      </td>
                    ),
                    customernumber: (customer) => (
                      <td>{customer ? customer.phone : null}</td>
                    ),
                    customeaddress: (customer) => (
                      <td>
                        {customer.address ? customer.address : "Not Available"}
                      </td>
                    ),
                    customeremail: (customer) => (
                      <td>{customer ? customer.email : null}</td>
                    ),
                    date_created: (customer) => (
                      <td>
                        {formateDate(customer.date_created)}{" "}
                        {formatTime(customer.date_created)}
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

export default Customers;
