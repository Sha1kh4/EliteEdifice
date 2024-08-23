# EliteEdifice - "Excellence in Hotel Management"

EliteEdifice is a symbol of excellence in the management of premium accommodations and guest services. 

A full-stack application for managing hotel rooms, guests, and bookings.

Hosted on Vercel: [https://elite-edifice.vercel.app](https://elite-edifice.vercel.app)

## Features

- Room management (view, add, update)
- Guest management (view, add)
- Booking management (create, cancel)
- Dark mode support
- Search for available rooms

## Tech Stack

- Frontend: Next.js, Apollo Client, Tailwind CSS
- Backend: Node.js, Express, Apollo Server
- Database: MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Docker and Docker Compose (for local development with containers)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Sha1kh4/EliteEdifice.git
   cd EliteEdifice
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd eliteedifice
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - In the `backend` folder, create a `.env` file:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=4000
     ```
   - In the `eliteedifice` folder, create a `.env.local` file:
     ```
     NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
     ```

### Running the Application

#### Method 1: Without Docker

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd eliteedifice
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

#### Method 2: Using Docker Compose

1. Make sure Docker and Docker Compose are installed on your system.

2. Create a .env file with the following content:  
   ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=4000
     NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
   ```


2. Run the application using Docker Compose:
   ```
   docker-compose up --build
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Contributing

If you believe there is a problem, please submit a PR; there is no need to open a issue or assign issue.
