import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import { formateDate, formatTime } from "../../utils/formatDate";

const SellerOrderDetails = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const servicemen = useSelector((state) => state.servicemen.servicemen);
  const totalActiveSellers = useSelector((state) => state.dashbord.totalActiveSellers);
  const totalInActiveSellers = useSelector((state) => state.dashbord.totalInActiveSellers);

  const seller_details = useSelector((state) => state.seller.seller_details);


  const widgetList = [
    {
      title: "Total Active Sellers",
      totalAmount: totalActiveSellers.toString() || "0",
    },
    {
      title: "Total Inactive Sellers",
      totalAmount: totalInActiveSellers.toString() || "0",
    },
    // { title: "Air Conditioner", totalAmount: "unavailable" || "0" },
  ];

  const fields = [
    {
      key: "id",
      _style: { minWidth: "15%" },
      label: "ID",
    },
    {
      key: "name",
      _style: { minWidth: "15%" },
      label: "name",
    },
    {
      key: "description",
      _style: { minWidth: "15%" },
      label: "Description",
    },
    {
      key: "price",
      _style: { minWidth: "15%" },
      label: "Price",
    },
    {
      key: "discount_price",
      _style: { minWidth: "5%" },
      label: "Discount Price",

    },
    {
      key: "region",
      _style: { minWidth: "1%" },
      label: "Region",

    },
    {
      key: "quantity",
      _style: { minWidth: "1%" },
      label: "Quantity",

    },
  ];

  return (
    <>
      <WidgetsDropdown widgetList={widgetList} />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {seller_details && seller_details.seller_details.order && seller_details.seller_details.order.length > 0 && (
                <CDataTable
                  items={seller_details.seller_details.order}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Orders Table</h3>
                    </div>
                  }
                  scopedSlots={{
                    firstName: (serviceman) => (
                      <td>
                        <Link
                          to={{
                            pathname: `${url}/serviceman-${serviceman._id}`,
                          }}
                        >
                          {serviceman ? serviceman.firstName : null}
                        </Link>
                      </td>
                    ),
                    number: (serviceman) => (
                      <td>{serviceman ? serviceman.phone : null}</td>
                    ),
                    no_of_jobs: (serviceman) => (
                      <td>
                        {serviceman ? serviceman.numberOfJobs : "Not Available"}
                      </td>
                    ),
                    active_status: (serviceman) => (
                      <td>
                        {serviceman.active_status === true
                          ? "active"
                          : "inactive"}
                      </td>
                    ),
                    date_created: (serviceman) => (
                      <td>
                        {formateDate(serviceman.date_created)}{" "}
                        {formatTime(serviceman.date_created)}
                      </td>
                    ),
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

export default SellerOrderDetails;
