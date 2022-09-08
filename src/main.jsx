import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App'
import Home from './Home'
import StorageView from './components/StorageView'
import DetailView from './components/DetailView';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route extract path="/home" element={<Home />} />
        <Route path="storage/:folder" element={<StorageView />} />
        <Route path="storage/:folder/:file" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)