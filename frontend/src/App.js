import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Cadastro } from './pages/cadastro';
import { Colaboradores } from './pages/colaboradores';
import { Dashboard } from './pages/dashboard';
import { Home } from './pages/home';
import { ListaSolicitacoes } from './pages/listaSolicitacoes';
import { Login } from './pages/login';
import { MinhasSolicitacoes } from './pages/minhasSolicitacoes';
import { Perfil } from './pages/perfil';
import { Solicitacao } from './pages/solicitacao';
import { Solicitar } from './pages/solicitar';
import { store, persistor } from './store';
import "./style.css"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/perfil' element={<Perfil />} />
            <Route exact path='/cadastro' element={<Cadastro />} />
            <Route exact path='/colaboradores' element={<Colaboradores />} />
            <Route exact path='/equipe' element={<Colaboradores />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/solicitacoes' element={<ListaSolicitacoes />} />
            <Route exact path='/solicitar' element={<Solicitar />} />
            <Route exact path='/minhas-solicitacoes' element={<MinhasSolicitacoes />} />
            <Route exact path='/solicitacao' element={<Solicitacao />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
