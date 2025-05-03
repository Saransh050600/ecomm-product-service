# ecomm-product-service
The ecomm-product-service is a backend microservice built using Node.js + Express that manages all product-related operations in the eCommerce application. It provides RESTful APIs for retrieving, creating, updating, and deleting product information, and supports features like category filtering, pagination, and admin-level access control.

It integrates with:
  - MongoDB for data persistence
  - RabbitMQ for inter-service messaging
  - Auth Service for JWT-based authentication and role-based authorization

The service is designed to be scalable, containerized (via Docker), and easily deployed within a Kubernetes environment (e.g., Minikube).

## Requirements:

Node v20.19.0
Recommended:

- Node Version Manager. For Mac users brew install nvm
- Visual Studio Code.
- Prerequisite to running locally
- Rabbitmq


### Prerequisite to running locally

These variables should be set in your environment or stored in a `.env` file:

```env
PORT=5001>
MONGO_URI=mongodb+srv//your-mangodb-URI
JWT_SECRET=your_strong_access_secret_key_here
RABBITMQ_URL=amqp://localhost
FRONTEND_URL=http://localhost:3000
```

## 🏃‍♂️ How to Run Locally

1. **Install dependencies**:

   Run the following command to install all the necessary dependencies:

   ```bash
   npm install
   npm start
   ```
## 🚀 Make the Service Available to the ecomm App

To make this service available to the **ecomm app** and deploy it to the local **Minikube registry**, follow the steps below:

1. **Build the Docker image**:

   The necessary script for building and pushing the Docker image to your local Minikube registry has been added in the project.

   Run the following command to build the image:

   ```bash
   npm run build:docker
   ```
