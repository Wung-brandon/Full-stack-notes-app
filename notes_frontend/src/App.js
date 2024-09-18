import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from "./pages/Home.pages";
import LoginPage from "./pages/login.page";
import SignUpPage from "./pages/signup.pages";
import Navbar from "./components/navbar.components";
import AddNote from "./pages/addNote";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import NotesDetail from "./pages/notesDetails";

function App() {
  return (
    <div>
      <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create" 
            element={<PrivateRoute><AddNote /></PrivateRoute>} 
           />
          <Route path="details/:id" element={<NotesDetail />} />
        </Routes>
      </AuthProvider>
    </Router>
    </div>

      
  );
}

export default App;
