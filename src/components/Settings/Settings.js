import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CForm,
  CSpinner,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CSelect,
  CBadge
} from "@coreui/react";

import userService from "src/services/user.service";
import { toast } from 'react-toastify';


const Settings = (props) => {
  const [formIsValid, setFormIsValid] = React.useState(true);
  const [admin, setAdmin] = React.useState([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [fullName, setFullName] = React.useState('');
  const [activeAdmin, setActiveAdmin] = React.useState([]);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [accountVerification, setAccountVerification] = React.useState(false);
  const [paymentApproval, setPaymentApproval] = React.useState(false);
  const [notificationAccess, setNotificationAccess] = React.useState(false);
  const [priceChange, setPrice_change] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [price, setPrice] = React.useState('');
  const [config, setConfig] = React.useState(null);



  useEffect(() => {
    userService.allAdmin().then(data => {
      console.log(data.data)
      setAdmin(data.data.admin)
      setConfig(data.data.system_config)
      setPrice(data.data.system_config[0].price_per_km)

    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);
    });


  }, [])

  useEffect(() => {

    setFullName(activeAdmin.full_name)
    setEmail(activeAdmin.email)
    setAccountVerification(activeAdmin.account_verification)
    setNotificationAccess(activeAdmin.notification_access)
    setPaymentApproval(activeAdmin.payment_approval)
    setActive(activeAdmin.active)
  }, [activeAdmin])

  const fields = [
    { key: 'full_name', _style: { width: '20%' } },
    { key: 'email', _style: { width: '20%' } },
    { key: 'account_verification', _style: { width: '20%' } },
    { key: 'notification_access', _style: { width: '20%' } },
    { key: 'payment_approval', _style: { width: '20%' } },
    { key: 'active', _style: { width: '20%' } },
    {
      key: "view",
      _style: { minWidth: "1%" },
      label: "Action",

    },

  ]

  const handleSubmit = () => {

    let data = {
      email: email,
      full_name: fullName,
      password: password,
      account_verification: accountVerification,
      notification_access: notificationAccess,
      payment_approval: paymentApproval,
      active: active,
    }
    if (!email || !fullName || !password) {
      toast.error('All fields are required')
    }

    userService
      .createAdmin(data)
      .then(() => {

        toast.success('Admin Added');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error('Error adding admin')
        console.log(error);
        toast.error(error.response.data.message);
      });
  }
  const handleSubmitUpdate = () => {
    let data = {
      email: email,
      full_name: fullName,
      password: password,
      account_verification: accountVerification,
      notification_access: notificationAccess,
      payment_approval: paymentApproval,
      active: active,
    }
    userService
      .updateAdmin(data)
      .then(() => {

        toast.success('Admin updated');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error('Error updating admin')
        console.log(error);
        toast.error(error.response.data.message);
      });
  }

  const handlePriceUpdate = () => {
    userService
      .updateSystemConfig({price:price})
      .then(() => {

        toast.success('Price Updated');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        toast.error('Error updating price')
        console.log(error);
        toast.error(error.response.data.message);
      });
  }

  return (
    <>
      <CCard>

        <CCardBody>
          <h3>
            <strong>Existing Admin</strong>
          </h3>
          <br />
          <CRow>
            <CDataTable
              items={admin}
              fields={fields}
              // columnFilter
              // tableFilter
              // cleaner
              // itemsPerPageSelect
              itemsPerPage={50}
              hover
              pagination
              // loading
              // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
              // onPageChange={(val) => console.log('new page:', val)}
              // onPagesChange={(val) => console.log('new pages:', val)}
              // onPaginationChange={(val) => console.log('new pagination:', val)}
              // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
              // onSorterValueChange={(val) => console.log('new sorter value:', val)}
              // onTableFilterChange={(val) => console.log('new table filter:', val)}
              // onColumnFilterChange={(val) => console.log('new column filter:', val)}
              scopedSlots={{

                view: (data) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="info"
                        variant="outline"
                        // shape="square"
                        size="sm"
                        onClick={() => setActiveAdmin(data)}>
                        Edit
                      </CButton>
                    </td>
                  );
                },
              }}
            />

            <CCol xs="12" md="8">

              <CCard>
                <br />
                <br />
                <br />
                <CCardBody>
                  <CForm onSubmit={null}>
                    <h3>
                      <strong> Admin Credentials</strong>
                    </h3>
                    <CInputGroup className="mb-3">
                      <CInput
                        type="text"
                        placeholder="Full name"
                        name="full_name"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                      />

                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInput
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">

                      <CInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow className="p-0 m-0">
                      <CCol xs="6" className="p-0 m-0">
                        {error && <p style={{ color: "tomato" }}>{error}</p>}
                      </CCol>
                    </CRow>
                    <h4><strong>Admin Permission</strong></h4>
                    <CFormGroup variant="custom-checkbox" className="my-2 mt-4">
                      <div style={{ display: "flex", flexDirection: "row", margin: 20 }}>
                        <input type="checkbox"
                          value={accountVerification}
                          checked={accountVerification}

                          style={{ width: '40px', height: "40px" }}
                          onChange={e => setAccountVerification(!accountVerification)} />
                        <label for="" style={{ textAlign: "center", padding: "10px" }}> Account Verification</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", margin: 20 }}>
                        <input type="checkbox"
                          checked={paymentApproval}
                          value={paymentApproval}
                          style={{ width: '40px', height: "40px" }}
                          onChange={e => setPaymentApproval(!paymentApproval)} />
                        <label for="" style={{ textAlign: "center", padding: "10px" }}> Payment Approval</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", margin: 20 }}>
                        <input type="checkbox"
                          value={notificationAccess}
                          checked={notificationAccess}

                          style={{ width: '40px', height: "40px" }}
                          onChange={e => setNotificationAccess(!notificationAccess)} />
                        <label for="" style={{ textAlign: "center", padding: "10px" }}> Notification Access</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", margin: 20 }}>
                        <input type="checkbox"
                          value={active}
                          checked={active}

                          style={{ width: '40px', height: "40px" }}
                          onChange={e => setActive(!active)} />
                        <label for="" style={{ textAlign: "center", padding: "10px" }}> Active</label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", margin: 20 }}>
                        <input type="checkbox"
                          value={price}
                          checked={price}

                          style={{ width: '40px', height: "40px" }}
                          onChange={e => setPrice(!price)} />
                        <label for="" style={{ textAlign: "center", padding: "10px" }}> Update price</label>
                      </div>
                      {/* <div style={{ display: "flex", flexDirection: "row", margin: 20 }}>
                    <input type="checkbox" name="love" value="love" id="love"
                      style={{ width: '40px', height: "40px" }} />
                    <label for="" style={{ textAlign: "center", padding: "10px" }}> Other Permission</label>
                  </div> */}
                    </CFormGroup>
                    {activeAdmin && Object.keys(activeAdmin).length > 0 ? (
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary"
                            disabled={!email}
                            onClick={handleSubmitUpdate}>
                            {loading && <CSpinner size="sm" />}
                            <span className="ml-2">Update Admin</span>
                          </CButton>
                        </CCol>
                      </CRow>
                    ) : (
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary"
                            disabled={!email || !password || !fullName}
                            onClick={handleSubmit}>
                            {loading && <CSpinner size="sm" />}
                            <span className="ml-2">Add Admin</span>
                          </CButton>
                        </CCol>
                      </CRow>
                    )}
                    <br />
                    <h4>Pricing</h4>
                    <br />

                    <CRow>

                      <CCol xs="12" md="2">
                        <p>Price per km</p>
                        <CInputGroup className="mb-3">
                          <CInput
                            type="number"
                            placeholder="Price"
                            autoComplete="price"
                            name="price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                          />
                        </CInputGroup>
                        <CCol xs="6" md="6">
                          <CButton color="primary"
                            disabled={!price}
                            onClick={handlePriceUpdate}>
                            {loading && <CSpinner size="sm" />}
                            <span className="ml-2">Update</span>
                          </CButton>
                        </CCol>

                      </CCol>


                      {/* <CCol xs="12" md="2">
                        <CFormGroup>
                          <CSelect custom name="ccmonth" id="ccmonth">
                            <option value="1">This month</option>
                            <option value="2">This week</option>
                            <option value="3">Three week</option>
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" md="2">
                        <CFormGroup>
                          <CSelect custom name="ccmonth" id="ccmonth">
                            <option value="1">This month</option>
                            <option value="2">This week</option>
                            <option value="3">Three week</option>
                          </CSelect>
                        </CFormGroup>

                      </CCol>
                      <CCol xs="12" md="2">
                        <CFormGroup>
                          <CSelect custom name="ccmonth" id="ccmonth">
                            <option value="1">This month</option>
                            <option value="2">This week</option>
                            <option value="3">Three week</option>
                          </CSelect>
                        </CFormGroup>

                      </CCol> */}
                    </CRow>
                  </CForm>

                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Settings;