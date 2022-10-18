import { useState } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";

// Move in separate file
function CustomerPage() {
	
	//call apis to get service
	
	const [service, setService] = useState(null);
	const [active, setActive] = useState(false)
	let services = [{ id: 1, name: "mailingService" }, { id: 2, name: "shipment" }];

	const showTicket = () => {
		console.log(service)
		setActive(true)
		setTimeout( () => setActive(false), 5000)
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
					label={s.name}
					id={s.id}
				/>
			})}
		
		</Form>
		<Row>
			<Button onClick={() => showTicket()}>
				Ask for a ticket
			</Button>
		</Row>

		{(active) && <Row>
			<h1>{service.name + " " + service.id}</h1>
		</Row>}
		

	</Container>
}

export default CustomerPage;