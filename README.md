# 🚀 Job Offer Aggregator API

## 📌 Overview
This backend application integrates with two different APIs to fetch job offer data, transforms the data into a unified structure, stores it in a database, and provides an API endpoint to retrieve and filter the transformed data.

## 🏗️ Features
- Fetch job offers from two external APIs
- Transform and normalize job data into a unified format
- Store data in a PostgreSQL database
- Schedule periodic data fetching using a cron job
- Provide an API endpoint to retrieve and filter job offers
- Implement robust error handling and logging
- Unit and integration tests for reliability

## 🛠️ Tech Stack
- **NestJS** (TypeScript-based backend framework)
- **PostgreSQL** (Relational database)
- **TypeORM** (ORM for database management)
- **Axios** (HTTP client for API integration)
- **node-cron** (Scheduler for periodic data fetching)
- **Jest** (Testing framework)

---

## 🏗️ Setup & Installation
### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/milad-ahmd/jobs-app.git
 cd your-repository
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=job_offers
API_PROVIDER1_URL=https://assignment.devotel.io/api/provider1/jobs
API_PROVIDER2_URL=https://assignment.devotel.io/api/provider2/jobs
FETCH_CRON_SCHEDULE=*/30 * * * *  # Runs every 30 minutes
```

### **4️⃣ Start PostgreSQL using Docker (Optional)**
```sh
docker-compose up -d
```

### **5️⃣ Run Database Migrations**
```sh
npm run migration:run
```

### **6️⃣ Start the Application**
```sh
npm run start:dev
```

---

## 📡 API Endpoints
### **1️⃣ Fetch Job Offers**
```http
GET /api/job-offers
```
#### **Query Parameters**
| Parameter     | Type   | Description                    |
|--------------|--------|--------------------------------|
| `title`      | string | Filter by job title           |
| `location`   | string | Filter by job location        |
| `salary_min` | number | Minimum salary filter         |
| `salary_max` | number | Maximum salary filter         |
| `page`       | number | Pagination: page number       |
| `limit`      | number | Pagination: items per page    |

#### **Example Request:**
```http
GET /api/job-offers?title=developer&location=remote&salary_min=50000&page=1&limit=10
```

#### **Example Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Software Engineer",
      "company": "Tech Corp",
      "location": "Remote",
      "salary": 60000,
      "posted_at": "2025-02-10T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

---

## ⏲️ Scheduled Data Fetching
The application fetches job data periodically using a **cron job**.
- **Configured via `.env`** using `FETCH_CRON_SCHEDULE`
- Default: Runs every **30 minutes**

---

## ✅ Testing
To run unit and integration tests:
```sh
npm run test
```
To run end-to-end (E2E) tests:
```sh
npm run test:e2e
```

---

## 🛠️ Error Handling
- **Retries** for failed API requests
- **Graceful handling** of database errors
- **Clear and structured API error responses**

---

## 📜 License
This project is licensed under the MIT License.

---

## 💡 Future Improvements
- Add authentication and authorization (JWT-based)
- Implement WebSocket for real-time job updates
- Improve caching for performance optimization


---

## 🚀 Author
**Milad Ahmadi** – [GitHub](https://github.com/milad-ahmd)
