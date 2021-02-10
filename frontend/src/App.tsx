import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      </BrowserRouter> 
    </div>
  );
}

export default App;
