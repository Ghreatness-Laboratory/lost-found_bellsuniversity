import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from '../App';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<App />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
