import { useState } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";

// Move in separate file
function CustomerPage(props) {
	
	//call apis to get service
	
	const [service, setService] = useState(null);
	const [active, setActive] = useState(false);
	const [ticket, setTicket] = useState(null);

	

	let services = props.services;

	// console.log("services",services)

	const showTicket = async() => {
		// console.log(service.ID);
		setActive(true);
		// setTimeout( () => setActive(false), 5000)
		let nextTicket= await props.askForTicket(service.ID);
		setTicket(nextTicket);
	}

	
	return <Container>
		<Row>
			<h1>Decide the service</h1>
		</Row>
		<Form>
			{services.map(s => {
				return <Form.Check onClick={() => setService(s)}
					type={'radio'}
					name={"group1"}
					label={s.NAME}
					id={s.ID}
					key={s.ID}
				/>
			})}
		
		</Form>
		<Row>
			<Button onClick={() => showTicket()}>
				Ask for a ticket
			</Button>
		</Row>

		{(active) && <Row>
			<h1>{service.NAME + " " + service.ID}</h1>
		</Row>}

		{ticket!=null?
			<>
				<Row >
					<h1>Your ticket number is {ticket.ticketID}. The estimated waiting time is {Math.round(ticket.ETA)} minutes</h1>
				</Row>
			</>
		:
			false}
		

	</Container>
}

export default CustomerPage;