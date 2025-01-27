import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import StartPage from './start_pages/startPage.tsx'
import PlayerStart from './start_pages/playerStart.tsx';
import HostStart from './start_pages/hostStart.tsx';
import HostConnection from './start_pages/hostConnection.tsx';
import App from './games/bank/test.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<StartPage />} />

      <Route path="host" element={<HostConnection/>}>
        <Route path="start" element={<HostStart/>} />
      </Route>

      <Route path="player">
        <Route path="start" element={<PlayerStart/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
