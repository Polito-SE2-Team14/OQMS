import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
	Container,
	Row,
	Col,
	Button,
	Collapse,
	Tooltip,
	OverlayTrigger,
	ListGroup,
} from "react-bootstrap";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";

function OfficerPage() {
	// Get all service types (API)
	let all_services = ["Report", "Account Management", "Out of ideas", "Test"];
	let [services, setServices] = useState([]);
	let [nextTicket, setNextTicket] = useState("");

	const handleNextClient = () => {
		// In services there are the service types on which to call the API
		// callNextCustomer (API)
		setNextTicket({number: "32", serviceType: "Report"});
	}

	return (
		<Container>
			<Row>
				<Col>
					<ListGroup variant="flush">
						{all_services.map((service, i) => {
							let button;
							if (services.includes(service)) {
								button = (
									<Button
										variant="danger"
										onClick={() => {
											setServices((old) => {
												return old.filter((item) => item !== service);
											});
										}}
									>
										-
									</Button>
								);
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
									{service}
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
						<Alert key="success">Serving ticket {nextTicket.number} for service: {nextTicket.serviceType}</Alert>
					</Row> : null }
					
				</Col>
			</Row>
		</Container>
	);
}

export default OfficerPage;
