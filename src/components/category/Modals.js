import React, { useState } from 'react';
import {
	CButton,
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CModalTitle,
	CRow,
	CInput,
	CFormGroup,
	CLabel,
	CSwitch
} from '@coreui/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import userService from 'src/services/user.service';

const Modals = ({
	show,
	title,
	message,
	handleCancel,
	handleSuccess,
	modalColor,
	handleOnChangeAvailable,
	reasonValue,
	handleOnChangeCatname,
	handleChangeAvailable,

	available,
	catName,
	image_url,
	editMode,
	id
}) => {
	const [ modal, setModal ] = useState(true);
	const [ large, setLarge ] = useState(false);
	const [ small, setSmall ] = useState(false);
	const [ primary, setPrimary ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ warning, setWarning ] = useState(false);
	const [ danger, setDanger ] = useState(false);
	const [ active, setActive ] = useState(false);

	const [ categoryName, setCategoryName ] = useState('');
	const [ selectedImage, setSelectedImage ] = React.useState('');

	const regions = useSelector((state) => state.dashbord.availableRegions);

	const handleImageUpload = () => {
		let form = new FormData();
		form.append('image', selectedImage);
		form.append('category', id);

		userService
			.updateCategoryImage(form)
			.then((response) => {
				// setLoading(false);

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

				toast.success('Image uploaded');

				setTimeout(() => {
					window.location.reload();
				}, 1500);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<CRow>
			<CCol>
				<CCard>
					<CModal show={show} onClose={handleCancel} color={modalColor}>
						<CModalHeader closeButton>
							<CModalTitle>{title}</CModalTitle>
						</CModalHeader>
						<CModalBody>
							{message}

							<CFormGroup>
								<CLabel htmlFor="creditReason">Category Name</CLabel>
								<CInput
									type="text"
									placeholder="name"
									value={catName}
									onChange={handleOnChangeCatname}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
							<p>Availability</p>
										<CSwitch
											className={'mx-1'}
											variant={'3d'}
											defaultChecked
											labelOff={'\u2715'}
											size={'lg'}
											checked={available}
											color={'primary'}
											labelOn={'On'}
											type={'checkbox'}
											onChange={handleChangeAvailable}
										/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="region">Category Images</CLabel>
								<br />
								<div style={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
									<img
										src={image_url}
										width={150}
										height={150}
										// onClick={() => handleViewImage(item.image_url)}
									/>
									{/* {editMode && (<button onClick={()=>handleImageDelete(item.id)} style={{backgroundColor:"red" }}>Delete</button>)} */}
								</div>

								<div>
									{selectedImage && (
										<div style={{ marginTop: 20 }}>
											<img
												alt="not fount"
												width={'150px'}
												src={URL.createObjectURL(selectedImage)}
												style={{ marginBottom:20 }}
											/>
											<br />
											<CButton 
											color="warning"
											size="sm"
											className="mx-1"
											onClick={() => setSelectedImage(null)}>Remove</CButton>
											<CButton
												// variant="outline"
												color="success"
												size="sm"
												className="mx-1"
												onClick={handleImageUpload}
											>
												Upload
											</CButton>
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
								</div>
							</CFormGroup>
							
						</CModalBody>
						<CModalFooter>
							<CButton color="success" onClick={handleSuccess}>
								Go ahead
							</CButton>{' '}
							<CButton color="secondary" onClick={handleCancel}>
								Cancel
							</CButton>
						</CModalFooter>
					</CModal>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Modals;
