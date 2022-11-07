import React from 'react';
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
	CLabel
} from '@coreui/react';

const CustomerModals = ({
	show,
	title,
	message,
	handleCancel,
	handleSuccess,
	modalColor,
	handleOnChangeSCost,
	sChargeEdit,
	sShipping}) => {

	return (
		<CRow>
			<CCol>
				<CCard>
					<CModal show={show} onClose={handleCancel} color={modalColor}>
						<CModalHeader closeButton>
							<CModalTitle>{title} user wallet</CModalTitle>
						</CModalHeader>
						<CModalBody>
							{message}
							{
								!sChargeEdit && (<CFormGroup>
									<CLabel htmlFor="creditReason">Amount</CLabel>
									<CInput
										type="number"
										placeholder="0.0"
										value={sShipping}
										onChange={handleOnChangeSCost}
										style={{ marginTop: '20px', marginBottom: '20px' }}
									/>
								</CFormGroup>)
							}

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

export default CustomerModals;
