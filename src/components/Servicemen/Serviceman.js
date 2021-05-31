import {
  CBadge,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
  CSpinner,
} from "@coreui/react";
import React from "react";
import { formateDate, formatTime } from "../../utils/formatDate";
import { getBadge } from "../../utils/orderStatusColor";
import UserService from "../../services/user.service";
import LocalStorage from "../../utils/localstorage";
import { useSelector } from "react-redux";

const Serviceman = (props) => {
  const [serviceman, setServiceman] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    let servicemanRouteState;
    if (props.location.state) {
      //localStorage.setItem('servicemanRouteState', JSON.stringify(this.props.location.state))
      LocalStorage.set("servicemanRouteState", props.location.state);
      servicemanRouteState = props.location.state;
    } else {
      servicemanRouteState = LocalStorage.get("servicemanRouteState");
      //if(servicemanRouteState) servicemanRouteState = JSON.parse(servicemanRouteState)
    }

    if (servicemanRouteState) {
      //use servicemanRouteState ahead
      //setServiceman(servicemanRouteState);
      UserService.getServiceman(servicemanRouteState)
        .then((res) => {
          setServiceman(res.data.serviceMen[0]);
          setLoading(false);
          //console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //Prompt no data.
      props.history.push("/");
    }
  }, []);

  //UI color from ui store
  const backgroundColor = useSelector((state) => state.UI.backgroundColor);

  return (
    <>
      {loading && <CSpinner className="loader" grow size="lg" />}
      <CRow>
        <CCol sm="6">
          <CCard>
            <CCardTitle
              className="p-3 m-0"
              style={{ backgroundColor: backgroundColor }}
            >
              Jobs done by {serviceman.name}
            </CCardTitle>
            {serviceman && (
              <CCardBody>
                <p className="space-out">
                  <strong>Name:</strong>
                  <span>{serviceman.name}</span>
                </p>
                <p>This should display the jobs this {serviceman.name}</p>
              </CCardBody>
            )}
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Serviceman;
