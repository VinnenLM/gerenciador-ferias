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
import { PrivateRoute } from './services/PrivateRoute';
import { store, persistor } from './store';
import "./style.css"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/home' element={<PrivateRoute />}>
              <Route exact path='/home' element={<Home />} />
            </Route>
            <Route exact path='/perfil' element={<PrivateRoute />}>
              <Route exact path='/perfil' element={<Perfil />} />
            </Route>
            <Route exact path='/cadastro' element={<PrivateRoute />}>
              <Route exact path='/cadastro' element={<Cadastro />} />
            </Route>
            <Route exact path='/colaboradores' element={<PrivateRoute />}>
              <Route exact path='/colaboradores' element={<Colaboradores />} />
            </Route>
            <Route exact path='/equipe' element={<PrivateRoute />}>
              <Route exact path='/equipe' element={<Colaboradores />} />
            </Route>
            <Route exact path='/dashboard' element={<PrivateRoute />}>
              <Route exact path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route exact path='/solicitacoes' element={<PrivateRoute />}>
              <Route exact path='/solicitacoes' element={<ListaSolicitacoes />} />
            </Route>
            <Route exact path='/solicitar' element={<PrivateRoute />}>
              <Route exact path='/solicitar' element={<Solicitar />} />
            </Route>
            <Route exact path='/minhas-solicitacoes' element={<PrivateRoute />}>
              <Route exact path='/minhas-solicitacoes' element={<MinhasSolicitacoes />} />
            </Route>
            <Route exact path='/solicitacao/:idSolicitacao' element={<PrivateRoute />}>
              <Route exact path='/solicitacao/:idSolicitacao' element={<Solicitacao />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
