import React, { useState } from 'react';
import {
	CButton,
	CCard,
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
	handleOnChangeBannerName,
	handleOnChangeAvailable,
	catName,
	image_url,
	editMode,
	available,
	id
}) => {


	const [ ] = useState('');
	const [ selectedImage, setSelectedImage ] = React.useState('');


	const handleImageUpload = () => {
		let form = new FormData();
		form.append('image', selectedImage);
		form.append('id', id);
		form.append('title',catName)
		form.append('active',available)

		if(editMode){

		userService
			.uploadBannerImage(form)
			.then(() => {
				toast.success('Image uploaded');
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			})
			.catch((error) => {
				console.log(error);
			});
		}else{
			userService
			.createBanner(form)
			.then(() => {
				toast.success('Image uploaded');
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			})
			.catch((error) => {
				console.log(error);
			});
			
		}
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
								<CLabel htmlFor="creditReason">Banner Name</CLabel>
								<CInput
									type="text"
									placeholder="name"
									value={catName}
									onChange={handleOnChangeBannerName}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="availability">Available</CLabel>
								<br/>
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
											onChange={handleOnChangeAvailable}
										/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="region">Banner Image</CLabel>
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
												height={'150px'}
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
												{editMode ?  "Upload" :"Create"}
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
							{
								editMode && <><CButton color="success" onClick={handleSuccess}>
								{editMode ? "Update" : "Go ahead"}
							</CButton>{' '}
							<CButton color="secondary" onClick={handleCancel}>
								Cancel
							</CButton></>
							}
							
						</CModalFooter>
					</CModal>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Modals;
