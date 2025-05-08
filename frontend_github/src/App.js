import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Create from './pages/create';
import Edit from './pages/edit';
import View from './pages/view';
import { FaHome, FaPlusCircle } from 'react-icons/fa'; // Importing icons for the nav links

function App() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary shadow-sm'>
        <div className='container'>
          <a className='navbar-brand fs-3' href="#">User Management</a>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <Link to={'/'} className="nav-link text-white">
                  <FaHome className="me-2" /> Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/create'} className="nav-link text-white">
                  <FaPlusCircle className="me-2" /> Create
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="container my-5">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className='bg-dark text-white py-2'>
        <div className='container text-center'>
          <p>&copy; 2025 User Management | Built with 💙 by Your Team</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
