import { CCard, CCardBody, CButton, CCol, CDataTable, CRow, CInput, CFormGroup } from "@coreui/react";
import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { useRouteMatch, useHistory } from "react-router-dom";

const Customers = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const customers = useSelector((state) => state.users.users);
  
  const fields = [
    {
      key: "firstname",
      label: "First Name",
    },
    {
      key: "lastname",
      label: "Last Name",
    },

    {
      key: "customeremail",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "view",
      label: "Action",

    },
  ];

  return (
    <>
      <CRow>

        <CCol>

          <CCard>
            <CFormGroup>
              <div style={{ width: "40%", display: "flex", flexDirection: 'row', padding: "30px" }}>
                <CInput placeholder="search" style={{ padding: 20 }} />
                <CButton color="primary" style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}>Search</CButton>
              </div>
            </CFormGroup>
            <CCardBody>
              {customers && (
                <CDataTable
                  items={customers}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  overTableSlot={
                    <div className="center-flex">
                    </div>
                  }
                  scopedSlots={{
                    firstname: (customer) => (
                      <td>
                        {customer ? customer.firstName : null}
                      </td>
                    ),
                    lastname: (customer) => (
                      <td>
                        {customer ? customer.lastName : null}
                      </td>
                    ),
                    phone: (customer) => (
                      <td>
                        {customer ? customer.phone_number : null}
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
                            onClick={() => history.push(`${url}/details/${customer._id}`)}>
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
