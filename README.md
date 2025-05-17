 # Event Booking Platform

A full-stack web application for browsing, booking, and managing event registrations. Built with **React** (frontend), **Spring Boot** (backend), and **PostgreSQL** (database via Docker).

---

## 📁 Project Structure

```
event-booking/
├── backend/         # Spring Boot application
├── frontend/        # React app (Vite)
```

---

## ⚙️ Prerequisites

* [Node.js](https://nodejs.org/) v16+
* [Java JDK 17+](https://adoptopenjdk.net/)
* [Docker](https://www.docker.com/)
* [PostgreSQL](https://www.postgresql.org/) (via Docker container)

---

## 🚀 Running the Frontend (React)

```bash
pull main branch
cd frontend
npm install
npm run dev
```

* App runs at: [http://localhost:5173](http://localhost:5173)
* Make sure the backend is running.

---

## 🔧 Running the Backend (Spring Boot)

### Step 1: Set up PostgreSQL with Docker

```bash
docker run --name event-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=eventdb -p 5432:5432 -d postgres
```

---

### Step 2: Configure `application.properties`

In `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/eventdb
spring.datasource.username=admin
spring.datasource.password=admin
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

spring.jackson.serialization.WRITE_DATES_AS_TIMESTAMPS=false
spring.main.allow-bean-definition-overriding=true

# JWT Token
JWT_SECRET=u8W3hjT+3Jd6WqPmHvy2zLj0sFx81TRuI3+FTt5XlCg=
JWT_EXPIRATION=3600000

```

---

### Step 3: Run the Backend

In your IDE (Preferrably IntelliJ), or via terminal:

```bash
cd backend
./mvnw spring-boot:run
```

App runs at: [http://localhost:8080](http://localhost:8080)

### Step 4: Connect to the Database in IntelliJ

Go to Database tool window (usually on the right).

Click the + icon → Data Source → PostgreSQL.

Enter the following:

Host: localhost

Port: 5432

Database: eventdb

User: admin

Password: admin

Click Test Connection, then OK.

### Step 5: Manually Add Admin Account

Since there's no registration for admin, insert an admin user manually from the databsse inspector tool in Intellij by accessing the table users and inserting a new with credentials such as:
* email: admin@events.com
* first_name: admin
* last_name: admin
* password: $2a$10$u/vf6Bqs1cfrkiWa8i4fwOgGeb/GsMEXUmUHym59Ky8jPHC7q9mUG

* Note 1: unencrypted passowrd = "123456"
* Note 2: you can replace hashed_password with a real hashed password (e.g. use bcrypt tools or backend password encoder).
---

## 🛠️ Environment Variables (via `.env`)

To configure API URLs in the frontend:

**frontend/.env**

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 📬 API Endpoints (Sample)

| Endpoint             | Method | Description                   |
| -------------------- | ------ | ----------------------------- |
| `/api/auth/register` | POST   | Register a new user           |
| `/api/auth/login`    | POST   | Login & return JWT            |
| `/api/events`        | GET    | Fetch all events              |
| `/api/bookings`      | POST   | Book an event                 |
| `/api/bookings/user` | GET    | Get bookings for current user |

---

## ✅ Features

* JWT-based authentication
* Browse & filter events
* Book events (1 click = 1 ticket)
* PostgreSQL database (via Docker)
* Responsive frontend with Material UI
* Dark-mode

---

## 🐳 Docker Commands Reference

```bash
# Start PostgreSQL
docker start event-db

# Stop PostgreSQL
docker stop event-db

# View logs
docker logs -f event-db
```

---
