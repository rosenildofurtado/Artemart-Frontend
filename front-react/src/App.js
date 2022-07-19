import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import { Login } from './pages/Login/Login';
import { Cadastro } from './pages/Cadastro/Cadastro';
import PublicarArte from './pages/PublicarArte/PublicarArte';
import DetalharArte from './pages/DetalharArte/DetalharArte';
import EditarArte from './pages/EditarArte/EditarArte';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/editar/:id' element={<EditarArte />} />
        <Route path='/detalhar/:id' element={<DetalharArte />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/publicar' element={<PublicarArte />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App;
