import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './views/pages/Login';
import DashBoard from './views/pages/DashBoard';
import Sidebar from './components/common/Sidebar';
import { Loader } from './components/common/Loader';

function App() {
  console.log('app......./////')
  return (
    <div>
      <div className="wrapper">
        <Router>
          <Sidebar>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<DashBoard />} />
            </Routes>
          </Sidebar>
        </Router>
      </div>
      <Loader />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
      />
    </div>
  );
}

export default App;
