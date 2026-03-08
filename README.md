# 🍕 Crustoria 

Crustoria is a modern, full-stack pizza ordering web application designed to provide a seamless and premium user experience. Built with the latest web technologies, it features a dynamic frontend, a robust backend API, and a comprehensive admin dashboard.
<img width="1738" height="925" alt="Image" src="https://github.com/user-attachments/assets/75a64491-e203-432d-894d-ef50daf80ca4" />

---

## 🚀 Features

### 👤 User Features
- **User Authentication**: Secure Signup and Login using JWT.
- **Browse Menu**: View pizzas with details, prices, and images.
- **Advanced Filtering**: Filter pizzas by category (Veg, Meat, etc.) and style (Pan, Thin Crust, etc.).
- **Cart Management**: Add/remove items, adjust quantities, and view real-time totals.
- **Order Placement**: seamless checkout process with Cash on Delivery (COD) or Online Payment (PayHere integration).
- **Order History**: View past orders and their real-time status.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

### 🛡️ Admin Features
- **Dashboard Analytics**: Visualize total revenue, order counts, and top-selling pizzas.
- **Menu Management**: Add, edit, delete, and toggle availability of pizzas.
- **Order Management**: View all customer orders and update their status (Preparing, Delivered, etc.).
- **User Management**: View registered customers.
- **Email Notifications**: Automatic email updates to customers when their order is delivered.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **State Management**: React Context API
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Icons**: Lucide React & FontAwesome
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) & Mongoose
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS
- **Image Storage**: Cloudinary
- **Email Service**: Nodemailer
- **Payment Gateway**: PayHere (Sandbox)

---

## � Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas URI)
- Cloudinary Account
- PayHere Sandbox Account (Optional for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/vinoth-dilshan/Crustoria.git
cd Crustoria
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Email Configuration
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
# PayHere Configuration
PAYHERE_MERCHANT_ID=your_merchant_id
PAYHERE_SECRET=your_payhere_secret
```

Start the backend server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
# App will run on http://localhost:5173
```

---

## 📂 Project Structure

```bash
Crustoria/
├── backend/
│   ├── config/         # Database and external service configs
│   ├── controllers/    # Request logic (Auth, Menu, Order)
│   ├── middleware/     # Auth checks, Role checks, File upload
│   ├── models/         # Mongoose Schemas (User, Pizza, Order)
│   ├── routers/        # API Routes
│   ├── utils/          # Helper functions (Email, Seed, etc.)
│   └── server.js       # Entry point
│
├── frontend/
│   ├── public/         # Static assets
│   └── src/
│       ├── components/ # Reusable components (Navbar, Admin, etc.)
│       ├── context/    # Global state (Auth, Cart)
│       ├── pages/      # Page views (Home, Menu, Dashboard, etc.)
│       ├── services/   # API calls handling
│       └── App.jsx     # Main Component with Routes
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📄 License
This project is licensed under the ISC License.

