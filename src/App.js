import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowEmpleados from './components/ShowEmpleados';
import CreateEmpleados from './components/CreateEmpleados';
import EditEmpleados from './components/EditEmpleados';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
          <Route path='/' element={<ShowEmpleados/>} />
          {/* <Route path='/create' element={<CreateEmpleados/>}/>
          <Route path='/edit/:id' element={<EditEmpleados/>}/> */}
        </Routes>  
      </BrowserRouter>
    </div>
  );
}

export default App;
