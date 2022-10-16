import { useState } from "react";
import { Container, Row, ListGroup, Badge, Col, Button } from "react-bootstrap";

function QueuePage() {
	// TODO: Get data from server
	let test_queue_list = [
		{
			type: "Account Management",
			length: 13,
		},
		{
			type: "Report",
			length: 35,
		},
		{
			type: "Out of ideas",
			length: 2,
		},
		{
			type: "Test",
			length: 24,
		},
	];

	let test_ticket_calls = [
		{
			number: "#A99",
			type: "Account Management",
			desk: "3",
		},
		{
			number: "#R35",
			type: "Report",
			desk: "7",
		},
		{
			number: "#O29",
			type: "Out of ideas",
			desk: "8",
		},
		{
			number: "#T22",
			type: "Test",
			desk: "2",
		},
		{
			number: "#R36",
			type: "Report",
			desk: "5",
		},
	];

	let [ticket_calls, setTicketCalls] = useState(test_ticket_calls);
	let [queue_list, setQueueList] = useState(test_queue_list);

	return (
		<Container className="mt-3">
			<Row>
				<Col md="3">
					<Row>
						<TicketCalls ticket_calls={ticket_calls} />
					</Row>
				</Col>
				<Col md={{ span: 6, offset: 2 }}>
					<Row>
						<QueueTab queue_list={queue_list} ticket_calls={ticket_calls} />
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

function TicketCalls(props) {
	return (
		<Container fluid className="queue-header">
			<Row>
				<Col>
					<h4>Ticket</h4>
				</Col>
				<Col className="d-flex justify-content-end">
					<h4>Desk</h4>
				</Col>
			</Row>
			<Row>
				<ListGroup variant="flush" className="p-0">
					{props.ticket_calls.map((ticket, i) => {
						return (
							<ListGroup.Item key={i} className="d-flex justify-content-between">
								<Container fluid>
									<Row>
										<Col><TicketBadge text={ticket.number}/></Col>
										<Col className="text-end"><DeskBadge text={ticket.desk}/></Col>
									</Row>
								</Container>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Row>
		</Container>
	);
}

function QueueTab(props) {
	// TODO:	Handle creation when new ticket arrives? Probably not needed
	// 			Update corresponding queue when ticket arrives (serving ticket, desk)
	//			Update queue whenever ticket is served (get new queue size)

	return (
		<ListGroup className="p-0">
			{props.queue_list
				.sort((a, b) => b.length - a.length)
				.map((queue, i) => {
					return (
						<ListGroup.Item key={i} className="d-flex justify-content-between">
							<Container fluid>
								<Row>
									<Col className="d-flex align-items-center">{queue.type}</Col>
									<Col>
										Serving ticket{" "}
										<TicketBadge text={queue.serving_ticket} />{" "}
										<br />
										Desk <DeskBadge text={queue.desk} />
									</Col>
									<Col md="2" className="text-end">
										<QueueBadge type="primary" text={queue.length} /> <br />
										Waiting
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
		<Badge bg="primary" pill>
			{props.text}
		</Badge>
	);
}

function TicketBadge(props) {
	return (
		<Badge bg="success" pill>
			{props.text}
		</Badge>
	);
}

function DeskBadge(props) {
	return (
		<Badge bg="danger" pill>
			{props.text}
		</Badge>
	);
}

export default QueuePage;
