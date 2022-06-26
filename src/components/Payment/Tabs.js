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
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../store/users-actions';
import OrderDetails from './OrderDetails';
import userService from 'src/services/user.service';
import Modals from './Modals';
import { toast } from 'react-toastify';

const Tabs = (props) => {
	const dispatch = useDispatch();
	const user_detail = useSelector((state) => state.users.user_detail);

	const [ active, setActive ] = useState(-1);
	const [ showDialog, setshowDialog ] = useState(false);

	useEffect(
		() => {
			dispatch(fetchUserDetails(props.match.params.id));
			user_detail && setActive(user_detail.user_detail.user_info.active);
		},
		[ dispatch ]
	);

	const handleModalSuccess = () => {
		const { id, active } = user_detail.user_detail.user_info;

		userService
			.updateUserInfo({ user: id, status: !active })
			.then((response) => {
				toast.success(`User status set to ${!active}`);
				setActive(!active);
				setshowDialog(false);
			})
			.catch((error) => {
				console.log('ERR: ', error);
			});
	};
	return (
		<CRow>
			<CCol xs="12" md="12" className="mb-4">
				<Modals
					show={showDialog}
					title={'Change User Status'}
					message={`Are you sure you want to ${user_detail && user_detail.user_detail.user_info.active
						? 'Deactivate'
						: 'Activate'} User`}
					handleSuccess={handleModalSuccess}
					handleCancel={() => setshowDialog(false)}
				/>
				<CCard>
					<CCardHeader>User details</CCardHeader>
					<CCardBody>
						{user_detail && (
							<CRow>
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
											{user_detail.user_detail.user_info !== null ? (
												<p style={{ paddingTop: '10px', paddingLeft: '10px' }}>
													{user_detail.user_detail.user_info.email}
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
											{user_detail.user_detail.user_info !== null ? (
												<p style={{ paddingTop: '10px', paddingLeft: '10px' }}>
													{user_detail.user_detail.user_info.phone}
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
											onChange={() => setshowDialog(true)}
										/>
									</div>
								</CCol>
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
											{user_detail.user_detail.user_info.firstname}{' '}
											{user_detail.user_detail.user_info.lastname}{' '}
										</h2>
										{/* <h2 style={{ paddingTop:'10px' }}>{userDetails.data.user_details.firstname}  {userDetails.data.user_details.lastname}</h2> */}
										<p>
											Joined on{' '}
											{moment(user_detail.user_detail.user_info.created_at).format(
												'MMMM Do YYYY, h:mm A'
											)}{' '}
										</p>
										<p>
											Last login{' '}
											{moment(user_detail.user_detail.user_info.last_login).format(
												'MMMM Do YYYY, h:mm A'
											)}{' '}
										</p>
									</div>
								</CCol>
							</CRow>
						)}
						<CTabs>
							<CNav variant="tabs">
								<CNavItem>
									<CNavLink>Orders</CNavLink>
								</CNavItem>
							</CNav>

							<CTabContent>
								<CTabPane>
									<OrderDetails order={user_detail} />
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
