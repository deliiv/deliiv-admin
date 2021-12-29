import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { CRow, CCol, CCard, CCardBody, CLabel, CInput, CFormGroup, CSelect, CButton, CSpinner,CSwitch } from '@coreui/react';
import checkEmptyProperties from 'src/utils/checkEmptyProperties';
import { emailValidation } from 'src/utils/validations';
import userService from 'src/services/user.service';
import { toast } from 'react-toastify';
import ViewProductImageModals from './ViewProductImageModals';

const ViewProduct = (props) => {
	const regions = useSelector((state) => state.dashbord.availableRegions);
	// const seller = useSelector((state) => state.seller &&  state.seller.seller_details.seller_details);
	const history = useHistory();
	const { id } = useParams();

	const [ loading, setLoading ] = React.useState(false);
	const [ regionn, setRegion ] = React.useState('');
	const [ selectError, setSelectError ] = React.useState('');
	const [ selectValue, setSelectValue ] = React.useState(false);
	const [ productPayload, setProductPayload ] = React.useState({});
	const [ editMode, setEditMode ] = React.useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [clickedImage, setclickedImage] = useState(null);
	const [showImageModal, setshowImageModal] = useState(false);


	const [ state, setState ] = React.useState({
		name: '',
		description: '',
		price: '',
		available:0,
		is_deal:0,
		region:'',
		// seller_id: seller && seller.seller_info.id
	});

	useEffect(() => {
		userService
			.getSellerProduct(id)
			.then((response) => {
				setLoading(false);
				console.log('=========', response.data)
				
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() =>{
		if(editMode){
			setState({name:productPayload.name, 
				description: productPayload.description,
				price: productPayload.price, 
				is_deal:productPayload.is_deal,
				available:productPayload.available})
				setRegion(productPayload.region)

				console.log('+++=: ', productPayload)

		}
		

	},[editMode])

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
		if (!regionn) {
			setSelectError('Region is required');
			setLoading(false);
		} else {
		}
		console.log('^^^^^^^^^', state);
		console.log('^^^^^Region^^^^', regionn);
	};

	const handleChangeRegion = (region) => {
		setState({region:region})
		setRegion(region);
		console.log('===', region);
	};
const handleImageUpload =()=>{

	let form = new FormData();
	form.append('image', selectedImage)
	form.append('product_id', id)

	userService
	.uploadProductImage(form)
	.then((response) => {
		setLoading(false);

		userService
			.getSellerProduct(id)
			.then((response) => {
				setLoading(false);
				setProductPayload(response.data.data);
				setSelectedImage(null)
				
			})
			.catch((error) => {
				console.log(error);
			});

		toast.success("Image uploaded")
	})
	.catch((error) => {
		console.log(error);
	});
	
}

const handleAvailableToggle=(name)=>{

	if(name === 'available'){
		setState({available:!state.available})
	}
	if(name === 'is_deal'){
		setState({is_deal:!state.is_deal})
	}
}

const handleUpdateProduct =()=>{


	let newDataPayload={
		name: state.name ? state.name : productPayload.name,
		description: state.description ? state.description : productPayload.description,
		price: state.price ? state.price : productPayload.price,
		region: state.region ? state.region : productPayload.region,
		available: state.available ? state.available : productPayload.available,
		is_deal: state.is_deal ? state.is_deal : productPayload.is_deal
	}
	console.log('%%%%%%%%%%%', newDataPayload)

	userService
	.updateProduct({...newDataPayload, id:id})
	.then((response) => {
		setLoading(false);
		toast.success("Image uploaded")
	})
	.catch((error) => {
		console.log(error);
	});

}

const handleImageDelete=(id)=>{
	
	userService
	.deleteProductImage(id)
	.then((response) => {
		setLoading(false);
		// userService
		// 	.getSellerProduct(id)
		// 	.then((response) => {
		// 		setLoading(false);
		// 		setProductPayload(response.data.data);
		// 		setSelectedImage(null)
				
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});

		toast.success("Image Deleted")
	})
	.catch((error) => {
		console.log('ERR: ', error);
	});
}

const handleViewImage=(item)=>{
	setclickedImage(item)
	setshowImageModal(true)
}
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
									<br />
									{editMode ? (
										<CInput
											type="text"
											size="md"
											value={state.name}
											name="name"
											onChange={inputChangeHandler}
										/>
									) : (
										<CLabel>
											<b>{productPayload.name}</b>
										</CLabel>
									)}
								</CFormGroup>
							</CCol>
							<CCol sm="6">
								<CFormGroup>
									<CLabel>Description</CLabel>
									<br />

									{editMode ? (
										<CInput
											type="text"
											size="md"
											value={state.description}
											name="description"
											onChange={inputChangeHandler}
										/>
									) : (
										<CLabel>
											<b>{productPayload.description}</b>
										</CLabel>
									)}
								</CFormGroup>
							</CCol>
							<CCol sm="6">
								<CFormGroup>
									<CLabel>Price</CLabel>
									<br />

									{editMode ? (
										<CInput
											type="tel"
											size="md"
											value={state.price}
											name="price"
											onChange={inputChangeHandler}
										/>
									) : (
										<CLabel>
											<b>{productPayload.price}</b>
										</CLabel>
									)}
								</CFormGroup>
							</CCol>

							<CCol xs="4">
								<CFormGroup>
									<CLabel htmlFor="region">Region</CLabel>
									<br />
									{
										editMode ? (<>
										<CSelect
											custom
											value={regionn}
											name="region"
											id="creditReason"
											onChange={(e) => handleChangeRegion(e.target.value)}>
											{regions &&
												regions.map((item) => {
													return (
														<option value={item.id} key={item.id}>
															{item.name}
														</option>
													);
												})}
										</CSelect>
										{selectError && <p style={{ color: 'red' }}>{selectError}</p>}
										</>) : <CLabel htmlFor="region"><b>{productPayload.region}</b></CLabel>

									}
									
								</CFormGroup>
							</CCol>

							<CCol xs="4">
							<CFormGroup>

											<CLabel htmlFor="isdeal">Is Deal</CLabel>
											{/* {systemMessage && systemMessage.spatch &&  <td>{systemMessage.spatch}</td>} */}
											{ editMode ? (
												<div>

												<CSwitch
													className={'mx-1'}
													variant={'3d'}
													defaultChecked
													labelOff={'\u2715'}
													size={'lg'}

													checked={productPayload.is_deal}
													// onChange={() => handleAvailableToggle('spatch', spatch)}

													color={'primary'}
													labelOn={'On'}
													 checked={state.is_deal}
													type={'checkbox'}
													onChange={()=>handleAvailableToggle('is_deal')}
												/>
											</div>
											):(<p>{productPayload.is_deal ? "Yes" : "No"}</p>)}
							</CFormGroup>

							</CCol>
							<CCol xs="4">
							<CFormGroup>

											<CLabel htmlFor="available">Available</CLabel>
											{
												editMode ? (<div>

													<CSwitch
														className={'mx-1'}
														variant={'3d'}
														defaultChecked
														labelOff={'\u2715'}
														size={'lg'}
	
														checked={productPayload.available}
														// onChange={() => handleAvailableToggle('spatch', spatch)}
	
														color={'primary'}
														labelOn={'On'}
														checked={state.available}
														type={'checkbox'}
														onChange={()=>handleAvailableToggle('available')}
													/>
												</div>) :(<p>{productPayload.available ? "Yes" : "No"}</p>)
											}
											
											</CFormGroup>

							</CCol>
							
						</CFormGroup>
						

						<CCol xs="4">
								<CFormGroup>
									<CLabel htmlFor="region">Product Images</CLabel>
									<br />
									{
									<div style={{ display:"flex", flexDirection:"row" }}>
										{productPayload.images && productPayload.images.length > 0 ?  productPayload.images.map((item, index) =>{
												return(
													<>
													<div  style={{display:"flex", flexDirection:"column", marginRight:10 }}>
														<img 
														key={item.id}
														src={item.image_url} 
														width={150}
														onClick={() => handleViewImage(item.image_url)}
														/>
														{editMode && (<button onClick={()=>handleImageDelete(item.id)} style={{backgroundColor:"red" }}>Delete</button>)}
													</div>
													</>
												)
											}) : <p>This product has no image(s)</p>}
										</div>

									}
									
									<ViewProductImageModals 
										show={showImageModal} 
										img={clickedImage}
										handleCancel={()=>setshowImageModal(false)}
									/>
									<div>
      {
		  editMode && <><p>Select image to upload</p>
		  {selectedImage && (
			<div>
			<img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
			<br />
			<button onClick={()=>setSelectedImage(null)}>Remove</button>
			<button onClick={handleImageUpload}>Upload</button>
			</div>
		  )}
		  <br />
		 
		  <br /> 
		  <input
			type="file"
			name="myImage"
			onChange={(event) => {
			  setSelectedImage(event.target.files[0]);
			}}
		  /></>
	  }
    </div>
								</CFormGroup>
							</CCol>
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
						<CButton
							style={{ position: 'relative' }}
							size="md"
							color="primary"
							className="mb-4 float-md-right"
							disabled={editMode}
							onClick={()=>setEditMode(true)}
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
							<span className={`${loading && 'text-primary'}`}>Edit Product</span>
						</CButton>
						<CButton
							style={{ position: 'relative' }}
							size="md"
							color="primary"
							className="mb-4 float-md-right"
							// disabled={editMode}
							onClick={handleUpdateProduct}
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
							<span className={`${loading && 'text-primary'}`}>Update Product</span>
						</CButton>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default ViewProduct;
