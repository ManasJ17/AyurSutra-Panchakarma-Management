# AyurSutra-Panchakarma-Management

A full-stack Panchakarma Management authentication system for Patients and Hospitals/Practitioners, built with **Node.js + Express + MongoDB Atlas** (Backend) and **React.js** (Frontend).

---

## 🚀 Features

- **Role-based Authentication:** Separate registration and login for Patients and Hospitals/Practitioners.
- **JWT Auth:** Secure login with JWT tokens.
- **MongoDB Atlas:** Cloud database for storing users.
- **Modern UI:** Clean, responsive React interface with role selection.
- **Protected Routes:** Example protected API and dashboard pages for each role.

---

## 📁 Project Structure

```
AyurSutra-Panchakarma-Management-main/
│
├── Backend/           # Node.js/Express/MongoDB backend
│   ├── .env           # Environment variables (not committed)
│   ├── server.js      # Entry point
│   ├── controllers/   # Auth logic
│   ├── middleware/    # JWT middleware
│   ├── models/        # Mongoose schemas
│   └── routes/        # API routes
│
├── FrontEnd/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   └── package.json
│
└── .gitignore
```

---

## 🛠️ Prerequisites

- **Node.js** (v16+ recommended)
- **npm** (comes with Node.js)
- **MongoDB Atlas** account (already configured in `.env`)
- **Git** (for cloning, optional)

---

## ⚙️ Setup Instructions

### 1. **Clone the Repository**

```sh
git clone https://github.com/yourusername/AyurSutra-Panchakarma-Management.git
cd AyurSutra-Panchakarma-Management-main
```

---

### 2. **Backend Setup**

```sh
cd Backend
npm install
```

#### **Configure Environment Variables**

- Edit the `.env` file in the `Backend/` folder:
  ```
  MONGO_URI=your_mongodb_atlas_connection_string
  JWT_SECRET=your_super_secret_key
  ```
  (These are already set if you used the provided files.)

#### **Start the Backend Server**

```sh
npm run dev
```
- The backend will run on [http://localhost:5000](http://localhost:5000) by default.

---

### 3. **Frontend Setup**

Open a new terminal window/tab:

```sh
cd FrontEnd
npm install
```

#### **Start the Frontend**

```sh
npm start
```
- The frontend will run on [http://localhost:3000](http://localhost:3000) by default.

---

## 🧑‍💻 Usage

1. **Open [http://localhost:3000](http://localhost:3000) in your browser.**
2. **Select your role:** Patient or Hospital/Practitioner.
3. **Register** a new account or **Login** if you already have one.
4. **After login:**  
   - Patients are redirected to the Patient Dashboard.  
   - Hospitals/Practitioners are redirected to the Hospital Dashboard.
5. **Test protected routes:** Use the dashboard to see your user data.

---

## 📝 Notes

- **Do not commit your `.env` files** or any sensitive credentials to public repositories.
- **MongoDB Atlas** must allow connections from your IP address.
- **JWT_SECRET** must be set for authentication to work.

---

## 📷 Screenshots

![Role Selection and Login](./screenshots/role-selection-login.png)
![Patient Dashboard](./screenshots/patient-dashboard.png)
![Hospital Dashboard](./screenshots/hospital-dashboard.png)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

**Enjoy managing Panchakarma with AyurSutra!**