// App.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io("http://localhost:3000");

    // Listen for the "hello" event
    socket.on("hello", (data) => {
      setMessage(data); // Update the state with the received message

      socket.emit("hello", "world");
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
      console.log("disconnected")
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Socket.IO React Example</h1>
      {message ? <p>Message from server: {message}</p> : <p>Waiting for server...</p>}
    </div>
  );
};

export default App;
