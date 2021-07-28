import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CDataTable,
  CButton,
  CModal,
  CSpinner,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useParams, Route, useRouteMatch, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import userService from "src/services/user.service";
import AddSubPartCategory from "./addSubPartCategory";
import Parts from "./parts";

const SubPartCategories = (props) => {
  const [loading, setLoading] = useState(false);
  const backgroundColor = useSelector((state) => state.UI.backgroundColor);
  const [subParts, setSubParts] = useState("");
  const [subPartModal, setSubPartModal] = useState(false);
  const { id } = useParams();
  const { path, url } = useRouteMatch();
  useEffect(() => {
    setLoading(true);
    userService
      .getAllSubpartCategoryWithId(id)
      .then((res) => {
        setSubParts(res.data.sub_part_category);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const fields = [
    {
      key: "title",
      _style: { minWidth: "15%", textAlign: "center" },
      label: "Part",
    },
  ];

  return (
    <>
      <CModal
        show={subPartModal}
        backdrop
        centered
        fade
        onClosed={() => setSubPartModal(false)}
      >
        <AddSubPartCategory id={id} />
      </CModal>
      <CRow>
        <CCol sm="4.5">
          <CCard style={{ position: "relative" }}>
            {loading && (
              <CSpinner
                className="loader"
                style={{
                  position: "absolute",
                  height: "3.5rem",
                  width: "3.5rem",
                }}
                size="sm"
              />
            )}
            <CCardBody style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  position: "absolute",
                  top: ".5rem",
                  right: "1rem",
                  zIndex: "200",
                }}
              >
                <CButton
                  size="md"
                  color="primary"
                  className="mb-4"
                  onClick={() => setSubPartModal(true)}
                >
                  Add SubPart+
                </CButton>
              </div>
              {subParts && (
                <CDataTable
                  items={subParts}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>SubPart Categories</h3>
                    </div>
                  }
                  scopedSlots={{
                    title: (service) => (
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <NavLink
                          to={`${url}/parts-${service._id}`}
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
        <CCol>
          <Route path={`${path}/parts-:partsId`}>
            <Parts />
          </Route>
        </CCol>
      </CRow>
    </>
  );
};

export default SubPartCategories;
