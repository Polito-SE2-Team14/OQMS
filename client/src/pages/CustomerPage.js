import { useState } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

// Move in separate file
function CustomerPage(props) {
	//call apis to get service

	const [service, setService] = useState(null);
	const [active, setActive] = useState(false);

	let services = props.services;

	console.log("services", services);

	const showTicket = () => {
		console.log(service);
		setActive(true);
		setTimeout(() => setActive(false), 5000);
	};

	return (
		<Container>
			<Row>
				<h1>Select service</h1>
			</Row>
			<Form>
				{services.map((s) => {
					return (
						<Form.Check
							onClick={() => setService(s)}
							type={"radio"}
							name={"group1"}
							label={s.NAME}
							id={s.ID}
							key={s.ID}
						/>
					);
				})}
			</Form>
			<Row>
				<Button onClick={() => showTicket()}>Ask for a ticket</Button>
			</Row>

			{active && (
				<Row>
					<h1>{service.NAME + " " + service.ID}</h1>
				</Row>
			)}
		</Container>
	);
}

export default CustomerPage;
