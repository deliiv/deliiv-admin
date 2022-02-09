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
import React, {useEffect, lazy } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { getBadge } from "../../utils/orderStatusColor";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown"));

const Dashboard = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const totalOrders = useSelector((state) => state.dashbord.totalOrders);
  const chart = useSelector((state) => state.dashbord.chart);
  const pie = useSelector((state) => state.dashbord.pie);
  const totalUsers = useSelector((state) => state.dashbord.totalUsers);
  const totalProducts = useSelector((state) => state.dashbord.totalProducts);
  const activeSeller = useSelector((state) => state.dashbord.totalActiveSellers);
  const inactiveSeller = useSelector((state) => state.dashbord.totalInActiveSellers);

  const[d, setD] = React.useState([])
  const[e, setE] = React.useState([])
  const[f, setF] = React.useState([])
  const[g, setG] = React.useState([])

  useEffect(() =>{
    let k =[]
    let q =[]
    if(chart){
      
      for(let i=0; i<chart.length; i++){
        k.push(chart[i]["year(created_at)"])
        q.push(chart[i]["SUM(total_price)"])
        console.log(chart[i]["year(created_at)"])
      }
      setD(k)
      setE(q)
    }
  },[chart])
  useEffect(() =>{
    let k =[]
    let q =[]
    if(pie){
      
      for(let i=0; i<pie.length; i++){
        k.push(pie[i].region)
        q.push(pie[i]["SUM(price)"])
       // console.log(chart[i]["year(created_at)"])
      }
      setF(k)
      setG(q)
    }
  },[pie])

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

  const widgetList = [
    {
      title: "All Orders",
      totalAmount: totalOrders.toString() || "0",
    },
    // {
    //   title: "New Orders",
    //   totalAmount: newOrders ? newOrders.length.toString() : "una",
    // },
    { title: "Sellers", totalAmount: activeSeller + inactiveSeller || "0" },
    { title: "Users", totalAmount: totalUsers.toString() || "0" },
    { title: "Products", totalAmount: totalProducts.toString() || "0" },
  ];

  return (
    <>
      <WidgetsDropdown widgetList={widgetList} />
      <CCardGroup columns className="cols-2" >

        <CCard>
        <CCardHeader>
          Doughnut Chart
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [...g]
              }
            ]}
            labels={[...f]}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

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
      </CCardGroup>
    </>
  );
};

export default Dashboard;
