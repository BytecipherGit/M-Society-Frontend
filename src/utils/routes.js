import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginView } from '../components';
import { ForgotPasswordView } from '../components/forgot-password';
import { PrivateRoutes } from './protected-routes';



export const Router = () => {
	return (
		<React.Fragment>
			<BrowserRouter>
				{/* < ScrollToTop /> */}
				<Routes>

					{/* <Route path='*' element={<GenericNotFound />} />
					

					<Route element={<DashboardPrivateRoutes />} >
						
					</Route>

					<Route element={<AuthPrivateRoutes />} >
						
					</Route> */}
					<Route exact={true} path="/" element={<LoginView />} />
					<Route element={<PrivateRoutes />}>
						{/* <Route exact={true} path="/" element={<LoginView />} /> */}
						<Route exact={true} path="/society-admin" element={<LoginView />} />
						<Route exact={true} path="/resident-login" element={<LoginView />} />
						<Route exact={true} path="/forgot-password" element={<ForgotPasswordView />} />
						<Route exact={true} path="/admin-forgot-password" element={<ForgotPasswordView />} />

					</Route>

				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);
};
