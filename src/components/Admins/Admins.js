import { CCard, CCardBody,CButton, CCol, CDataTable, CRow,CBadge } from "@coreui/react";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import Modals from './Modals';
import { toast } from 'react-toastify';
import userService from 'src/services/user.service';


const Admins = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const admins = useSelector((state) => state.admin.admins);
  const totalNumberOfAdmin = useSelector((state) => state.admin.number_of_admin);

  const [showModals, setShowModals] = useState(false);
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(0)
  const [availability, setAvailability] = useState(false)
  const [eMode, setEmode] = useState(false)
  const [adminId, setAdminId] = useState('')


  const fields = [
    {
      key: "id",
      _style: { minWidth: "15%" },
      label: "ID",
    },
    {
      key: "name",
      _style: { minWidth: "15%" },
      label: "Name",
    },
    {
      key: "email",
      _style: { minWidth: "15%" },
      label: "Email",
    },
    {
      key: "role_id",
      _style: { minWidth: "15%" },
      label: "Role",
    },
    {
      key: "status",
      _style: { minWidth: "15%" },
      label: "Active Status",
    },
    {
      key: "last_used_at",
      _style: { minWidth: "1%" },
    },
    {
      key: "view",
      _style: { minWidth: "1%" },
      label: "Action",

    },
  ];

  const widgetList = [
    {
      title: "Total Admin",
      totalAmount: totalNumberOfAdmin.toString() || "0",
    },
  ];

  const handleOnChangeCatname=(value, type)=>{
    if(type === 'name'){
      setName(value)
    }if(type === 'password'){
      setPassword(value)
    }
    if(type === 'email'){
      setEmail(value)
    }
    if(type === 'role'){
      setRole(value)
    }
    // if(type === 'note'){
    //   setNote(value)
    // }
  }

  const handleSuccess =()=>{
    let data={
      name:name,
      email: email,
      password: password,
      status: availability,
      role_id: role,
      id:adminId
    }

    if(eMode){
      userService
			.updateAdmin(data)
			.then(() => {
				toast.success('Admin updated successfully');
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			})
			.catch((error) => {
				console.log(error);
			});
    }else{
    userService
			.registerAdmin(data)
			.then(() => {
				toast.success('Admin registered successfully');
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			})
			.catch((error) => {
				console.log(error);
			});
    
  
    }}
  return (
    <>
    <Modals 
    title={"Admin"}
    show={showModals}
    handleSuccess={handleSuccess}
    handleOnChangeAvailable={(e) => setAvailability(!availability)}
    handleOnChangeCatname={handleOnChangeCatname}
    available={availability}
    role={role}
    name={name}
    email={email}
    password={password}
    available={availability}
    role={role}
    editMode={eMode}
    handleCancel={() => setShowModals(false)}

/>
      <WidgetsDropdown 
      widgetList={widgetList} 
      />
       <CButton
          size="md"
          color="primary"
          className="mb-4"
          onClick={() => { setShowModals(true) }}
        >
          Add Admin
          </CButton>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {admins && (
                <CDataTable
                  items={admins}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  columnFilter
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Admins</h3>
                    </div>
                  }
                  scopedSlots={{
                    role_id: (role) => (
                      <td>
                          {role.role_id === 1  ? "Super Admin" : "Admin"}
                      </td>
                    ),
                    status: (status) => (
                      <td>
                        <CBadge
                          color={status.status  === 1 ? "success" : "danger"}
                          style={{ padding: "8px", minWidth: "60px" }}
                        >
                          {status.status  === 1 ? "Active" : 'In-active'}
                        </CBadge>
                        
                        </td>
                    ),
                    customeaddress: (customer) => (
                      <td>
                        {customer.address ? customer.address : "Not Available"}
                      </td>
                    ),
                    customeremail: (customer) => (
                      <td>{customer ? customer.email : null}</td>
                    ),
                    last_used_at: (customer) => (
                      <td>
                        {formateDate(customer.last_used_at)}{" "}
                        {formatTime(customer.last_used_at)}
                      </td>
                    ),
                    view: (admin) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="info"
                            variant="outline"
                            // shape="square"
                            size="sm"
                            onClick={() => {
                              setShowModals(true)
                            setName(admin.name)
                            setEmail(admin.email)
                            setPassword(admin.password)
                            setAvailability(admin.status)
                            setRole(admin.role_id)
                            setAdminId(admin.id)
                            setEmode(true)
                            }}>
                             Update
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

export default Admins;
