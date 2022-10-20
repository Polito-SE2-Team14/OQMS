import { useState, useEffect } from "react";
import { Container, Row, ListGroup, Badge, Col, Button } from "react-bootstrap";

import API from "../API";

function QueuePage() {

	useEffect(() => {
		getQueueData();
		setInterval(getQueueData, 10000); // Update data every 10s
	}, []);


	const getQueueData = async () => {
			// API call
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
	
			let test_queue_list = [
				{
					name: "Account Management",
					wait: 13,
				},
				{
					name: "Report",
					wait: 35,
				},
				{
					name: "Out of ideas",
					wait: 2,
				},
				{
					name: "Test",
					wait: 24,
				},
			];
	
			console.log("Data update");
			let res = await API.getQueue();
			let new_arr = res.map((item) => {return {name: item.NAME, wait: item.DURATION};});
	
			setQueueList(() => new_arr);
			setTicketCalls(() => test_ticket_calls);
	};

	let [ticket_calls, setTicketCalls] = useState([]);
	let [queue_list, setQueueList] = useState([]);

	return (
		<Container className="mt-3">
			<Row>
				<Col md="3">
					<Row>
						<TicketCalls ticket_calls={ticket_calls} />
					</Row>
				</Col>
				<Col md={{ span: 5, offset: 2 }}>
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
	return (
		<Container>
			<Row>
				<Col>
					<h4>Service</h4>
				</Col>
				<Col className="d-flex justify-content-end">
					<h4>Estimated wait</h4>
				</Col>
			</Row>
		<Row>
		<ListGroup className="p-0">
			{props.queue_list
				.sort((a, b) => b.length - a.length)
				.map((queue, i) => {
					return (
						<ListGroup.Item key={i} className="d-flex justify-content-between">
							<Container fluid>
								<Row>
									<Col className="d-flex align-items-center">{queue.name}</Col>
									<Col md="3" className="text-end">
										<QueueBadge type="primary" text={queue.wait} /> Minutes
									</Col>
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
