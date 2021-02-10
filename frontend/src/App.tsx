import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import ToDoList from './components/todos/ToDoList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <ToDoList/>
      </BrowserRouter> 
    </div>
  );
}

export default App;
