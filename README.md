
# HRX Payroll Platform (Capstone Project)

A full-stack Human Resource Management and Payroll System with integrated CRM and Resume Intelligence modules.
Built as a capstone project to demonstrate backend architecture, database design, API development, and modern frontend UI.

The system manages employees, payroll processing, client leads, and resume analysis in a single platform.

#  Tech Stack
## Backend
* Node.js
* Express.js
* MySQL
* JWT Authentication
* Multer (file upload)
* PDF/TXT resume parsing
* REST APIs

## Frontend
* React (Vite)
* React Router
* Axios
* Custom CSS (no UI framework)

## Database
* MySQL (normalized relational schema)
* Foreign keys enforced
* Payroll & HR domain modeling



# Modules Implemented

##  HR Module
* Employee onboarding
* Employee profile management
* Role & department mapping
* Attendance tracking (schema + APIs)
* Performance reviews
* Attrition risk scoring

##  Payroll Module
* Salary structure per employee
* Monthly payroll processing engine
* Tax & deduction calculation (rule-based)
* Gross / Net computation
* Payroll run records
* Payroll summary reports
* CSV export support
  
##  CRM Module
* Client/company records
* Lead tracking
* Deal status pipeline
* Interaction logs
* Task follow-ups
* Visual CRM Kanban board (frontend)
  
##  Intelligence Module
* Resume upload
* Resume text parsing
* Skill extraction
* Candidate scoring
* Stored parsed skills
* Score-based ranking

##  Reports & Analytics
* Payroll summary dashboard
* Aggregated monthly totals
* Export employees CSV
* Management report UI
  
#  Security Features
* JWT authentication
* Protected routes middleware
* Role-based access control (RBAC ready)
* Password hashing
* Foreign key integrity enforcement
  
#  Demo Flow
1. Login
2. Add employee
3. Run payroll for month/year
4. View payroll summary
5. Open CRM board → see leads pipeline
6. Upload resume → view skills + score
7. Download reports CSV

By
Kumar Vanshaj
