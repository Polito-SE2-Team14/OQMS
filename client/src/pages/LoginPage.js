import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// Move in separate file
function LoginPage(props) {
	// TEST
	const navigate = useNavigate();

	return (
		<>
			<Button
				variant="primary"
				onClick={() => {
					props.setLoggedIn(true);
					props.setUserType("Manager");
					navigate("/");
				}}
			>
				Manager
			</Button>{" "}
			<Button
				variant="warning"
				onClick={() => {
					props.setLoggedIn(true);
					props.setUserType("Officer");
					navigate("/");
				}}
			>
				Officer
			</Button>
		</>
	);
}

export default LoginPage;