import { CCard, CCardBody, CButton, CCol, CDataTable, CRow, CInput, CFormGroup } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { useRouteMatch, useHistory } from "react-router-dom";
import Spinner from "../Spinner";
import CustomerModals from "./CustomerModals";
import userService from "src/services/user.service";
import { toast } from 'react-toastify';

const Customers = (props) => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const [localCUstomers, setLocalCustomers] = useState([])
  const [secondaryLocalCUstomers, setSecondaryLocalCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [loader, setLoader] = useState(true)

  const [action, setAction] = useState('')
  const [amount, setAmount] = useState(0)
  const [show, setShow] = useState(false)
  const [customer, setCustomer] = useState(false)


  const customers = useSelector((state) => state.users.users);

  useEffect(() => {
    if (customers) {
      setLocalCustomers(customers)
      setLoader(false)
    }
  }, [customers])
  const fields = [
    {
      key: "firstname",
      label: "First Name",
    },
    {
      key: "lastname",
      label: "Last Name",
    },

    {
      key: "customeremail",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "view",
      label: "Action",

    },
    {
      key: "fund",
      label: "Fund Wallet",

    },
    {
      key: "debit",
      label: "Debit Wallet",

    },
  ];

  const handleOnChange = (e) => {

    if (e.keyCode === 8) {

      const filteredData = e.target.value.trim().length > 0 && localCUstomers &&
        localCUstomers.filter(entry => {
          return (
            entry.firstName && entry.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.lastName && entry.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.email && entry.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.phone_number && entry.phone_number.toLowerCase().includes(e.target.value.trim().toLowerCase())
          )
        }
        );
      if (filteredData) {
        setLocalCustomers(filteredData);
      }
    }
    setSearch(e.target.value);
    const filteredData = e.target.value.trim().length > 0 && localCUstomers &&
      localCUstomers.filter(entry => {
        return (
          entry.firstName && entry.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.lastName && entry.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.email && entry.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.phone_number && entry.phone_number.toLowerCase().includes(e.target.value.trim().toLowerCase())
        )
      }
      );

    filteredData && filteredData.length > 0 && setSecondaryLocalCustomers(localCUstomers)

    if (filteredData) {
      setLocalCustomers(filteredData);
    } else {
      setLocalCustomers(customers)
      setSecondaryLocalCustomers(customers)
    }
  }

  const handleSuccess = () => {

    let data = {
      amount: action === 'Credit' ?  parseFloat(amount) : parseFloat(-amount),
      user: customer

    }
    userService.creditOrDebitUserWallet(data)
    .then(customer =>{
      toast.success(`User successfully ${action}ed`)

    }).catch(err =>{
      console.log(err.response.data[0].message)
      toast.error("ERROR")
      toast.error(err.response.data[0].message)
    })
  }
  const onKeyUp = (e) => {
    if (e.keyCode === 8) {
      setLocalCustomers(secondaryLocalCUstomers)
    }
  }
  const onKeyDown = (e) => {
    if (e.keyCode === 8) {
      handleOnChange(e)
    }
  }
  const handleSearchButton = (s) => {
    const filteredData = s.trim().length > 0 && localCUstomers &&
      localCUstomers.filter(entry => {
        return (
          entry.firstName && entry.firstName.toLowerCase().includes(s.trim().toLowerCase()) > -1
          || entry.lastName && entry.lastName.toLowerCase().includes(s.trim().toLowerCase())
          || entry.email && entry.email.toLowerCase().includes(s.trim().toLowerCase())
          || entry.phone_number && entry.phone_number.toLowerCase().includes(s.trim().toLowerCase())
        )
      }
      );
    setLocalCustomers(filteredData)
  }
  return (
    <>
      <CRow>
        <CustomerModals
          title={action}
          show={show}
          modalColor={"#F9B115"}
          handleOnChangeSCost={(e)=>{ setAmount(e.target.value)}}
          handleSuccess={handleSuccess}
          handleCancel={() => setShow(false)}
        />

        <CCol>
          {loader && <Spinner width={20} height={20} />}

          <CCard>
            <CFormGroup>
              <div style={{ width: "40%", display: "flex", flexDirection: 'row', padding: "30px" }}>
                <CInput placeholder="search" style={{ padding: 20 }}
                  value={search}

                  onChange={handleOnChange}
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp} />
                <CButton color="primary" style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}
                  onClick={() => handleSearchButton(search)}

                >Search</CButton>
              </div>
            </CFormGroup>
            <CCardBody>
              {customers && (
                <CDataTable
                  items={localCUstomers}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  overTableSlot={
                    <div className="center-flex">
                    </div>
                  }
                  scopedSlots={{
                    firstname: (customer) => (
                      <td>
                        {customer ? customer.firstName : null}
                      </td>
                    ),
                    lastname: (customer) => (
                      <td>
                        {customer ? customer.lastName : null}
                      </td>
                    ),
                    phone: (customer) => (
                      <td>
                        {customer ? customer.phone_number : null}
                      </td>
                    ),
                    customernumber: (customer) => (
                      <td>{customer ? customer.phone : null}</td>
                    ),
                    customeaddress: (customer) => (
                      <td>
                        {customer.address ? customer.address : "Not Available"}
                      </td>
                    ),
                    customeremail: (customer) => (
                      <td>{customer ? customer.email : null}</td>
                    ),
                    date_created: (customer) => (
                      <td>
                        {formateDate(customer.date_created)}{" "}
                        {formatTime(customer.date_created)}
                      </td>
                    ),
                    view: (customer) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="info"
                            variant="outline"
                            // shape="square"
                            size="sm"
                            onClick={() => history.push(`${url}/details/${customer._id}`)}>
                            View
                          </CButton>
                        </td>
                      );
                    },
                    fund: (customer) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="success"
                            // variant="outline"
                            // shape="square"
                            size="sm"
                            onClick={() => {
                              setAction("Credit")
                              setShow(true)
                              setCustomer(customer._id)
                            }}>
                            Fund Wallet
                          </CButton>
                        </td>
                      );
                    },
                    debit: (customer) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="warning"

                            size="sm"
                            onClick={() => {
                              setAction("Debit")
                              setShow(true)
                              setCustomer(customer._id)

                            }}>
                            Debit Wallet
                          </CButton>
                        </td>
                      );
                    },
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

export default Customers;
