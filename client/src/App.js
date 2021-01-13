
import './App.css';
const axios = require('axios');

function App() {
  const testBackend = () => {
    axios.get('/test')
    .then((res) => {
      console.log(res.data);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button onClick={testBackend}>Test Connection</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
