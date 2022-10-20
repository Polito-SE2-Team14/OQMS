import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
	Container,
	Row,
	Col,
	Button,
	ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import API from "../API";

function OfficerPage(props) {
	// Get all service types
	let [services, setServices] = useState([]);
	let [nextTicket, setNextTicket] = useState("");

	const handleNextClient = () => {
		const getNextTicket = async () => {
			await API.callNextCustomer({counterId: props.user.desk})
				.then((res) => {
					setNextTicket(res);
				})
				.catch();
		}
		getNextTicket();
		// In services there are the service types on which to call the API
		// callNextCustomer (API)
	}

	useEffect(() => {
	}, []);

	return (
		<Container>
			<Row>
				<Col>
					<ListGroup variant="flush">
						{props.services.map((service, i) => {
							
							let button;
							if (services.includes(service)) {
								button = <Button variant="danger" onClick={() => {
									setServices((old) => {
										return old.filter((item) => (item.ID !== service.ID));
									});
								}}>-</Button>;
							} else {
								button = (
									<Button
										variant="success"
										onClick={() => {
											setServices((old) => {
												return [...old, service];
											});
										}}
									>
										+
									</Button>
								);
							}

							return (
								<ListGroup.Item
									key={i}
									className="d-flex justify-content-between align-items-center"
								>
									{service.NAME}
									{button}
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Col>
				<Col className="mt-2">
					<Button
						variant="primary"
						onClick={handleNextClient}
					>
						Call next client
					</Button>
					{nextTicket ? <Row className="mt-2">
						<Alert key="success">Serving ticket {nextTicket} </Alert>
					</Row> : null }
				</Col>
			</Row>
		</Container>
	);
}

export default OfficerPage;
