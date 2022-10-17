import { Container, Row, Button } from "react-bootstrap";

// Move in separate file
function CustomerPage() {
	return <Container>
		<Row>
			<h1>Decide the service</h1>
		</Row>
		<Row>
			<Button>
				Ask for a ticket
			</Button>
		</Row>
	</Container>
}

export default CustomerPage;