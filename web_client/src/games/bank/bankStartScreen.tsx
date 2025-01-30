import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router'
import { io, Socket } from "socket.io-client";
import gamesData from '../games/games.json'

const BankStartScreen = () => {

  return (
    <>
        <h1>Bank</h1>
    </>
  );
}

export default BankStartScreen