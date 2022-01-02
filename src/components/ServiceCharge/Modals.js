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

const Modals = ({
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

	sCharge,
	sShipping,
	isNew
}) => {
	const [ modal, setModal ] = useState(true);
	const [ large, setLarge ] = useState(false);
	const [ small, setSmall ] = useState(false);
	const [ primary, setPrimary ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ warning, setWarning ] = useState(false);
	const [ danger, setDanger ] = useState(false);
	const [ info, setInfo ] = useState(false);
	const [ regionn, setRegion ] = React.useState('');

	const regions = useSelector((state) => state.dashbord.availableRegions);
	// const regions = useSelector((state) => state.region.region);


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
					{isNew &&		<CFormGroup>
								<CLabel htmlFor="region">Select Region</CLabel>
								<CSelect
									custom
									value={regionn}
									name="region"
									id="creditReason"
									onChange={handleRegionChange}
								>
									{regions &&
										regions.map((item) => {
											return (
												<option value={item.name} key={item.id}>
													{item.name}
												</option>
											);
										})}
								</CSelect>
								{/* {selectError && <p style={{ color:"red" }}>{selectError}</p>} */}
							</CFormGroup>}

							<CFormGroup>
								<CLabel htmlFor="creditReason">Shipping Cost</CLabel>
								<CInput
									type="number"
									placeholder="0.0"
									value={sShipping}
									onChange={handleOnChangeSCost}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="creditReason">Service Charge</CLabel>
								<CInput
									type="number"
									placeholder="0.0"
									onChange={handleOnChangeSCharge}
									value={sCharge}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
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
