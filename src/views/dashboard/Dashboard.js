import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CSpinner,
  CCardGroup,
  CCardHeader

} from "@coreui/react";
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'
import React, { useEffect, lazy } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { getBadge } from "../../utils/orderStatusColor";
import card from './bi_card.svg'
import bike from './ri_bike.svg'

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown"));

const Dashboard = (props) => {
  const ddata = useSelector((state) => state);
  const totalOrders = useSelector((state) => state.dashbord.totalOrders);
  const chart = useSelector((state) => state.dashbord.chart);
  const pie = useSelector((state) => state.dashbord.pie);
  const totalUsers = useSelector((state) => state.dashbord.totalUsers);
  const totalProducts = useSelector((state) => state.dashbord.totalProducts);
  const activeSeller = useSelector((state) => state.dashbord.totalActiveSellers);
  const inactiveSeller = useSelector((state) => state.dashbord.totalInActiveSellers);

  const [d, setD] = React.useState([])
  const [e, setE] = React.useState([])
  const [f, setF] = React.useState([])
  const [g, setG] = React.useState([])

  useEffect(() => {
    console.log('*************', ddata.dashbord.dashboardData)
    let k = []
    let q = []
    if (chart) {

      for (let i = 0; i < chart.length; i++) {
        k.push(chart[i]["year(created_at)"])
        q.push(chart[i]["SUM(total_price)"])
        console.log(chart[i]["year(created_at)"])
      }
      setD(k)
      setE(q)
    }
  }, [chart])
  useEffect(() => {
    let k = []
    let q = []
    if (pie) {

      for (let i = 0; i < pie.length; i++) {
        k.push(pie[i].region)
        q.push(pie[i]["SUM(price)"])
        // console.log(chart[i]["year(created_at)"])
      }
      setF(k)
      setG(q)
    }
  }, [pie])

  const fields = [
    { key: "order_id", label: "Order Id" },
    "order_date",
    {
      key: "customername",
      _style: { minWidth: "15%" },
      label: "Customer Name",
    },
    {
      key: "customernumber",
      _style: { minWidth: "15%" },
      label: "Customer Number",
    },
    {
      key: "customeremail",
      _style: { minWidth: "15%" },
      label: "Customer Email",
    },
    {
      key: "amount",
      _style: { minWidth: "1%" },
    },
    { key: "status", _style: { minWidth: "10%" } },
    { key: "view", label: "" },
  ];



  return (
    <>
      {/* <WidgetsDropdown widgetList={widgetList} /> */}
      <CCardGroup columns className="cols-2" >

        <CCard>
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
        <CCard style={{ display:"none" }}>
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
