import { Route, Routes } from 'react-router-dom';
import Index from '../pages';
import AboutUs from '../pages/aboutUs';
import ContactUs from '../pages/contactUs';
import Home from '../pages/home';
import Login from '../pages/login';
import MakeAReport from '../pages/makeReport';
import Register from '../pages/register';
import Reports from '../pages/reports';

function AppRouter() {
  return (
    <Routes>
      <Route
        index
        element={<Index />}
      />
      <Route
        path='/home'
        element={<Home />}
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
        path='/reports'
        element={<Reports />}
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
  );
}

export default AppRouter;
