# 🍕 Crustoria - Full Stack Pizza Delivery Application
---

<img width="1738" height="925" alt="Image" src="https://github.com/user-attachments/assets/75a64491-e203-432d-894d-ef50daf80ca4" />
---

Crustoria is a modern, full-stack pizza ordering web application. It features a React-based frontend and a Node.js/Express backend, fully containerized with Docker and deployed on AWS EC2.

## 🚀 Live Demo
- **Frontend:** [https://crustoria.netlify.app/](https://crustoria.netlify.app/)
- **Backend API:** `http://98.91.196.20:5000/api`

---

## 🏗️ Architecture
The application is split into two main parts:
1.  **Frontend:** Built with React & Vite, deployed on **Netlify**.
2.  **Backend:** Node.js, Express, and MongoDB, containerized with **Docker** and hosted on **AWS EC2**.
3.  **CI/CD:** Automated deployment using **GitHub Actions**.



---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Axios (API Integration)
* React Router (Navigation)
* Tailwind CSS (Styling)

**Backend:**
* Node.js & Express.js
* MongoDB (Database)
* JWT (Authentication)
* Docker (Containerization)

**Infrastructure:**
* AWS EC2 (Hosting)
* GitHub Actions (CI/CD)
* Netlify (Frontend Hosting)

---

## 📦 Features
- [x] User Authentication (Signup/Login)
- [x] Pizza Menu Display (Fetched from API)
- [x] Shopping Cart Functionality
- [x] Order Placement & History
- [x] Order Status Updates (Admin)
- [x] Fully Responsive UI

---

## 🔧 Installation & Local Setup

### 1. Clone the repository
```bash
git clone [https://github.com/vinoth-dilshan/Crustoria.git](https://github.com/vinoth-dilshan/Crustoria.git)
cd Crustoria
2. Backend Setup
Bash
cd backend
npm install
# Create a .env file and add your MONGO_URI and JWT_SECRET
npm start
3. Frontend Setup
Bash
cd ../frontend
npm install
npm run dev
🐳 Docker Support
The backend is Dockerized. To run it using Docker:

Bash
docker build -t crustoria-backend ./backend
docker run -p 5000:5000 crustoria-backend
🚢 Deployment Details
Backend (AWS EC2)
The backend is deployed on an AWS EC2 instance. We use a GitHub Action to:

Build the Docker image.

Push it to Docker Hub.

SSH into EC2 and pull/run the latest container.

Frontend (Netlify)
The frontend is connected via Netlify. To handle Mixed Content (HTTPS calling HTTP), a _redirects file is used to proxy API requests:

Plaintext
/api/* [http://98.91.196.20:5000/api/:splat](http://98.91.196.20:5000/api/:splat)  200
🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

