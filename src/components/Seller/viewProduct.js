import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { CRow, CCol, CCard, CCardBody, CLabel, CInput, CTextarea, CFormGroup, CSelect, CButton, CSpinner, CSwitch } from '@coreui/react';
import checkEmptyProperties from 'src/utils/checkEmptyProperties';
import { emailValidation } from 'src/utils/validations';
import userService from 'src/services/user.service';
import { toast } from 'react-toastify';
import ViewProductImageModals from './ViewProductImageModals';
import Modals from './Modals';

const ViewProduct = (props) => {
	const regions = useSelector((state) => state.region.region);
	const categories = useSelector((state) => state.category.categories);

	// const seller = useSelector((state) => state.seller &&  state.seller.seller_details.seller_details);
	const history = useHistory();
	const { id } = useParams();

	const [loading, setLoading] = React.useState(false);
	const [category, setCategory] = React.useState(categories && categories.length > 0 ? categories[0].id : '');
	const [selectErrorCategory, setSelectErrorCategory] = React.useState('');

	const [regionn, setRegion] = React.useState('');
	const [selectError, setSelectError] = React.useState('');
	const [selectValue, setSelectValue] = React.useState(false);
	const [productPayload, setProductPayload] = React.useState({});
	const [editMode, setEditMode] = React.useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [clickedImage, setclickedImage] = useState(null);
	const [showImageModal, setshowImageModal] = useState(false);

	const [productInstance, setProductInstance] = useState(null);
	const [p, setP] = useState(null);
	const [confirmDeleteTitle, setConfirmDeleteTitle] = useState('');
	const [showD, setShowD] = useState(false)
	const [aState, setAState] = useState(false)
	const [isD, setIsD] = useState(false)
	const [stateCategory, setstateCategory] = useState('')
	const [imageId, setImageId] = useState('')
	const [ju, setJu] = useState('')


	const [state, setState] = React.useState({
		name: '',
		description: '',
		price: '',
		// available:aState,
		is_deal: 0,
		region: '',
		images: []
		// seller_id: seller && seller.seller_info.id
	});

	useEffect(() => {
		userService
			.getSellerProduct(id)
			.then((response) => {
				setLoading(false);
				setProductInstance(response.data.data)
				setP(response.data)
				setAState(response.data.available)
				setIsD(response.data.is_deal)
				setstateCategory(response.data.data.category.name)

				setState({
					name: response.data.data.name,
					description: response.data.data.description,
					price: response.data.data.price,
					is_deal: response.data.data.is_deal,
					region: response.data.data.region,
					available: response.data.data.available
				})
				setRegion(response.data.data.available)

			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (editMode) {
			setAState(p.data.available)
			setIsD(p.data.is_deal)
			setCategory(p.data.category.id)
			setState({
				name: productPayload.name,
				description: productPayload.description,
				price: productPayload.price,
				is_deal: p.data.is_deal,
				// available:productPayload.available
			})
			setRegion(productPayload.region)
		}


	}, [editMode])

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

	};

	const handleChangeRegion = (region) => {
		setState({ region: region })
		setRegion(region);
	};
	const handleImageUpload = () => {

		let form = new FormData();
		form.append('image', selectedImage)
		form.append('product_id', id)

		userService
			.uploadProductImage(form)
			.then((response) => {
				setLoading(false);
				console.log('=======',response.data.data.image_url)
				setJu(response.data.data.image_url)
				setSelectedImage(null)
				// setTimeout(() => {
				// 	window.location.reload();
				// }, 1000);

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

				toast.success("Image uploaded")
			})
			.catch((error) => {
				console.log(error);
			});

	}

	const handleIsDealToggle = () => {
		setIsD(!isD)
	}
	const handleAvailableToggleAvailable = () => {
		console.log(aState)
		setAState(!aState)
	}

	const handleUpdateProduct = () => {


		let newDataPayload = {
			name: state.name ? state.name : p.data.name,
			description: state.description ? state.description : p.data.description,
			price: state.price ? state.price : p.data.price,
			region: state.region ? state.region : p.data.region,
			available: aState,
			is_deal: isD,
			category_id:category
		}

		userService
			.updateProduct({ ...newDataPayload, id: id })
			.then((response) => {
				setLoading(false);
				toast.success("Product updated")
				setTimeout(() => {
					window.location.reload();
				}, 2000);

			})
			.catch((error) => {
				console.log(error);
			});

	}

	const handleImageDelete = (id) => {
		setConfirmDeleteTitle("Are you sure you want to delete image ?")
		setShowD(true)
		setImageId(id)

	}
	const handleCancelDialog = () => {
		setConfirmDeleteTitle("")
		setShowD(false)
	}


	const handleImageDeleteConfirm = () => {

		userService
			.deleteProductImage(imageId)
			.then((response) => {
				setLoading(false);
				setShowD(false)
				setTimeout(() => {
					window.location.reload();
				}, 1500);


				toast.success("Image Deleted")
			})
			.catch((error) => {
				console.log('ERR: ', error);
			});
	}

	const handleChangeCategory = (region) => {
		console.log(region)
		setCategory(region);
	};

	const handleViewImage = (item) => {
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
												<b>{state.name}</b>
											</CLabel>
										)}
								</CFormGroup>
							</CCol>
							<CCol sm="6">
								<CFormGroup>
									<CLabel>Description</CLabel>
									<br />

									{editMode ? (
										<CTextarea
											type="text"
											// size="md"
											value={state.description}
											name="description"
											onChange={inputChangeHandler}
										/>
									) : (
											<CLabel>
												<b>{state.description}</b>
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
											type="number"
											size="md"
											value={state.price}
											name="price"
											onChange={inputChangeHandler}
										/>
									) : (
											<CLabel>
												<b>{state.price}</b>
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
															<option value={item.name} key={item.id}>
																{item.name}
															</option>
														);
													})}
											</CSelect>
											{selectError && <p style={{ color: 'red' }}>{selectError}</p>}
										</>) : <CLabel htmlFor="region"><b>{state.region}</b></CLabel>

									}

								</CFormGroup>
							</CCol>

							<CCol xs="4">
								<CFormGroup>

									<CLabel htmlFor="isdeal">Is Deal</CLabel>
									{/* {systemMessage && systemMessage.spatch &&  <td>{systemMessage.spatch}</td>} */}
									{editMode ? (
										<div>

											<CSwitch
												className={'mx-1'}
												variant={'3d'}
												labelOff={'\u2715'}
												size={'lg'}
												color={'primary'}
												labelOn={'On'}
												checked={isD}
												type={'checkbox'}
												onChange={handleIsDealToggle}
											/>
										</div>
									) : (<p>{state.is_deal ? "Yes" : "No"}</p>)}
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
												checked={aState}
												color={'primary'}
												labelOn={'On'}
												type={'checkbox'}
												onChange={handleAvailableToggleAvailable}
											/>
										</div>) : (<p>{state.available ? "Yes" : "No"}</p>)
									}

								</CFormGroup>

							</CCol>

							<CCol xs="4">
								<CFormGroup>
									<CLabel htmlFor="region">Select Category</CLabel>
									{
										editMode ? (<>
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
												</>) :(<p>{stateCategory}</p>)
}

                    {/* // {selectErrorCategory && <p style={{ color: "red" }}>{selectErrorCategory}</p>} */}

								</CFormGroup>
							</CCol>

						</CFormGroup>


						<CCol xs="4">
							<CFormGroup>
								<CLabel htmlFor="region">Product Images</CLabel>
								<br />
								{
									<div style={{ display: "flex", flexDirection: "row" }}>
										{productInstance && productInstance.images && productInstance.images.length > 0 ? productInstance.images.map((item, index) => {
											return (
												<>
													<div style={{ display: "flex", flexDirection: "column", marginRight: 10 }}>
														<img
															key={item.id}
															src={item.image_url}
															width={150}
															onClick={() => handleViewImage(item.image_url)}
														/>

														{editMode && (<CButton
															color="danger"
															variant="outline"
															onClick={() => handleImageDelete(item.id)} style={{ marginTop: 10 }}>Delete</CButton>)}
													</div>
												</>
											)
										}) : <p>This product has no image(s)</p>}
										{ju && <img
															src={ju}
															width={150}
														/>}
									</div>

								}

								<Modals
									show={showD}
									title={confirmDeleteTitle}
									handleCancel={handleCancelDialog}
									handleSuccess={handleImageDeleteConfirm}
								/>

								<ViewProductImageModals
									show={showImageModal}
									img={clickedImage}
									handleCancel={() => setshowImageModal(false)}
								/>
								<div>
									{
										editMode && <><p>Select image to upload</p>
											{selectedImage && (
												<div>
													<img alt="not fount"
														width={"150px"}
														height={'150px'}
														style={{ marginBottom: 10, borderRadius: 10 }}
														src={URL.createObjectURL(selectedImage)} />
													<br />
													<CButton
														color="danger"
														variant="outline"
														onClick={() => setSelectedImage(null)}>Remove</CButton>
													<CButton
														color="success"
														variant="outline"
														style={{ marginLeft: 10 }}
														onClick={handleImageUpload}>Upload</CButton>
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
											/>
										</>
									}
								</div>
							</CFormGroup>
						</CCol>
						{/* <CButton
							style={{ position: 'relative',marginRight:'20px' }}
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
						</CButton> */}
						<CButton
							style={{ position: 'relative', marginRight: '20px' }}
							size="md"
							className="mb-4 float-md-right"
							color="warning"
							variant="outline"
							disabled={editMode}
							onClick={() => setEditMode(true)}
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


						{
							editMode ? <CButton
								style={{ position: 'relative', marginRight: '20px' }}
								size="md"
								color="success"
								variant="outline"
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
							</CButton> : null
						}

					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default ViewProduct;
