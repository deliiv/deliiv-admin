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
const Verification = (props) => {

  const [riderName, setRiderName] = useState('')
  const [riders, setRiders] = useState([])
  const [selected, setSelected] = useState({})

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
    console.log('GO to - pprime')


    userService
      .searchRider({ name: riderName })
      .then(response => {

        //toast.success('Image uploaded');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
        console.log('RESP: ', response.data.user)
        setRiders(response.data.user)
      })
      .catch((error) => {
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
                onRowClick={(item, index, col, e) => setSelected(item)}
                // onPageChange={(val) => console.log('new page:', val)}
                // onPagesChange={(val) => console.log('new pages:', val)}
                // onPaginationChange={(val) => console.log('new pagination:', val)}
                // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
                // onSorterValueChange={(val) => console.log('new sorter value:', val)}
                // onTableFilterChange={(val) => console.log('new table filter:', val)}
                // onColumnFilterChange={(val) => console.log('new column filter:', val)}
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