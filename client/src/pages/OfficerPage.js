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
	// Get all service types

	let all_services = ["Report", "Account Management", "Out of ideas", "Test"]; // TODO: get from server
	let [services, setServices] = useState([]);

	let firstTime, nextClient;

	return (
		<Container>
			<Row>
				<Col>
					<ListGroup variant="flush">
						{all_services.map((service, i) => {
							let button;
							console.log(
								service + " - " + services + " | " + services.includes(service)
							);
							if (services.includes(service)) {
								button = <Button variant="danger" onClick={() => {
									setServices((old) => {
										return old.filter((item) => (item !== service));
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
						onClick={() => {
							/* nextClient = props.getNextClient(props.officer); */
							firstTime = false;
						}}
					>
						Call next client
					</Button>
					<Row className="mt-2">
						<Alert key="success">Serving ticket X for service Y</Alert>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

function ServiceButton() {}

export default OfficerPage;
