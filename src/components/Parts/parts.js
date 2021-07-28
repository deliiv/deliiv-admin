import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CDataTable,
  CButton,
  CSpinner,
  CModal,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import userService from "src/services/user.service";
import { commaDelimitNumber } from "src/utils/formatPrice";
import AddPart from "./addPart";

const Parts = (props) => {
  const [loading, setLoading] = useState(false);
  const [partModal, setPartModal] = useState(false);
  const [parts, setParts] = useState("");
  const { partsId } = useParams();

  useEffect(() => {
    setLoading(true);
    userService
      .getParts(partsId)
      .then((res) => {
        setParts(res.data.part);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [partsId]);

  const fields = [
    {
      key: "title",
      _style: { minWidth: "15%" },
      label: "Part",
    },
    {
      key: "price",
      label: "Fees",
    },
    {
      key: "view",
      label: "Actions",
      _style: { minWidth: "1%", textAlign: "center" },
    },
  ];

  return (
    <>
      <CModal
        show={partModal}
        backdrop
        centered
        fade
        onClosed={() => setPartModal(false)}
      >
        <AddPart id={partsId} />
      </CModal>
      <CRow style={{ position: "relative" }}>
        {loading && (
          <CSpinner
            className="loader"
            style={{ position: "absolute", height: "3.5rem", width: "3.5rem" }}
            size="sm"
          />
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            top: "1rem",
            right: "2rem",
            zIndex: "200",
          }}
        >
          <CButton
            size="md"
            color="success"
            className="mb-4"
            onClick={() => setPartModal(true)}
          >
            Add Part+
          </CButton>
        </div>
        <CCol sm="12">
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
                    price: (part) => (
                      <td>&#x20A6; {commaDelimitNumber(part.price)}</td>
                    ),
                    view: (service) => (
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <CButton
                          color="warning"
                          variant="outline"
                          size="sm"
                          className="mx-1"
                        >
                          edit
                        </CButton>
                        <CButton
                          color="danger"
                          variant="outline"
                          size="sm"
                          className="mx-1"
                        >
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
    </>
  );
};

export default Parts;