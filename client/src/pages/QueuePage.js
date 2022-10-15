import { Container, Row, ListGroup, Badge, Col } from "react-bootstrap";

import "./QueuePage.css";

function QueuePage() {
	return (
		<Container>
			<Row className="justify-content-center">
				<QueueHeader />
			</Row>
			<Row className="justify-content-center">
				<QueueTab />
			</Row>
		</Container>
	);
}

function QueueHeader() {
	return (
		<Container fluid className="queue-header">
			<Row>
				<Col>
					<h3>Service</h3>
				</Col>
				<Col className="d-flex justify-content-end">
					<h3>Queue</h3>
				</Col>
			</Row>
		</Container>
	);
}

function QueueTab() {
	// TODO: Get number of services offered by the office
	let service_types = ["Account management", "Report", "Out of ideas", "Test"];

	return (
		<ListGroup className="queue-container">
			{service_types.map((service, i) => {
				return (
					<ListGroup.Item key={i} className="d-flex justify-content-between">
						<Container fluid>
							<Row>
								<Col className="d-flex align-items-center">{service}</Col>
								<Col>
									Serving ticket <QueueBadge type="success" text="#99"/> <br/>
									Desk <QueueBadge type="danger" text="7"/>
								</Col>
								<Col
									md="1"
									className="d-flex justify-content-center align-items-center"
								>
									<QueueBadge type="primary" text={14}/>
								</Col>
							</Row>
						</Container>
					</ListGroup.Item>
				);
			})}
		</ListGroup>
	);
}

function QueueBadge(props) {
	return (
		<Badge bg={props.type} pill>
			{props.text}
		</Badge>
	);
}

export default QueuePage;
