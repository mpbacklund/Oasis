import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import StartPage from './start_pages/startPage.tsx'
import PlayerStart from './start_pages/playerStart.tsx';
import HostStart from './start_pages/hostStart.tsx';
import HostPage from './start_pages/hostPage.tsx';
import BankData from './games/bank/pages/bankData.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<StartPage />} />

      <Route path="host" element={<HostPage/>}>
        <Route path="start" element={<HostStart/>} />
        <Route path="bank" element={<BankData/>}/>
        
      </Route>

      <Route path="player" >
        <Route path="start" element={<PlayerStart/>} />
        <Route path="bank" />
      </Route>
    </Routes>
  </BrowserRouter>,
)
