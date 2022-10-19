import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

import API from "../API"

// Move in separate file
function LoginPage(props) {
	const [username, setUsername] = useState("admin@test.com");
	const [password, setPassword] = useState("password");

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		const credentials = { username, password };
		doLogin(credentials);
	};

	const handleCancel = () => {
		navigate("/");
	};

	const doLogin = (credentials) => {
		API.LogIn(credentials)
			.then((user) => {
				props.setLoggedIn(true);
				props.setUserType("Officer");
				props.setUser(user);
				navigate("/");
			})
			.catch((err) => {
				// TODO: messaggio di errore
			});
	};


	return (
		<Container>
			<Row className="d-flex justify-content-center mt-3">
				<Col md="4">
				<Form>
		  <Form.Group className="mb-3" controlId="formBasicEmail">
			<Form.Label>Email address</Form.Label>
			<Form.Control type="email" placeholder="Enter email" value={username} onChange={(ev) => setUsername(ev.target.value)}/>
		  </Form.Group>
	
		  <Form.Group className="mb-3" controlId="formBasicPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control type="password" placeholder="Password" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
		  </Form.Group>
		  <Button variant="primary" type="submit" onClick={handleSubmit}>
			Submit
		  </Button>
		  <Button variant="secondary" onClick={handleCancel}>
			Back
		  </Button>
		</Form>
				</Col>
			</Row>
		</Container>
	  );
}

export default LoginPage;