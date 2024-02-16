# Twitter-like Microservices Project

This project consists of several microservices designed to create a Twitter-like application. Each microservice handles specific functionalities, and communication between them is facilitated using RabbitMQ as the event bus.

## Microservices Overview

1. **User Service: Java Spring boot**
   - Handles user registration, authentication, and profile management.

2. **Tweet Service: NODEJS**
   - Manages the creation, retrieval, and deletion of tweets.

3. **Timeline Service: GO Lang**
   - Aggregates and serves personalized timelines for users.

4. **Follow Service: Python (Flask)**
   - Manages relationships between users, including following and followers.

5. **Gateway Service: Go Lang**
   - Acts as an API gateway, routing requests to appropriate microservices and handling authentication.

6. **Fanout Service: NodeJS**
   - Manages subscriptions and broadcasts events to subscribers.

## Technologies Used

- **Programming Languages:** [Java, Python, Node.js, Go]
- **Databases:** [MariaDB]
- **Event Bus:** RabbitMQ

## Installation

NOT YET ADDED

## Usage

NOT YET ADDED

## Communication Between Microservices

- **Event Bus:** RabbitMQ
- Each microservice communicates with others through RabbitMQ by publishing and subscribing to relevant events.
- Topics and message formats are standardized across microservices to ensure interoperability.

## API Endpoints

NOT YET ADDED (each Microservices will have documentation)

## Testing

NOT YET ADDED

## Contributing

this is a school project and there Collaborators (Team members)

## License

this software is set to be open-source

## Contact

NOT YET ADDED
