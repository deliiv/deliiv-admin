import { CCard, CCardBody, CButton, CCol, CDataTable, CRow, CInput, CFormGroup, CNavLink, CNavItem, CCallout, CTabPane, CTabContent, CNav, CTabs } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from 'react-router-dom'
import Spinner from "src/Spinner";
import { formateDate, formatTime } from "../../../utils/formatDate";

const Online = ({ online }) => {

  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [loader, setLoader] = useState(true)

  useEffect(() => {

    if (online) {
      setLoader(false)

    }
  }, [online])


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
      key: "phone",
      _style: { minWidth: "15%" },
      label: "Phone Number",
    },
    {
      key: "email",
      _style: { minWidth: "15%" },
      label: "Email",
    },
    {
      key: "status",
      _style: { minWidth: "1%" },
    },
    {
      key: "view",
      _style: { minWidth: "1%" },
      label: "Action",

    },
  ];

  return (
    <>
      <CRow>

        <CCol>
          {loader && <Spinner width={20} height={20} />}

          <CCard>

            <CCardBody>

              {online && (
                <CDataTable
                  items={online}
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
                    email: (customer) => (
                      <td>{customer ? customer.email : null}</td>
                    ),

                    status: (rider) => (
                      <td>{rider && rider.account_verified ? <p style={{ color: "green" }}>Verified</p> : <p style={{ color: "red" }}>Unverified</p>}</td>
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

                            onClick={() => history.push({
                              pathname: `/riders/details/${customer._id}`,
                              state: { pathname: "user" }
                            })}>
                            View
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
              )}
            </CCardBody>


            {/* <RidersDetails/> */}

          </CCard>

        </CCol>

      </CRow>
    </>
  );
};

export default Online;
