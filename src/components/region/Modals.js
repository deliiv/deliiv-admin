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

import { DocsLink } from 'src/reusable';

const Modals = ({
	show,
	title,
	message,
	handleCancel,
	handleSuccess,
	modalColor,
	handleOnChangeAvailable,
	reasonValue,
	handleOnChangeRname,
	handleOnChangeSCharge,

	sCharge,
	rname,
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
								<CLabel htmlFor="creditReason">Region Name</CLabel>
								<CInput
									type="text"
									placeholder="name"
									value={rname}
									onChange={handleOnChangeRname}
									style={{ marginTop: '20px', marginBottom: '20px' }}
								/>
							</CFormGroup>
							<CFormGroup>
								<CLabel htmlFor="creditReason">Available</CLabel>
								<br/>
							<CSwitch
											className={'mx-1'}
											variant={'3d'}
											defaultChecked
											labelOff={'\u2715'}
											size={'lg'}
											// checked={active}
											color={'primary'}
											labelOn={'On'}
											type={'checkbox'}
											onChange={handleOnChangeAvailable}
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
