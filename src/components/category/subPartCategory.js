import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CDataTable,
  CButton,
  CModal,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import userService from "src/services/user.service";
import { formateDate, formatTime } from "src/utils/formatDate";
import AddSubPartCategory from "./addSubPartCategory";

const SubPartCategories = (props) => {
  const [subParts, setSubParts] = useState("");
  const [subPartModal, setSubPartModal] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    userService
      .getAllSubpartCategoryWithId(id)
      .then((res) => {
        setSubParts(res.data.sub_part_category);
      })
      .catch((error) => console.log(error));
  }, []);

  const fields = [
    {
      key: "title",
      _style: { minWidth: "15%" },
      label: "Part",
    },
    {
      key: "date_created",
      _style: { minWidth: "1%" },
    },
    {
      key: "sub_service",
      label: "Add Part",
      _style: { minWidth: "1%" },
    },
    {
      key: "action",
      label: "Actions",
      _style: { minWidth: "1%" },
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
          onClick={() => setSubPartModal(true)}
        >
          Add SubPart+
        </CButton>
      </div>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
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
                    date_created: (service) => (
                      <td>
                        {formateDate(service.date_created)}{" "}
                        {formatTime(service.date_created)}
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

export default SubPartCategories;
