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
	CSwitch,
	CTextarea
} from '@coreui/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import userService from 'src/services/user.service';
import ModalsX from './Modals'

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
	note,
	handleDelete,


	productQuantity,
	productName,
	productPrice,
	images,
	editMode,
	id,
	
}) => {

	const [ selectedImage, setSelectedImage ] = React.useState('');
	const handleViewImage=()=>{
		
	}
	const regions = useSelector((state) => state.dashbord.availableRegions);

	const handleImageUpload = () => {
		let form = new FormData();
		form.append('image', selectedImage);
		form.append('product_id', id);

		userService
			.updateStoreProductImage(form)
			.then((response) => {
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
					<CModal 
					show={show} 
					onClose={handleCancel} 
					color={modalColor}>
						<CModalHeader closeButton>
							<CModalTitle>{title}</CModalTitle>
						</CModalHeader>
						<CModalBody>
							{message}

							<CFormGroup>
								<CLabel htmlFor="productName">Product Name</CLabel>
								<CInput
									type="text"
									placeholder="Product name"
									value={productName}
									onChange={e=>handleOnChangeCatname(e.target.value, 'name')}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="creditReason">Price</CLabel>
								<CInput
									type="number"
									placeholder="Price"
									value={productPrice}
									onChange={e=>handleOnChangeCatname(e.target.value, 'price')}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="creditReason">Quantity</CLabel>
								<CInput
									type="number"
									placeholder="name"
									value={productQuantity}
									onChange={e=>handleOnChangeCatname(e.target.value, 'quantity')}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="creditReason">Note</CLabel>
								<CTextarea
									type="text"
									placeholder="Note"
									value={note}
									onChange={e=>handleOnChangeCatname(e.target.value, 'note')}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								{editMode ? (<>
									<CLabel htmlFor="region">Product Images</CLabel>
								<div style={{ display:"flex", flexDirection:"row" }}>
										{images &&  images.length > 0 ?  images.map((item, index) =>{
												return(
													<>
													<div  style={{display:"flex",flexWrap:'wrap',overflow:"scroll", flexDirection:"column", marginRight:10 }}>
														<img 
														key={item.id}
														src={item.image_url} 
														width={150}
														onClick={() => handleViewImage(item.image_url)}
														/>
														{editMode && (<CButton
														color="danger"
														variant="outline"
														onClick={()=>handleDelete(item.id)} style={{marginTop:10 }}>Delete</CButton>)}
													</div>
													</>
												)
										}) : <p>This product has no image(s)</p>}
									</div>
								</>) : null}
								

								{editMode ? (<div>
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
								</div>) : null
}
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
