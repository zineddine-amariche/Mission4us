import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import jwtDecode from 'jwt-decode';
import {Navigate, Outlet, useNavigate} from "react-router-dom"
import { logout } from "../../Redux/logout/slice"

const useAuth = () => {
	//get item from localstorage

	let user

	const _user = localStorage.getItem("user")


	if (_user) {
		user = JSON.parse(_user)
	//  console.log("user", user)
	}
	if (user) {
		return {
			auth: true,
			role: user.role,
		}
	} else {
		return {
			auth: false,
			role: null,
		}
	}
}

//protected Route state
// type ProtectedRouteType = {
// 	roleRequired?: "ADMIN" | "USER"
// }

const ProtectedRoutes = (props) => {
	// const token = localStorage.getItem("bearer-token");

	// const {isAuthenticated,token} = useSelector((state) => state.logout);
	const {isAuthenticated,token}= useSelector((state) => state.logout);


	// const expire_token = localStorage.getItem("expires_in");
	const dispatch = useDispatch();
	const navigate=useNavigate();
	
	const isTokenExpired = (token) => {
		const decodedToken = jwtDecode(token);
		const currentTime = Date.now() / 1000; // convertit le temps en secondes
	//   console.log(currentTime,'currenttime')
	//   console.log(currentTime,'decodedToken')
	//   console.log(decodedToken.exp,'exptoken')
		return decodedToken.exp < currentTime;
	  };

	  useEffect(() => {
		if (token && isTokenExpired(token)) {
		  // si le token est expiré, déconnectez l'utilisateur
		  window.location.reload()
		  dispatch(logout());
		  navigate('/login')
		}
	  }, [dispatch, token]);

	const {auth, role} = useAuth()

	// console.log('isAuthenticated--', isAuthenticated)
	// console.log('props.roleRequired', props.roleRequired)

	//if the role required is there or not
	if (props.roleRequired) {
		return isAuthenticated ? (
			props.roleRequired === role ? (
				<Outlet />
			) : (
				<Navigate to="/denied" />
			)
		) : (
			<Navigate to="/register" />
		)
	} else {
	return 	auth ? <Outlet /> : <Navigate to="register" />
	}

}

export { ProtectedRoutes };
