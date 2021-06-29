import React from "react";
import { useSelector } from "react-redux";
import { CCard, CCardBody, CCol, CDataTable, CRow } from "@coreui/react";
import { formateDate, formatTime } from "../../utils/formatDate";
import { commaDelimitNumber } from "../../utils/formatPrice";

const Services = (props) => {
  const services = useSelector((state) => state.services.services);
  console.log(services);

  const fields = [
    {
      key: "name",
      _style: { minWidth: "15%" },
      label: "Service Type",
    },
    {
      key: "tag",
      _style: { minWidth: "15%" },
      label: "Tag",
    },
    {
      key: "price",
      _style: { minWidth: "15%" },
      label: "Price",
    },
    {
      key: "date_created",
      _style: { minWidth: "1%" },
    },
  ];

  return (
    <>
      <div>..Services</div>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {services && (
                <CDataTable
                  items={services}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Services</h3>
                    </div>
                  }
                  scopedSlots={{
                    name: (service) => <td>{service.title}</td>,
                    tag: (service) => <td>{service.tag}</td>,
                    price: (service) => (
                      <td>&#x20A6;{commaDelimitNumber(service.price)}</td>
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

export default Services;
