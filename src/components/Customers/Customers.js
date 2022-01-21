import { CCard, CCardBody,CButton, CCol, CDataTable, CRow } from "@coreui/react";
import React from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import OrderDetails from './OrderDetails'

const Customers = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

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
      key: "customeremail",
      _style: { minWidth: "15%" },
      label: "Email",
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
                    firstname: (customer) => (
                      <td>
                          {customer ? customer.firstname : null}
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
                    view: (customer) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="info"
                            variant="outline"
                            // shape="square"
                            size="sm"
                            onClick={() => history.push(`${url}/details/${customer.id}`)}>
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

export default Customers;
