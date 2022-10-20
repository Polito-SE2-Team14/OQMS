import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import Container from "react-bootstrap/Container";

import {
	PostageFill,
	PersonBadge,
	PersonBadgeFill,
} from "react-bootstrap-icons";

import API from './API';
import Navbar from "react-bootstrap/Navbar";
import CustomerPage from "./pages/CustomerPage";
import QueuePage from "./pages/QueuePage";
import LoginPage from "./pages/LoginPage";
import ManagerPage from "./pages/ManagerPage";
import OfficerPage from "./pages/OfficerPage";

function App() {
	// States regarding loggedIn status
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(); // { name: String, desk: number }
	const [userType, setUserType] = useState(""); // Can be "Officer" or "Manager"
	const [services, setServices] = useState([]);

	useEffect(() => {
		const getServiceInfo = async () => {
			await API.getServiceInfo()
				.then((s) => {
					//console.log("try",s)
					setServices(() => s)
				})
				.catch();
		}
		getServiceInfo()
	}, []);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<OfficeNavbar showLogin={true} loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} setUserType={setUserType}/>
							<MainApp loggedIn={loggedIn} user={user} userType={userType} services={services} askForTicket={API.askForTicket}/>
						</>
					}
				/>
				<Route
					path="/login"
					element={
						<>
							<OfficeNavbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} setUserType={setUserType}/>
							<LoginPage setLoggedIn={setLoggedIn} setUser={setUser} setUserType={setUserType} />
						</>
					}
				/>
				<Route
					path="/queue"
					element={
						<>
							<OfficeNavbar showLogin={false} />
							<QueuePage />
						</>
					}
				/>
			</Routes>
		</Router>
	);
}

function MainApp(props) {
	// When logged in shows either the OfficerPage or the ManagerPage
	let page;

	if (props.loggedIn) {
		if (props.userType === "Manager") {
			page = <ManagerPage />;
		} else if (props.userType === "Officer") {
			page = <OfficerPage user={props.user} services={props.services}/>;
		} else {
			// Show 404 page?
		}
	} else {
		page = <CustomerPage services={props.services} askForTicket={props.askForTicket}/>;
	}

	return page;
}

function OfficeNavbar(props) {
	let navigate = useNavigate();

	const doLogout = () => {
		props.setLoggedIn(false);
		props.setUserType("");
		props.setUser();
	};

	return (
		<Navbar bg="warning">
			<Container fluid>
				<Navbar.Brand>
					<PostageFill size={48} /> Office Portal
				</Navbar.Brand>
				{props.showLogin ? (
					<Navbar.Brand className="justify-content-end">
						{props.loggedIn ? (
							<>
								User: {props.user.name} | Desk: {props.user.desk}{" "}
								<PersonBadgeFill size={30} onClick={doLogout} />
							</>
						) : (
							<>
								Login{" "}
								<PersonBadge
									size={30}
									onClick={() => {
										navigate("/login");
									}}
								/>
							</>
						)}
					</Navbar.Brand>
				) : null}
			</Container>
		</Navbar>
	);
}

export default App;
