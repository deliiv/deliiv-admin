import React, { useState, useEffect } from 'react';
import {
	CCol,
	CNav,
	CNavItem,
	CNavLink,
	CRow,
	CTabContent,
	CTabPane,
	CCard,
	CCardBody,
	CTabs,
	CCardHeader,
	CSwitch
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { DocsLink } from 'src/reusable';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import SellerProductDetails from './SellerProductDetails';
import { fetchSellerDetails } from '../../store/sellers-actions';
import SellerOrderDetails from './SellerOrderDetails';
import userService from 'src/services/user.service';
import Modals2 from './Modals2';
import { toast } from 'react-toastify';

const Tabs = (props) => {
	const dispatch = useDispatch();
	const seller_details = useSelector((state) => state.seller.seller_details);

	const [ active, setActive ] = useState(false);
	const [ showDialog, setshowDialog ] = useState(false);

	useEffect(
		() => {
			dispatch(fetchSellerDetails(props.match.params.id));
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			if (seller_details && seller_details.seller_details && seller_details.seller_details.seller_info) {
				setActive(seller_details.seller_details.seller_info.active);
			}
		},
		[ seller_details ]
	);

	const handleModalSuccess = () => {
		const { id } = seller_details.seller_details.seller_info;

		let data = { seller: id, status: active };

		userService
			.updateSellerInfo(data)
			.then((response) => {
				toast.success(`Seller status set to ${!active}`);
				setshowDialog(false);
				window.location.reload();
			})
			.catch((error) => {
				console.log('ERR: ', error);
			});
	};
	return (
		<CRow>
			<CCol xs="12" md="12" className="mb-4">
				<Modals2
					show={showDialog}
					title={'Change Seller Active Status'}
					message={`Are you sure you want to ${seller_details &&
					seller_details.seller_details.seller_info.active
						? 'Deactivate'
						: 'Activate'} Seller`}
					handleSuccess={handleModalSuccess}
					handleCancel={() => setshowDialog(false)}
				/>
				<CCard>
					<CCardHeader>Seller details</CCardHeader>
					<CCardBody>
						{seller_details && (
							<CRow>
								<CCol xs="12" sm="6" md="6">
									<div>
										{
											<div>
												{
													<img
														src={
															'https://staging.sendmeerrand.ng/uploads/products/nulogo.png'
														}
														width="200"
														height="200"
													/>
												}
											</div>
										}
										<h2 style={{ paddingTop: '10px' }}>
											{seller_details.seller_details.seller_info.firstName}{' '}
											{seller_details.seller_details.seller_info.lastName}{' '}
										</h2>
										{/* <h2 style={{ paddingTop:'10px' }}>{userDetails.data.user_details.firstname}  {userDetails.data.user_details.lastname}</h2> */}
										<p>
											Created on{' '}
											{moment(seller_details.seller_details.seller_info.created_at).format(
												'MMMM Do YYYY, h:mm A'
											)}{' '}
										</p>
										<p>
											Last login{' '}
											{moment(seller_details.seller_details.seller_info.last_login).format(
												'MMMM Do YYYY, h:mm A'
											)}{' '}
										</p>
									</div>
								</CCol>
								<CCol xs="12" sm="6" md="6">
									<b>
										<p>Basic Details</p>
									</b>

									<div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												textAlign: 'center',
												alignItems: 'center'
											}}
										>
											<i class="far fa-envelope" />
											{seller_details.seller_details.seller_info !== null ? (
												<p style={{ paddingTop: '10px', paddingLeft: '10px' }}>
													{seller_details.seller_details.seller_info.email}
												</p>
											) : (
												<p style={{ paddingTop: '10px', paddingLeft: '10px' }}>No Email</p>
											)}
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												textAlign: 'center',
												alignItems: 'center'
											}}
										>
											<i class="fas fa-phone-alt" />
											{seller_details.seller_details.seller_info !== null ? (
												<p style={{ paddingTop: '10px', paddingLeft: '10px' }}>
													{seller_details.seller_details.seller_info.phone}
												</p>
											) : (
												<p style={{ paddingTop: '10px', paddingLeft: '10px' }}>No phone</p>
											)}
										</div>
										<p>Availability</p>
										<CSwitch
											className={'mx-1'}
											variant={'3d'}
											defaultChecked
											labelOff={'\u2715'}
											size={'lg'}
											checked={active}
											color={'primary'}
											labelOn={'On'}
											type={'checkbox'}
											onChange={() => {
												setshowDialog(true);
												setActive(!active);
											}}
										/>
									</div>
								</CCol>
							</CRow>
						)}
						<CTabs>
							<CNav variant="tabs">
								<CNavItem>
									<CNavLink>Products</CNavLink>
								</CNavItem>
								<CNavItem>
									<CNavLink>Orders</CNavLink>
								</CNavItem>
							</CNav>

							<CTabContent>
								<CTabPane>
									<SellerProductDetails />
								</CTabPane>
								<CTabPane>
									<SellerOrderDetails />
								</CTabPane>
							</CTabContent>
						</CTabs>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Tabs;
