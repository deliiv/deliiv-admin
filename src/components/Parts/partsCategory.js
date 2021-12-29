import React from "react";
import { useSelector } from "react-redux";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
} from "@coreui/react";
import { useHistory, useRouteMatch, Route } from "react-router";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SubPartCategories from "./subPartCategory";

const Parts = (props) => {
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const parts = useSelector((state) => state.services.parts);
  const [modalId, setModalId] = useState("");
  const backgroundColor = useSelector((state) => state.UI.backgroundColor);
  //console.log(parts);

  const fields = [
    {
      key: "name",
      _style: { minWidth: "15%", textAlign: "center" },
      label: "Part",
    },
  ];

  return (
    <>
      <CRow>
        <CCol sm="3">
          <CCard>
            <CCardBody>
              {parts && (
                <CDataTable
                  items={parts}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Parts Categories</h3>
                    </div>
                  }
                  scopedSlots={{
                    name: (service) => (
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <NavLink
                          to={`${url}/subpart-${service._id}`}
                          style={{
                            border: `1px  solid ${backgroundColor}`,
                            padding: ".35rem 1rem",
                            borderRadius: "7.5px",
                            width: "100%",
                            display: "inline-block",
                          }}
                          activeStyle={{
                            color: "white",
                            backgroundColor: `${backgroundColor}`,
                          }}
                        >
                          {service.title}
                        </NavLink>
                      </td>
                    ),
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="9">
          <Route path={`${path}/subpart-:id`}>
            <SubPartCategories />
          </Route>
        </CCol>
      </CRow>
    </>
  );
};

export default Parts;
