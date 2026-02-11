# 🚀 HRMS Lite – Employee & Attendance Management

A lightweight full-stack Human Resource Management System built to manage employee records and daily attendance through a simple and professional interface.

This project demonstrates frontend-backend integration, REST API design, validation handling, and real-world cloud deployment.

---

## 🌐 Live Links

Frontend (Public Website)  
https://hrms-lite-beryl-nine.vercel.app

Backend API  
https://hrms-lite-ul0o.onrender.com

GitHub Repository  
https://github.com/aman2k02/hrms-lite

---

## 📸 Screenshots For Understanding

<img width="1339" height="595" alt="screen1" src="https://github.com/user-attachments/assets/69774d86-dad7-4263-afe8-9e67a59d187e" />

<img width="1339" height="595" alt="screen2" src="https://github.com/user-attachments/assets/69774d86-dad7-4263-afe8-9e67a59d187e" />

<img width="1339" height="595" alt="screen3" src="https://github.com/user-attachments/assets/69774d86-dad7-4263-afe8-9e67a59d187e" />

<img width="1339" height="595" alt="screen4" src="https://github.com/user-attachments/assets/69774d86-dad7-4263-afe8-9e67a59d187e" />

---

## 📌 Core Features

### 👥 Employee Management
- Add new employee  
- View all employees  
- Delete employee  
- Unique Employee ID validation  
- Unique Email validation  
- Required field checks  

### 📅 Attendance Management
- Mark Present / Absent  
- View attendance history per employee  
- Daily attendance tracker  

---

## 🧠 System Highlights

- RESTful API communication  
- Persistent database storage  
- Hosted backend connected to live frontend  
- Proper HTTP status codes  
- Clear validation messages  
- Reusable React components  
- Production-ready configuration  

---

## 🛠 Tech Stack

Frontend  
- React.js  
- Fetch API  
- Environment-based API routing  
- Hosted on Vercel  

Backend  
- Python  
- Flask  
- Flask-CORS  
- SQLAlchemy  
- Gunicorn  
- Hosted on Render  

Database  
- SQLite  

---

## ⚙️ Steps to Run Locally

### Clone the repository
git clone https://github.com/aman2k02/hrms-lite.git

---

### Backend setup
cd backend  
pip install -r requirements.txt  
python app.py  

Backend runs on:  
http://localhost:5000

---

### Frontend setup
cd frontend  
npm install  
npm start  

Frontend runs on:  
http://localhost:3000

---

## 🔐 Validations Implemented

The system prevents:

- Invalid email format  
- Missing required fields  
- Duplicate employee IDs  
- Duplicate email addresses  

Errors are returned from the API and displayed in the UI.

---

## 🌍 Deployment Notes

The backend is deployed using Render’s free tier, so the service may sleep after inactivity.  
The first request may take around 30–60 seconds to wake up.

---

## 🎯 Design Approach

The focus of this solution is:

✔ clean implementation  
✔ reliability  
✔ real usability  
✔ proper error handling  

without unnecessary complexity.

---

## 🙌 Author

Aman Verma  
Python Full Stack Developer
