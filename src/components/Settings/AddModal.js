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
	CSelect
} from '@coreui/react';
import { useSelector } from 'react-redux';

import { DocsLink } from 'src/reusable';

const AddModal = ({
	show,
	title,
	message,
	handleCancel,
	handleSuccess,
	modalColor,
	handleRegionChange,
	reasonValue,
	handleOnChangeSCost,
	handleOnChangeSCharge,

	percentage,
	from_amount,
	to_amount,
	sChargeEdit,
	sCharge,
	sShipping,
	isNew
}) => {

	const [regionn, setRegion] = React.useState('');

	const regions = useSelector((state) => state.dashbord.availableRegions);

	return (
		<CRow>
			<CCol>
				<CCard>
					<CModal show={show} onClose={handleCancel} color={modalColor}>
						<CModalHeader closeButton>
							<CModalTitle>{title}</CModalTitle>
						</CModalHeader>
						<CModalBody>					

						<CFormGroup>
									<>
										<CLabel htmlFor="creditReason">Percentage</CLabel>
										<CInput
											type="number"
											placeholder="0.0"
											onChange={e => handleOnChangeSCharge(e.target.value, 'percentage')}
											value={percentage}
											style={{ marginTop: '20px', marginBottom: '20px' }}
										/>
										<CLabel htmlFor="creditReason">From amount</CLabel>
										<CInput
											type="number"
											placeholder="0.0"
											onChange={e => handleOnChangeSCharge(e.target.value, 'from_amount')}
											value={from_amount}
											style={{ marginTop: '20px', marginBottom: '20px' }}
										/>
										<CLabel htmlFor="creditReason">To amount</CLabel>
										<CInput
											type="number"
											placeholder="0.0"
											onChange={e => handleOnChangeSCharge(e.target.value, 'to_amount')}
											value={to_amount}
											style={{ marginTop: '20px', marginBottom: '20px' }}
										/>
									</>


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

export default AddModal;
