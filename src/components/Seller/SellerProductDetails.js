import React,{useState} from "react";
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
import ViewProductModals from './ViewProductModals'

const SellerProductDetails = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const servicemen = useSelector((state) => state.servicemen.servicemen);
  const totalActiveSellers = useSelector((state) => state.dashbord.totalActiveSellers);
  const totalInActiveSellers = useSelector((state) => state.dashbord.totalInActiveSellers);

  const allSellers = useSelector((state) => state.seller.sellers);

  const seller_details = useSelector((state) => state.seller.seller_details);

  const [showModals, setShowModals] = useState(false)


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
      key: "image",
      _style: { minWidth: "15%" },
      label: "Image",
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
      key: "category",
      _style: { minWidth: "20%" },
      label: "Category",
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
      key: "available",
      _style: { minWidth: "1%" },
      label: "Available",

    },
    { key: 'View', label: 'Action ', _style: { width: '20%' } }

  ];

  return (
    <>
<CButton
        size="md"
        color="primary"
        className="mb-4 float-md-right"
        onClick={() => history.push(`/seller/products/add`)}
      >
        Add Products +
      </CButton>
      
      <ViewProductModals show={showModals}/>
      <CRow>
        
        <CCol>
          <CCard>
            <CCardBody>
              {seller_details && seller_details.seller_details.products && seller_details.seller_details.products.length > 0 && (
                <CDataTable
                  items={seller_details.seller_details.products}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Products Table</h3>
                    </div>
                  }
                  scopedSlots={{
                    image: (serviceman) => (
                      <td>
                        
                        <img src={serviceman.images[0].image_url} width={100} height={100}/>
                      </td>
                    ),
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
                    category: (item) => (
                      <td>
                        {item && item.category ?( <p>{item.category.name}</p>): "Not Available"}
                      </td>
                    ),
                    date_created: (serviceman) => (
                      <td>
                        {formateDate(serviceman.date_created)}{" "}
                        {formatTime(serviceman.date_created)}
                      </td>
                    ),
                    available: (item) => (
                      <td>
                        {item.available ? "Available" : 'unavailable'}
                      </td>
                    ),
                    View: (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="info"
                            // variant="outline"
                            style={{ borderRadius: '5px', width: '100px' }}
                            size="sm"
                            onClick={() => history.push(`/seller/products/${item.id}`)}>
                            {/* onClick={() => setShowModals(true)}> */}
                            View
                            </CButton>
                        </td>
                      );
                    }
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

export default SellerProductDetails;
