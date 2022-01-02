import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CRow, CCol, CCard, CCardBody, CLabel, CInput, CFormGroup, CSelect, CButton, CSpinner } from '@coreui/react';
import checkEmptyProperties from 'src/utils/checkEmptyProperties';
import { emailValidation } from 'src/utils/validations';
import userService from 'src/services/user.service';
import { toast } from 'react-toastify';

const AddProduct = (props) => {
	const regions = useSelector((state) => state.dashbord.availableRegions);
	const categories = useSelector((state) => state.dashbord.categories);
	const seller = useSelector((state) => state.seller.seller_details.seller_details);
	const history = useHistory();

	const [ loading, setLoading ] = React.useState(false);
	const [ regionn, setRegion ] = React.useState('');
	const [ category, setCategory ] = React.useState('');
	const [ selectError, setSelectError ] = React.useState('');
	const [ selectValue, setSelectValue ] = React.useState(false);

	const [ state, setState ] = React.useState({
		name: '',
		description: '',
    price: '',
    seller_id:seller && seller.seller_info.id,
	});

	const inputChangeHandler = (event) => {
		const { name, value } = event.target;
		setState((prevState) => {
			return {
				...prevState,
				[name]: value
			};
		});
	};

	const submitForm = () => {
    setLoading(true);
    if(!category){
      setSelectError("category is required")
      setLoading(false)
    }
    else if(!regionn){
      setSelectError("Region is required")
      setLoading(false)
    }else{
		console.log('********',{...state,region:regionn, category_id:category})
      userService
		  .addProductByAdmin({...state,region:regionn, category_id:category})
		  .then(() => {
		    setLoading(false);
		    history.push("/seller");
        window.location.reload();
        toast.success("product added")

		  })
		  .catch((error) => {
        toast.error(error.response.data.message)
		  });
    }

	};

	const handleChangeRegion = (region) => {
		setRegion(region);
		console.log('===', region);
	};
	const handleChangeCategory = (region) => {
		setCategory(region);
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
									<CLabel>Name</CLabel>
									<CInput
										type="text"
										size="md"
										value={state.name}
										name="name"
										onChange={inputChangeHandler}
									/>
								</CFormGroup>
							</CCol>
							<CCol sm="6">
								<CFormGroup>
									<CLabel>Description</CLabel>
									<CInput
										type="text"
										size="md"
										value={state.description}
										name="description"
										onChange={inputChangeHandler}
									/>
								</CFormGroup>
							</CCol>
							<CCol sm="6">
								<CFormGroup>
									<CLabel>Price</CLabel>
									<CInput
										type="tel"
										size="md"
										value={state.price}
										name="price"
										onChange={inputChangeHandler}
									/>
								</CFormGroup>
							</CCol>
							{/* <CCol sm="6"> */}
							{/* <CFormGroup>
                    <CLabel>Email</CLabel>
                    <CInput
                      type="email"
                      size="md"
                      value={state.email}
                      name="email"
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup> */}
							{/* </CCol> */}

              <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="region">Select Region</CLabel>
                    <CSelect custom value={regionn} name="region" id="creditReason" 
                    onChange={(e) => handleChangeRegion(e.target.value)}>
                    {regions &&
											regions.map((item) => {
												return (
													<option value={item.name} key={item.id}>
														{item.name}
													</option>
												);
											})}
                    </CSelect>
                    {selectError && <p style={{ color:"red" }}>{selectError}</p>}

                  </CFormGroup>
                </CCol>
              <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="region">Select Category</CLabel>
                    <CSelect custom value={category} name="category" id="category" 
                    onChange={(e) => handleChangeCategory(e.target.value)}>
                    {categories &&
											categories.map((item) => {
												return (
													<>
                          <option value={item.id} key={item.id}>
														{item.name}
													</option>
                          </>
												);
											})}
                    </CSelect>
                    {selectError && <p style={{ color:"red" }}>{selectError}</p>}

                  </CFormGroup>
                </CCol>
						</CFormGroup>
						<CButton
							style={{ position: 'relative' }}
							size="md"
							color="primary"
							className="mb-4 float-md-right"
							disabled={checkEmptyProperties(state)}
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
							<span className={`${loading && 'text-primary'}`}>Add Product</span>
						</CButton>
					</CCardBody>
					{/* )} */}
				</CCard>
			</CCol>
		</CRow>
	);
};

export default AddProduct;
