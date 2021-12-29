import {
  CDataTable,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
  CSpinner,
  CButton,
} from "@coreui/react";
import React from "react";
import { formateDate, formatTime } from "../../utils/formatDate";
import { getBadge } from "../../utils/orderStatusColor";
import UserService from "../../services/user.service";
import LocalStorage from "../../utils/localstorage";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";

const Serviceman = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [serviceman, setServiceman] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    UserService.getServiceman(id)
      .then((res) => {
        setServiceman(res.data);
        setLoading(false);
        //console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //UI color from ui store
  const backgroundColor = useSelector((state) => state.UI.backgroundColor);

  //datatable fields
  const fields = [
    {
      key: "description",
      _style: { minWidth: "15%" },
      label: "Description",
    },
    {
      key: "date_created",
      _style: { minWidth: "1%" },
    },
    {
      key: "status",
      label: "Status",
      _style: { minWidth: "1%" },
    },
    {
      key: "order_id",
      label: "Order ID",
      _style: { minWidth: "1%" },
    },
    {
      key: "view",
      label: "View Order",
      _style: { minWidth: "1%" },
    },
  ];

  return (
    <>
      {loading && <CSpinner className="loader" grow size="lg" />}
      {serviceman && (
        <CRow>
          <CCol sm="12">
            <CCard>
              <CCardTitle
                className="p-3 m-0 space-out"
                style={{ backgroundColor: backgroundColor }}
              >
                <span>
                  <img
                    alt={`${serviceman.serviceMen[0].name}`}
                    src={serviceman.serviceMen[0].image}
                    style={{
                      height: "2rem",
                      width: "2rem",
                      borderRadius: "50%",
                      marginRight: "2rem",
                    }}
                  />
                </span>
                {serviceman.serviceMen[0].name}
              </CCardTitle>
              {serviceman && (
                <CCardBody>
                  <p className="space-out">
                    <strong>Phone:</strong>
                    <span>{serviceman.serviceMen[0].phone}</span>
                  </p>
                  <p className="space-out">
                    <strong>Email:</strong>
                    <span>{serviceman.serviceMen[0].email}</span>
                  </p>
                  <p className="space-out">
                    <strong>Address:</strong>
                    <span>{serviceman.serviceMen[0].address}</span>
                  </p>
                </CCardBody>
              )}
            </CCard>

            {serviceman.pending && (
              <CDataTable
                items={serviceman.pending}
                fields={fields}
                items-per-page-select
                items-per-page="5"
                hover
                pagination
                table-filter
                cleaner
                overTableSlot={
                  <div className="center-flex">
                    <h3>Jobs</h3>
                  </div>
                }
                scopedSlots={{
                  date_created: (serviceman) => (
                    <td>
                      {formateDate(serviceman.date_created)}{" "}
                      {formatTime(serviceman.date_created)}
                    </td>
                  ),
                  view: (order) => (
                    <td>
                      <CButton
                        color="primary"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          history.push(`/orders/order-${order._id}`)
                        }
                      >
                        View
                      </CButton>
                    </td>
                  ),
                }}
              />
            )}
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default Serviceman;
