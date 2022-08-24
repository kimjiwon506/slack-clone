import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Join from './pages/Join';
import Login from './pages/Login'
import Main from './pages/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
