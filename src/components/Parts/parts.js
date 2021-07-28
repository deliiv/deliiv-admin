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
import { formateDate, formatTime } from "../../utils/formatDate";
import { commaDelimitNumber } from "../../utils/formatPrice";
import { useHistory, useRouteMatch } from "react-router";
import { useState } from "react";
import userService from "src/services/user.service";

const Parts = (props) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const parts = useSelector((state) => state.services.parts);
  const [modalId, setModalId] = useState("");
  //console.log(parts);

  const fields = [
    {
      key: "name",
      _style: { minWidth: "15%" },
      label: "Part",
    },
    {
      key: "date_created",
      _style: { minWidth: "1%" },
    },
    {
      key: "sub_service",
      label: "Sub Parts",
      _style: { minWidth: "1%" },
    },
  ];

  return (
    <>
      <CRow>
        <CCol>
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
                      <h3>Parts</h3>
                    </div>
                  }
                  scopedSlots={{
                    name: (service) => <td>{service.title}</td>,
                    date_created: (service) => (
                      <td>
                        {formateDate(service.date_created)}{" "}
                        {formatTime(service.date_created)}
                      </td>
                    ),
                    sub_service: (service) => (
                      <td>
                        <CButton
                          color="primary"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            history.push(`${url}/subpart-${service._id}`)
                          }
                        >
                          View
                        </CButton>
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

export default Parts;
