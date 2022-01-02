import React from "react";
import { useSelector } from "react-redux";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CSpinner,
} from "@coreui/react";
import { formateDate, formatTime } from "../../utils/formatDate";
import { commaDelimitNumber } from "../../utils/formatPrice";
import { useHistory, useRouteMatch } from "react-router";
import { useState } from "react";
import userService from "src/services/user.service";
import Modals from './Modals';
import { toast } from 'react-toastify';

const Services = (props) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const category = useSelector((state) => state.category);
  const parts = useSelector((state) => state.services.parts);
  const [modalId, setModalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [state, setState] = useState({name:'', id:"", image:""});
  const [id,setId]= useState('')
  const [name,setName]= useState('')
  const [image,setImage]= useState('')


  const fields = [
    {
      key: "image",
      _style: { minWidth: "15%" },
      label: "Image",
    },
    {
      key: "name",
      _style: { minWidth: "15%" },
      label: "Service Type",
    },

    {
      key: "action",
      label: "Actions",
      _style: { minWidth: "1%" },
    },
  ];

  const handleOnChangeCatname=(e)=>{
    console.log('===', e.target.value);
    setName(e.target.value)
  }

  const handleSuccess =()=>{
    let data={
      id: id,
      name:name
    }
    console.log('???????????: ',data)
    console.log('???????2????: ',{id: id, name:name})
  userService.updateCategory(data).then(response =>{
    toast.success("Category name update")
  }).catch(err =>{
    console.log(err)
  })
  }

  const handleImageUpload=()=>{

  }

  return (
    <>
      {loading && <CSpinner className="loader" size="lg" />}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CButton
          size="md"
          color="primary"
          className="mb-4"
          onClick={() => history.push(`${url}/add-category`)}
        >
          Add Category+
        </CButton>
        <Modals show={showModals}
         catName={name}
         image_url={image}
         id={id}
         handleSuccess={handleSuccess}
        //  handleImageUpload={handleImageUpload}
         handleOnChangeCatname={handleOnChangeCatname}
         
         editMode={true}/>
      </div>
      {category &&  (
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>
                {category && (
                  <CDataTable
                    items={category.categories}
                    fields={fields}
                    items-per-page-select
                    items-per-page="5"
                    hover
                    pagination
                    table-filter
                    cleaner
                    overTableSlot={
                      <div className="center-flex">
                        <h3>Services</h3>
                      </div>
                    }
                    scopedSlots={{
                      image: (service) => <td><img  style={{ objectFit: 'cover',width: '50%'
                      }}src={service.image_url} width ={'50px'} height={'100px'}/></td>,
                    //   tag: (service) => <td>{service.tag}</td>,
                    //   // price: (service) => (
                    //   //   // <td>&#x20A6;{commaDelimitNumber(service.price)}</td>
                    //   // ),
                    //   date_created: (service) => (
                    //     <td>
                    //       {formateDate(service.date_created)}{" "}
                    //       {formatTime(service.date_created)}
                    //     </td>
                    //   ),
                    //   part_category: (part) => (
                    //     <td>
                    //       <CButton
                    //         color="primary"
                    //         variant="outline"
                    //         size="sm"
                    //         className="mx-1"
                    //         onClick={() =>
                    //         }
                    //         disabled={findArgInArray(
                    //           parts.map((prt) => prt.title),
                    //           part.title
                    //         )}
                    //       >
                    //         Create Part Category
                    //       </CButton>
                    //     </td>
                    //   ),
                      action: (category) => (
                        <td>
                          <CButton
                            color="warning"
                            variant="outline"
                            size="sm"
                            className="mx-1"
                            onClick={() =>{
                              setShowModals(true);
                              setId(category.id)
                              setName(category.name)
                              setImage(category.image_url)
                               setState({name: category.name, id: category.id, image:category.image_url});
                              // console.log('MMMMM: ',category)
                            }
                            }
                          >
                            edit
                          </CButton>
                  
                        </td>
                      ),
                    }}
                  />
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default Services;
