import React from 'react'
import {
  CCardBody,
  CCard,
  CCol,
  CRow,
  CSpinner,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CCallout,
} from '@coreui/react'

import Avatar from './avatar.svg'
import Mail from './mail.svg'
import Phone from '../../assets/phone.svg'
import { useParams } from "react-router-dom";
import UserService from "../../services/user.service";
import moment from 'moment'
import RidersTable from './tables/RidersTable'
import PickedupTable from './tables/PickedupTable'
import CancelledTable from './tables/CancelledTable'
import DeliveredTable from './tables/DeliveredTable'
import TransactionTable from './tables/TransactionsTable'


const AgencyPayload = () => {

  let { id } = useParams();
  const [customer, setCustomer] = React.useState("");
  const [jobs, setJobs] = React.useState("");
  const [transactions, setTransactions] = React.useState([]);
  const [rider, setRiders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);

    UserService.getSingleAgency(id)
      .then((res) => {

        setCustomer(res.data.user_details);
        setJobs(res.data.jobs);
        setRiders(res.data.riders);
        setTransactions(res.data.transactions);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);


  return (
    <CCard>
      {loading && <CSpinner className="loader" grow size="lg" />}

      <CCardBody>

        <CRow>
          <CCol xs="4" md="4" >


            <img src={Avatar} alt="" />
            <h4>
              <strong>
                {customer && customer.user.name}
              </strong>
            </h4>
            <medium>
              Member since {customer && moment(customer.user.createdAt).format('MMMM Do, YYYY ')}
            </medium>

          </CCol>
          <CCol xs="12" md="3">
            <CCard style={{ padding: 10 }}>
              <h4>
                <strong>
                  Agency Details
                </strong>
              </h4>
              <CCardBody>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img src={Mail} alt="" />
                  <p style={{ paddingTop: "10px", paddingLeft: 10 }}> {customer && customer.user.email}</p>
                </div>
                {/* </CRow> */}
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img src={Phone} alt="" />
                  <p style={{ paddingTop: "10px", paddingLeft: 10 }}>{customer && customer.user.phone_number}</p>
                </div>
              </CCardBody>
            </CCard>

          </CCol>
          <CCol xs="12" md="3">
            <CCard style={{ padding: 10 }}>
              <h4>
                <strong>
                  Wallet Balance

                </strong>
              </h4>
              <CCardBody>
                <strong>
                  <h2>
                    ₦{customer && customer.wallet.toLocaleString()}
                  </h2>
                </strong>
                <strong>
                  <h2>

                  </h2>
                </strong>
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>

        <br />
        <br />

        <CCard>

          {/* <CCardHeader>Table represents transactions in last 24hrs</CCardHeader> */}
          <CCardBody>
            <CTabs >
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CCallout
                      color="warning"
                      style={{
                        height: "50px",
                        width: "200px",
                        paddingTop: "20px",
                      }}
                    >
                      Riders
                    </CCallout>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CCallout
                      color="primary"
                      style={{
                        height: "50px",
                        width: "250px",
                        paddingTop: "20px",
                      }}
                    >
                      Transactions
                    </CCallout>
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <RidersTable riders={rider} />
                </CTabPane>
                <CTabPane>
                  <TransactionTable  transactions={transactions}  />
                </CTabPane>

              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>

      </CCardBody>
    </CCard>
  )
}

export default AgencyPayload
