import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './components/About';
import Blogs from './components/Blogs';
import Timetable from './components/Timetable';
import Header from './components/Layout/Header';
import Admin from './pages/Admin';
import LoginForm from './components/LoginForm'; 
import RegisterForm from './components/RegistrationForm';
import { TokenProvider } from './components/TokenContext';

import RoomForm from './components/Form/RoomForm';
import RoomTable from './components/Form/RoomTable';
import CourseForm from './components/Form/CourseForm';
import CourseTable from './components/Form/CourseTable';
import TeacherForm from './components/Form/TeacherForm'
import TeacherTable from './components/Form/TeacherTable';
import DepartmentForm from './components/Form/DepartmentForm';
import DepartmentTable from './components/Form/DepartmentTable';
import SessionForm from './components/Form/SessionForm';
import SessionTable from './components/Form/SessionTable'; 
import ProgramForm from './components/Form/ProgramForm';
import ProgramTable from './components/Form/ProgramTable';
import AvailableRoomForm from './components/Form/AvailableRoomForm';
import AvailableTable from './components/Form/AvailableTable';
import SectionForm from './components/Form/SectionForm';
import SectionTable from './components/Form/SectionTable';
import CurrentSessionForm from './components/Form/CurrentSessionForm';
import CurrentSessionTable from './components/Form/CurrentSessionTable';
import OfferedSubjectForm from './components/Form/OfferedSubjectForm';
import OfferedSubjectTable from './components/Form/OfferedSubjectTable';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/Admin';

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/admin/room-form" element={<RoomForm />} />
        <Route path="/admin/view-rooms" element={<RoomTable rooms={[]} />} />

        <Route path="/admin/course-form" element={<CourseForm />} />
        <Route path="/admin/view-courses" element={<CourseTable courses={[]} />} />

        <Route path="/admin/teacher-form" element={<TeacherForm />} />
        <Route path="/admin/view-teacher" element={<TeacherTable teachers={[]} />} />

        <Route path="/admin/department-form" element={<DepartmentForm />} />
        <Route path="/admin/view-department" element={<DepartmentTable departments={[]} />} />

        <Route path="/admin/session-form" element={<SessionForm />} />
        <Route path="/admin/view-session" element={<SessionTable session={[]} />} />

        <Route path="/admin/program-form" element={<ProgramForm />} />
        <Route path="/admin/view-program" element={<ProgramTable program={[]} />} />

        <Route path="/admin/available-room-form" element={<AvailableRoomForm />} />
        <Route path="/admin/view-available-rooms" element={<AvailableTable availableRooms={[]} />} />

        <Route path="/admin/section-form" element={<SectionForm />} />
        <Route path="/admin/view-section" element={<SectionTable section={[]} />} />

        <Route path="/admin/current-session-form" element={<CurrentSessionForm />} />
        <Route path="/admin/view-current-session" element={<CurrentSessionTable currentSession={[]} />} />

        <Route path="/admin/offered-subject-form" element={<OfferedSubjectForm />} />
        <Route path="/admin/view-offered-subjects" element={<OfferedSubjectTable offeredSubjects={[]} />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <TokenProvider>
      <AppContent />
    </TokenProvider>
  </Router>
);

export default App;
