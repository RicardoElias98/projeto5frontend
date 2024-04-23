import { useEffect } from "react";

function WebSocketDB(token, onNewsReceived) {
  const WS_URL = "ws://localhost:8080/projecto5backend/dashboard/";
  useEffect(() => {
    const websocket = new WebSocket(WS_URL + token);
    websocket.onopen = () => {
      console.log("The websocket DB connection is open");
    };

    websocket.onmessage = (event) => {
      console.log("News received from server:", event.data);
      onNewsReceived(event.data); 
    };

    websocket.onclose = () => {
      console.log("The websocket DB connection is closed");
    };
    
    return () => {
      websocket.close();
    };
  }, [token, onNewsReceived]); 
}

export default WebSocketDB;
