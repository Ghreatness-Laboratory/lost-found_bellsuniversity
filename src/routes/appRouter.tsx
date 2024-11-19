import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from '../App';
import AboutUs from '../pages/aboutUs';
import ContactUs from '../pages/contactUs';
import Login from '../pages/login';
import MakeAReport from '../pages/makeReport';
import Register from '../pages/register';
import Report from '../pages/report';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<App />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/report'
          element={<Report />}
        />
        <Route
          path='/make-a-report'
          element={<MakeAReport />}
        />
        <Route
          path='/about-us'
          element={<AboutUs />}
        />
        <Route
          path='/contact-us'
          element={<ContactUs />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
