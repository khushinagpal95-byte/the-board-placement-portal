import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext.jsx";
import { RoleProvider } from "./context/RoleContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PortalLayout from "./components/PortalLayout.jsx";
import RolePicker from "./pages/RolePicker.jsx";
import NotFound from "./pages/NotFound.jsx";
import BrowseJobs from "./pages/student/BrowseJobs.jsx";
import JobDetail from "./pages/student/JobDetail.jsx";
import Applications from "./pages/student/Applications.jsx";
import SavedJobs from "./pages/student/SavedJobs.jsx";
import Profile from "./pages/student/Profile.jsx";
import MyPostings from "./pages/recruiter/MyPostings.jsx";
import PostJob from "./pages/recruiter/PostJob.jsx";
import EditJob from "./pages/recruiter/EditJob.jsx";

/* ---------------------------------------------------------
   App = the route map. Which URL shows which page:

   /                          role picker
   /student                   browse jobs      (student only)
   /student/jobs/:jobId       job detail       (dynamic route)
   /student/applications      application tracker
   /student/saved             saved jobs
   /student/profile           profile form
   /recruiter                 your postings    (recruiter only)
   /recruiter/post            post a job
   /recruiter/edit/:jobId     edit a job       (dynamic route)
   anything else              404 page

   The Context providers wrap everything, so every page can use them.
--------------------------------------------------------- */
export default function App() {
  return (
    <div className="jbp">
      <ToastProvider>
        <RoleProvider>
          <Routes>
            <Route path="/" element={<RolePicker />} />

            {/* nested routes: PortalLayout draws the nav bar, the child page appears in its <Outlet /> */}
            <Route path="/student" element={<ProtectedRoute role="student"><PortalLayout /></ProtectedRoute>}>
              <Route index element={<BrowseJobs />} />
              <Route path="jobs/:jobId" element={<JobDetail />} />
              <Route path="applications" element={<Applications />} />
              <Route path="saved" element={<SavedJobs />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/recruiter" element={<ProtectedRoute role="recruiter"><PortalLayout /></ProtectedRoute>}>
              <Route index element={<MyPostings />} />
              <Route path="post" element={<PostJob />} />
              <Route path="edit/:jobId" element={<EditJob />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </RoleProvider>
      </ToastProvider>
    </div>
  );
}
