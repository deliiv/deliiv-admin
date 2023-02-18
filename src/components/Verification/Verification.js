import { CCard, CCardBody, CButton, CCol, CDataTable, CRow, CInput, CFormGroup, CBadge } from "@coreui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { useRouteMatch, useHistory } from "react-router-dom";
import RidersDetails from "./RiderDetails";
import DemoTable from "./DemoTable";
import userService from "src/services/user.service";
import Mail from '../../assets/mail.svg'
import Phone from '../../assets/phone.svg'
import Modals2 from "./Modals2";
import Spinner from "src/Spinner";
const Verification = (props) => {

  const [riderName, setRiderName] = useState('')
  const [riders, setRiders] = useState([])
  const [selected, setSelected] = useState({})
  const [loader, setLoader] = useState(false)

  const fields = [
    {
      key: "firstName",
      _style: { minWidth: "15%" },
      label: "First Name",
    },
    {
      key: "lastName",
      _style: { minWidth: "15%" },
      label: "Last Name",
    },
    {
      key: "phone_number",
      _style: { minWidth: "15%" },
      label: "Number",
    },
    {
      key: "email",
      _style: { minWidth: "15%" },
      label: "Email",
    },
    {
      key: "last_login",
      _style: { minWidth: "1%" },
    },
    {
      key: "view",
      _style: { minWidth: "1%" },
      label: "Action",

    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  const handleSearch = () => {

    setLoader(true)
    userService
      .searchRider({ name: riderName })
      .then(response => {

        setRiders(response.data.user)
        setLoader(false)

      })
      .catch((error) => {
        setLoader(false)
        console.log(error);
      });
  }


  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CFormGroup>
              <div style={{ width: "40%", display: "flex", flexDirection: 'row', padding: "30px" }}>
                <CInput placeholder="search" style={{ padding: 20 }} onChange={e => setRiderName(e.target.value)} />
                <CButton
                  color="primary"
                  style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}
                  onClick={handleSearch}>Search</CButton>
              </div>
            </CFormGroup>
            {loader && <Spinner width={20} height={20}/>}

            <CCardBody>

              <CDataTable
                items={riders}
                fields={fields}
                // columnFilter
                // tableFilter
                // cleaner
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                pagination
                // loading
                onRowClick={(item, index, col, e) =>{
                   setSelected(item)
                   let filteredRider = riders.filter(items => items._id.toString() === item._id)
                   setRiders(filteredRider)


                }}
               scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),


                }}
              />
            </CCardBody>

            {Object.keys(selected).length > 0 &&
              <RidersDetails selected={selected}/>
            }
          </CCard>
        </CCol>

      </CRow>
    </>
  );
};

export default Verification;
