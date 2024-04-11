import { useEffect } from "react";

function WebSocketChat(token) {
  const WS_URL = "ws://localhost:8080/projecto5backend/message/";
  useEffect(() => {
    const websocket = new WebSocket(WS_URL + token);
    websocket.onopen = () => {
      console.log("The websocket connection is open");
    };

    websocket.onmessage = (event) => {
      console.log("Message received from server:", event.data);
    };
  }, []);
}
export default WebSocketChat;
