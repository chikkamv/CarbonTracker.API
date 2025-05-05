
# Carbon Tracker Application

This is a full-stack application for tracking and analyzing carbon emissions. It consists of:

- **Backend**: ASP.NET Core Web API (`CarbonTracker.API`)
- **Frontend**: React application (`carbon-tracker-ui`)
- **Tests**: Backend test project (`CorbonTracker.Test`)
- **Containerization**: Docker and Docker Compose for running the app

---

## Project Structure

```
/
├── CarbonTracker.API/           # .NET Core backend
│   └── Dockerfile               # Dockerfile for backend
├── carbon-tracker-ui/          # React frontend
│   └── Dockerfile              # Dockerfile for frontend
├── CorbonTracker.Test/         # .NET test project
├── CarbonTracker.API.sln       # Solution file
├── docker-compose.yml          # Docker Compose setup
└── README.md                   # Project documentation
```

---

## Prerequisites

Make sure you have the following installed:

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js (16+)](https://nodejs.org/)
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/carbon-tracker.git
cd carbon-tracker
```

### 2. Build & Run with Docker Compose

```bash
docker-compose build --no-cache
docker-compose up
```

### 3. Access the App

- Frontend: [http://localhost](http://localhost)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## Docker Services

| Service   | URL             | Description            |
|-----------|------------------|------------------------|
| backend   | `localhost:5000` | ASP.NET Core API       |
| frontend  | `localhost`      | React via Nginx        |

---

## Useful Commands

Rebuild everything from scratch:

```bash
docker-compose build --no-cache
```
## Tests

Backend unit tests can be found in:

/CorbonTracker.Test

To run tests locally:

```bash
dotnet test
```

## .gitignore Notes

Ensure the following are ignored:

```
bin/
obj/
node_modules/
*.log
.env
```

