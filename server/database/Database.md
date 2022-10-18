# Database tables

## User
 - Used for authentication
 - Defined at the start

| ID | USERNAME | PASSWORD | SALT | ROLEID |
|----|----------|----------|------|--------|
| INTEGER | STRING | STRING | STRING | INTEGER |
| unique identifier for the user | user's email | user's encrypted password | salt used for password encryption | id of the user's role |

## Role
 - Used for storing roles
 - Defined at the start

| ID | ROLE |
|----|------|
| INTEGER | STRING |
| unique identifier for the role | one word name of the role |

## Service
 - Used for storing service types
 - Defined at the start

| ID | NAME | DURATION |
|----|------|----------|
| INTEGER | STRING | INTEGER |
| unique identifier for the service | name of the service | duration in seconds |

## Ticket
 - Used for queue management and statistics
 - Updated every time a new ticket is created or a client is served

| ID | SERVICEID | TIMESTAMP | DATE | SERVED |
|----|-----------|-----------|------|--------|
| INTEGER | INTEGER | STRING | STRING | INTEGER |
| unique identifier for the ticket | identifier of requested service | time of ticket creation (HH:MM:SS) | date of ticket creation (DD-MM-YYY) | 0 if the client is yet to be served, 1 otherwise|

## Counter
 - Used for counter definition (what services are available at each counter)
 - Defined at the start

| ID | COUNTERID | SERVICEID |
|----|-----------|-----------|
| INTEGER | INTEGER | INTEGER |
| unique identifier for the tuple | identifier for the counter | identifier for one of the services available at the counter |