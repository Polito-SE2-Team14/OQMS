# List of API



## POST /api/ticket

- **Description**: A customer asks for a ticket, giving the service requested as parameter. He then receives his ticket number and the expected waiting time.
- **Request body**: 
    ```
    {"service" : "shipment"}
    ```
- **Response**:
    '201 Created'
    ```
    {
        "ticketID" : 123,
        "ETA": "15m"
    }
    ```
- **Error responses**:  500 Internal Server Error



## GET /api/stats

- **Description**: A manager asks for statistics.
- **Request body**: none
- **Response**:
    '200 OK'
    ```
    [
        { 
        date: "01/01/2000",
        values: 
            [
                {
                service: "service1",
                served: 3
                },
                {
                service: "service2",
                served: 5
                }
            ]
        },
        ...
    ]
    ```
- **Error responses**:  500 Internal Server Error

## PUT /api/next
- **Description**: The officier finished to serve a client and calls the next
- **Request body**: none
- **Response**:
    '200 OK'
    ```
    {
        "ticketID" : 123,
        "service" : "shipment" 
    }
    ```
- **Error responses**:  500 Internal Server Error

## GET /api/queue
- **Description**: A monitor asks for clients that are being served now
- **Request body**: none
- **Response**:
    '200 OK'
    ```
    [
        {
        "ticketID" : 123,
        "service" : "shipment" 
        },
        {
        "ticketID" : 233,
        "service" : "mailing service" 
        }
    ]
    ```
- **Error responses**:  500 Internal Server Error
