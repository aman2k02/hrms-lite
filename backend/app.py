from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Employee, Attendance
import re
from datetime import date as dt

# 1. Initialize Flask App and CORS
app = Flask(__name__)
CORS(app) # Required for Frontend-Backend connection

# 2. Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hrms.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 3. Initialize Database
db.init_app(app)

# Create tables on startup
with app.app_context():
    db.create_all()

# 4. Helper for Email Validation
def is_valid_email(email):
    # Requirement: Valid email format
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

# --- Employee Management Routes ---

@app.route('/api/employees', methods=['GET', 'POST'])
def manage_employees():
    if request.method == 'POST':
        data = request.json
        
        # Requirement: Basic server-side validation
        if not is_valid_email(data.get('email', '')):
            return jsonify({"error": "Invalid email format"}), 400 
            
        # Requirement: Duplicate employee handling
        if Employee.query.filter_by(emp_id=data.get('emp_id')).first():
            return jsonify({"error": "Duplicate Employee ID"}), 400
        
        new_emp = Employee(
            emp_id=data['emp_id'], 
            name=data['name'], 
            email=data['email'], 
            department=data['department']
        )
        db.session.add(new_emp)
        db.session.commit()
        return jsonify({"message": "Employee added successfully"}), 201

    # Requirement: View a list of all employees
    employees = Employee.query.all()
    return jsonify([{
        "id": e.id, 
        "emp_id": e.emp_id, 
        "name": e.name, 
        "email": e.email, 
        "dept": e.department
    } for e in employees]), 200

@app.route('/api/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    # Requirement: Delete an employee
    emp = Employee.query.get_or_404(id)
    db.session.delete(emp)
    db.session.commit()
    return jsonify({"message": "Employee deleted"}), 200

# --- Attendance Management Routes ---

@app.route('/api/attendance', methods=['POST'])
def mark_attendance():
    """Requirement: Mark attendance with Date and Status"""
    data = request.json
    # Validation: Requirement - Ensure required fields are present
    if not data.get('date') or not data.get('status') or not data.get('employee_id'):
        return jsonify({"error": "Date, Status, and Employee ID are required"}), 400
        
    try:
        new_record = Attendance(
            date=data['date'], 
            status=data['status'], 
            emp_db_id=data['employee_id']
        )
        db.session.add(new_record)
        db.session.commit()
        return jsonify({"message": "Attendance marked successfully"}), 201
    except Exception as e:
        # Requirement: Handle errors gracefully
        return jsonify({"error": "Failed to save attendance"}), 500

@app.route('/api/attendance/<int:employee_id>', methods=['GET'])
def get_attendance_history(employee_id):
    """Requirement: View attendance records for each employee"""
    # Persistence: Queries SQL database for records linked to this employee
    records = Attendance.query.filter_by(emp_db_id=employee_id).order_by(Attendance.date.desc()).all()
    return jsonify([{"date": r.date, "status": r.status} for r in records]), 200

@app.route('/api/attendance/daily/<string:date>', methods=['GET'])
def get_daily_attendance(date):
    """Requirement: Track daily attendance for a specific date"""
    records = Attendance.query.filter_by(date=date).all()
    # Map employee IDs to their status for quick lookup on the dashboard
    status_map = {r.emp_db_id: r.status for r in records}
    return jsonify(status_map), 200

@app.route('/api/attendance/today', methods=['GET'])
def get_today_attendance():
    """Requirement: Shortcut to track daily attendance for today"""
    today_str = dt.today().isoformat()
    records = Attendance.query.filter_by(date=today_str).all()
    status_summary = {r.emp_db_id: r.status for r in records}
    return jsonify(status_summary), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)