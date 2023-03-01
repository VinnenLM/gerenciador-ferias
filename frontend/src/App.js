import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cadastro } from './pages/cadastro';
import { Colaboradores } from './pages/colaboradores';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Perfil } from './pages/perfil';
import "./style.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/perfil' element={<Perfil />} />
        <Route exact path='/cadastro' element={<Cadastro />} />
        <Route exact path='/colaboradores' element={<Colaboradores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
