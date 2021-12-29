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
  CSpinner,
} from "@coreui/react";
import { formateDate, formatTime } from "../../utils/formatDate";
import { commaDelimitNumber } from "../../utils/formatPrice";
import { useHistory, useRouteMatch } from "react-router";
import { useState } from "react";
import userService from "src/services/user.service";
import { findArgInArray } from "src/utils/findArgInArray";

const Services = (props) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const category = useSelector((state) => state.category);
  const parts = useSelector((state) => state.services.parts);
  const [modalId, setModalId] = useState("");
  const [loading, setLoading] = useState(false);
  const createPartCategory = (title, service_id) => {
    setLoading(true);
    const data = {
      title: title,
      service: service_id,
    };
    userService
      .addPartCategory(data)
      .then(() => {
        history.push("/parts-category");
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const fields = [
    {
      key: "image",
      _style: { minWidth: "15%" },
      label: "Image",
    },
    {
      key: "name",
      _style: { minWidth: "15%" },
      label: "Service Type",
    },

    {
      key: "action",
      label: "Actions",
      _style: { minWidth: "1%" },
    },
  ];

  return (
    <>
      {loading && <CSpinner className="loader" size="lg" />}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CButton
          size="md"
          color="primary"
          className="mb-4"
          onClick={() => history.push(`${url}/add-category`)}
        >
          Add Category+
        </CButton>
      </div>
      {category &&  (
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>
                {category && (
                  <CDataTable
                    items={category.categories}
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
                      image: (service) => <td><img  style={{ objectFit: 'cover',width: '50%'
                      }}src={service.image_url} width ={'50px'} height={'100px'}/></td>,
                    //   tag: (service) => <td>{service.tag}</td>,
                    //   // price: (service) => (
                    //   //   // <td>&#x20A6;{commaDelimitNumber(service.price)}</td>
                    //   // ),
                    //   date_created: (service) => (
                    //     <td>
                    //       {formateDate(service.date_created)}{" "}
                    //       {formatTime(service.date_created)}
                    //     </td>
                    //   ),
                    //   part_category: (part) => (
                    //     <td>
                    //       <CButton
                    //         color="primary"
                    //         variant="outline"
                    //         size="sm"
                    //         className="mx-1"
                    //         onClick={() =>
                    //           createPartCategory(part.title, part._id)
                    //         }
                    //         disabled={findArgInArray(
                    //           parts.map((prt) => prt.title),
                    //           part.title
                    //         )}
                    //       >
                    //         Create Part Category
                    //       </CButton>
                    //     </td>
                    //   ),
                      action: (category) => (
                        <td>
                          <CButton
                            color="warning"
                            variant="outline"
                            size="sm"
                            className="mx-1"
                            onClick={() =>
                              history.push({
                                pathname: `${url}/update/${category.id}`,
                                state: {
                                  title: category.title,
                                  tag: category.tag,
                                },
                              })
                            }
                          >
                            edit
                          </CButton>
                          <CButton
                            color="danger"
                            variant="outline"
                            size="sm"
                            className="mx-1"
                            onClick={() => setModalId(category.id)}
                          >
                            <CModal
                              show={modalId === category.id}
                              backdrop
                              centered
                              fade
                              onClosed={() => setModalId("")}
                            >
                              <CRow>
                                <CCol>
                                  <div className="p-5">
                                    Are you sure you want to delete{" "}
                                    {category.title} category?
                                    <span
                                      className="text-primary px-3 hoverline"
                                      onClick={() => {
                                        userService
                                          .deleteService(category.id)
                                          .then(() => {
                                            window.location.reload();
                                          })
                                          .catch((error) => {
                                            console.log(error);
                                          });
                                      }}
                                    >
                                      Yes
                                    </span>
                                    {/* <span
                                    onClick={() => setModalId("jhjjjjj")}
                                    className="text-danger px-3 hoverline"
                                  >
                                    No
                                  </span> */}
                                  </div>
                                </CCol>
                              </CRow>
                            </CModal>
                            delete
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
      )}
    </>
  );
};

export default Services;
