import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CLabel,
  CInput,
  CFormGroup,
  CSelect,
  CTextarea,
  CButton,
  CSpinner
} from '@coreui/react';
import checkEmptyProperties from 'src/utils/checkEmptyProperties';
import { emailValidation } from 'src/utils/validations';
import userService from 'src/services/user.service';
import { toast } from 'react-toastify';

const AddSeller = (props) => {
  const regions = useSelector((state) => state.region.region);
  const [regionn, setRegion] = React.useState(1);
  const [selectErrorRegion, setSelectErrorRegion] = React.useState('');

  const history = useHistory();

  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmpassword: '',
    address: ''
  });

  useEffect(()=>{
if(regions){
  console.log('~~~~~~~~~~~~', regions)

}
  },[regions])

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleChangeRegion = (region) => {
    setRegion(region);
  };

  const submitForm = () => {
    setLoading(true);

    if (state.password !== state.confirmpassword) {
      setLoading(false);
      toast.error('Password and confirm password must match');
    } else {
      userService
        .addSeller(state)
        .then(data => {
          let sAdd = { address: state.address, region: regionn, seller_id: data.data.seller.id }
          setLoading(false);
          userService.addSellerAddress(sAdd)
            .then(() => {
            }).catch(err => {
              console.log(err)
            })
          history.push('/seller');
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          error.response.data && error.response.data.errors && error.response.data.errors.firstName[0] && toast.error(error.response.data.errors.firstName[0])
          console.log(error);
        });
    }
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          {/* {services && ( */}
          <CCardBody>
            <CFormGroup row>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel>First Name</CLabel>
                  <CInput
                    type="text"
                    size="md"
                    value={state.firstName}
                    name="firstName"
                    onChange={inputChangeHandler}
                  />
                </CFormGroup>
              </CCol>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel>Last Name</CLabel>
                  <CInput
                    type="text"
                    size="md"
                    value={state.lastName}
                    name="lastName"
                    onChange={inputChangeHandler}
                  />
                </CFormGroup>
              </CCol>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel>Phone</CLabel>
                  <CInput
                    type="tel"
                    size="md"
                    value={state.phone}
                    name="phone"
                    onChange={inputChangeHandler}
                  />
                </CFormGroup>
              </CCol>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel>Email</CLabel>
                  <CInput
                    type="email"
                    size="md"
                    value={state.email}
                    name="email"
                    onChange={inputChangeHandler}
                  />
                </CFormGroup>
              </CCol>

              <CCol sm="6">
                <CFormGroup>
                  <CLabel>Password</CLabel>
                  <CInput
                    type="password"
                    size="md"
                    value={state.password}
                    name="password"
                    onChange={inputChangeHandler}
                    secureEntry
                  />
                </CFormGroup>
              </CCol>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel>Confirm Password</CLabel>
                  <CInput
                    type="password"
                    size="md"
                    value={state.confirmpassword}
                    name="confirmpassword"
                    onChange={inputChangeHandler}
                    secureEntry
                  />
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <p>Seller Address</p>
            <CCol sm="6">
              <CFormGroup>
                <CLabel>Address</CLabel>
                <CInput
                  type="text"
                  size="md"
                  value={state.address}
                  name="address"
                  onChange={inputChangeHandler}
                />
              </CFormGroup>
            </CCol>

            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="region">Select Region for address</CLabel>
                <CSelect
                  custom
                  value={regionn}
                  name="region"
                  id="creditReason"
                  onChange={(e) => handleChangeRegion(e.target.value)}
                >
                  {regions &&
                    regions.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </CSelect>
                {selectErrorRegion && <p style={{ color: 'red' }}>{selectErrorRegion}</p>}
              </CFormGroup>
            </CCol>
            <CFormGroup />
            <CButton
              style={{ position: 'relative' }}
              size="md"
              color="primary"
              className="mb-4 float-md-right"
              disabled={
                checkEmptyProperties(state) || emailValidation(state.email) || state.phone.length < 11
              }
              onClick={submitForm}
            >
              {loading && (
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <CSpinner size="sm" />
                </span>
              )}
              <span className={`${loading && 'text-primary'}`}>Add Seller</span>
            </CButton>
          </CCardBody>
          {/* )} */}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddSeller;
