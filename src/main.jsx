import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App'
import Home from './Home'
import StorageView from './components/StorageView'
import DetailView from './components/DetailView';
import NavBar from './components/NavBar';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<NavBar />} >
          <Route extract path="/home" element={<Home />} />
          <Route path="storage/:folder" element={<StorageView />} />
          <Route path="storage/:folder/:file" element={<DetailView />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
