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
  CSelect,
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
	name,
	email,
	password,
	handleOnChangeCatname,
	editMode,
  available,
  role,
	id
}) => {
	const [] = useState('');
	const [ selectedImage, setSelectedImage ] = React.useState('');

	const handleImageUpload = () => {
		let form = new FormData();
		form.append('image', selectedImage);
		form.append('id', id);
		// form.append('title',catName)
		form.append('active', available);

		if (editMode) {
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
		} else {
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
								<CLabel htmlFor="creditReason">Name</CLabel>
								<CInput
									type="text"
									placeholder="name"
									value={name}
									onChange={(e) => handleOnChangeCatname(e.target.value, 'name')}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="creditReason">Email</CLabel>
								<CInput
									type="text"
									placeholder="email"
									value={email}
									onChange={(e) => handleOnChangeCatname(e.target.value, 'email')}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="creditReason">Password</CLabel>
								<CInput
									type="password"
									placeholder="password"
									value={password}
									onChange={(e) => handleOnChangeCatname(e.target.value, 'password')}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="availability">Available</CLabel>
								<br />
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
								<CSelect
									custom
									value={role}
									name="role"
									id="role"
                  // onChange={(e) => handleOnChangeUpdateOrder(item.id, e.target.value)}
                  onChange={(e) => handleOnChangeCatname(e.target.value, 'role')}

								>
									<option value="2">Admin</option>
									<option value="1">Super Admin</option>
				
								</CSelect>
							</CFormGroup>
						</CModalBody>
						<CModalFooter>
							<CButton color="success" onClick={handleSuccess}>
								{editMode ? 'Update' : 'Go ahead'}
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
