import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowEmpleados from './components/ShowEmpleados';
import CreateEmpleados from './components/CreateEmpleados';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
          <Route path='/' element={<ShowEmpleados/>} />
          <Route path='/create' element={<CreateEmpleados/>}/>
          <Route path='/edit/:id' element={<CreateEmpleados/>}/>
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
