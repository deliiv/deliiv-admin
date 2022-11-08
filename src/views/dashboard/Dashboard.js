import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CCardGroup,
  CCardHeader,
  CInput,
  CButton

} from "@coreui/react";
import {
  CChartLine
} from '@coreui/react-chartjs'
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import card from './bi_card.svg'
import bike from './ri_bike.svg'
import moment from 'moment'
import Spinner from "./Spinner";

import userService from "src/services/user.service";
import { toast } from "react-toastify";

const Dashboard = () => {
  const ddata = useSelector((state) => state);
  const chart = useSelector((state) => state.dashbord.chart);
  const pie = useSelector((state) => state.dashbord.pie);

  const [d, setD] = React.useState([])
  const [e, setE] = React.useState([])
  const [f, setF] = React.useState([])
  const [g, setG] = React.useState([])

  const [data, setData] = useState([])
  const [start_date, setStartDate] = useState('')
  const [end_date, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)

  const handleDatePicked = item => {
    setLoading(true)
    let sDate = moment(start_date).format('YYYY-MM-DD')
    let eDate = moment(end_date).format('YYYY-MM-DD')
    if (!sDate.length > 0 || !eDate.length > 0) {
      toast.error('Select Start and end date')
      setLoading(false)
      return;
    }
    if (new Date(eDate) <= new Date(sDate)) {
      toast.error('Start date can not be greater than end date')
      setLoading(false)
      return;
    }

    let data = {
      start_date: sDate,
      end_date: eDate,
    }
    userService.filterObjects(data).then(data => {
      toast.success(`Order fetch successfully for ${start_date} -  ${end_date}`)
      if (data.data.data.length > 0) {
        setLoading(false)
        setData(data.data.data)

      } else {
        setLoading(false)
        toast.error("No order for selected day: " + start_date)
      }
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })

  }

  const fields = [
    { key: "order_ID", lable: 'Order ID', _style: { width: '10%' } },
    { key: "user", lable: 'Customer', _style: { width: '20%' } },
    { key: "sender", label: 'Sender', _style: { width: '20%' } },
    { key: "receiver", label: 'Receiver', _style: { width: '20%' } },
    { key: "rider", label: 'Rider', _style: { width: '20%' } },
    { key: "date", label: 'Date', _style: { width: '20%' } }

  ]


  return (
    <>
      <CCardGroup columns className="cols-2" >

        <CCard>
          <CCardHeader>
          <b>Delivered Jobs</b>
            <CCardBody>
              <div class="row">
                <CCol xs="12" md="3">
                  Start Date
                  <CInput type="date"
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                    onChange={e => setStartDate(e.target.value)} />
                </CCol>
                <CCol xs="12" md="3">
                  End Date

                  <CInput type="date"
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                    onChange={e => setEndDate(e.target.value)} />
                </CCol>
                <CButton color="primary" onClick={handleDatePicked}>Fetch</CButton>
                {loading && <Spinner />}
              </div>
              <CDataTable
                items={data}
                fields={fields}
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                pagination
                // loading
                onRowClick={() => {

                }}

                scopedSlots={{
                  order_ID: (order) => <td>{order.job_id}</td>,
                  user: (order) => <td>{order.user.firstName} {order.user.lastName}</td>,
                  sender: (order) => <td>{order.sender.full_name}</td>,
                  receiver: (order) => <td>{order.receiver.full_name}</td>,
                  rider: (order) => <td>{order.rider_assign ? "" + order.rider_assign.firstName + " " + order.rider_assign.lastName : 'No Rider'}</td>,
                  date: (order) => <td>{moment(order.createdAt).format("DD/MM/YYYY hh:MM A")}</td>,


                }}

              />

            </CCardBody>
          </CCardHeader>

        </CCard>
        <CCard style={{ display: "none" }}>
          <CCardHeader>
            Line Chart
          </CCardHeader>
          <CCardBody>
            <CChartLine
              datasets={[
                // {
                //   label: 'Data One',
                //   backgroundColor: 'rgb(228,102,81,0.9)',
                //   data: [...d]
                // },
                {
                  label: 'Sum total of product price per month',
                  backgroundColor: 'rgb(0,216,255,0.9)',
                  data: [...e]
                }
              ]}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
        <CRow>

          <CCol xs="12" md="6">
            <CCard style={{ padding: 10 }}>
              <p style={{ color: "#081CBB" }}>
                Orders completed:Today

              </p>
              <CCardBody>
                <strong>
                  <h1>
                    {ddata && ddata.dashbord && ddata.dashbord.dashboardData.jobsCompletedToday}
                    <img src={card} style={{ marginLeft: 20 }} height={20} />
                  </h1>
                </strong>
                <strong>
                  <h2>

                  </h2>
                </strong>
              </CCardBody>
            </CCard>

          </CCol>
          <CCol xs="12" md="6">
            <CCard style={{ padding: 10 }}>
              <p style={{ color: "#081CBB" }}>
                Orders completed:All Time

              </p>
              <CCardBody>
                <strong>
                  <h1>
                    {ddata && ddata.dashbord && ddata.dashbord.dashboardData.jobsCompletedAllTime}
                    <img src={card} style={{ marginLeft: 20 }} height={20} />
                  </h1>
                </strong>
                <strong>
                  <h2>

                  </h2>
                </strong>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>

          <CCol xs="12" md="6">
            <CCard style={{ padding: 10 }}>
              <p style={{ color: "#081CBB" }}>
                Riders: All

              </p>
              <CCardBody>
                <strong>
                  <h1>
                    {ddata && ddata.dashbord && ddata.dashbord.dashboardData.countAllRiders}
                    <img src={bike} style={{ marginLeft: 20 }} height={20} />
                  </h1>
                </strong>
                <strong>
                  <h2>

                  </h2>
                </strong>
              </CCardBody>
            </CCard>

          </CCol>
          <CCol xs="12" md="6">
            <CCard style={{ padding: 10 }}>
              <p style={{ color: "#081CBB" }}>
                Riders:Online

              </p>
              <CCardBody>
                <strong>
                  <h1>
                    {ddata && ddata.dashbord && ddata.dashbord.dashboardData.countAllActiveRiders}
                    <img src={bike} style={{ marginLeft: 20 }} height={20} />
                  </h1>
                </strong>
                <strong>
                  <h2>

                  </h2>
                </strong>
              </CCardBody>
            </CCard>

          </CCol>

        </CRow>
        <CRow>
          <CCol xs="12" md="12">
            <CCard md="4" style={{ padding: 10 }}>
              <p style={{ color: "#081CBB" }}>
                Customers
              </p>



              <CRow>
                <CCol xs="12" md="6">
                  <CCard style={{ padding: 10 }}>
                    <p style={{ color: "#081CBB" }}>
                      Regsitered Customers

                    </p>
                    <CCardBody>
                      <strong>
                        <h1>
                          {ddata && ddata.dashbord && ddata.dashbord.dashboardData.allUsers}
                        </h1>
                      </strong>
                      <strong>
                        <h2>

                        </h2>
                      </strong>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol>

                  <CCol xs="12" md="12">
                    <CCard style={{ padding: 10 }}>
                      <p style={{ color: "#081CBB" }}>
                        Active within the last 1 Month

                      </p>
                      <CCardBody>
                        <strong>
                          <h1>
                            {ddata && ddata.dashbord && ddata.dashbord.dashboardData.activeUsersInLastOneMonth}
                          </h1>
                        </strong>
                        <strong>
                          <h2>

                          </h2>
                        </strong>
                      </CCardBody>
                    </CCard>
                  </CCol>
                  <CCol xs="12" md="12">
                    <CCard style={{ padding: 10 }}>
                      <p style={{ color: "#081CBB" }}>
                        Inactive for more than 1 Month

                      </p>
                      <CCardBody>
                        <strong>
                          <h1>
                            {ddata && ddata.dashbord && ddata.dashbord.dashboardData.inactiveUsersInLastOneMonth}
                          </h1>
                        </strong>
                        <strong>
                          <h2>

                          </h2>
                        </strong>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CCol>
              </CRow>
            </CCard>

          </CCol>

        </CRow>
      </CCardGroup>
    </>
  );
};

export default Dashboard;
