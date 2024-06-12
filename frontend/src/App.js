import { useNavigate } from 'react-router-dom';
import './App.css';


function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Website</h1>
        <button className='users-button' onClick={() => navigate('/users')}>Add Users</button>
      </header>
    </div>
  );
}

export default App;
