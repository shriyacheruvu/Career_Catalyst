import React from 'react';
import {HomePage} from './components/home'; // Correct path separator
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import{Cards }from './components/cards'; 
import {Login} from './components/login';
import Individual_Register from './components/individual_register';
import Institution_Register from './components/institution_register';
import Institution_Member_Register from './components/institution_member_register';
import AdminDashboard from './components/admin_dashboard';
import IndividualDashboard from './components/individual_dashboard';
import InstitutionAdminDashboard from './components/institution_admin_dashboard';
import StudentDashboard from './components/student_dashboard';
import InstitutionEmpDashboard from './components/institution_emp_dashboard';
import Job_Recommadation from './components/job_recommandation';
import Job_Recommedation from './components/job_recommandation';

export function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Additional routes */}
        <Route path="/cards" element={<Cards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/individual_register" element={<Individual_Register />} />
        <Route path="/institution_register" element={<Institution_Register />} />
        <Route path="/institution_member_register" element={<Institution_Member_Register />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/individual_dashboard" element={<IndividualDashboard />} />
        <Route path="/institution_admin_dashboard" element={<InstitutionAdminDashboard />} />
        <Route path="/student_dashboard" element={<StudentDashboard />} />
        <Route path="/institution_emp_dashboard" element={<InstitutionEmpDashboard />} />
        <Route path="/job_recommendation" element={<Job_Recommedation/>}/>
      </Routes>
    </Router>
  );
};


