import { useEffect } from "react";

function WebSocketNotification(token, onNotificationReceived) {
    const WS_URL = "ws://localhost:8080/projecto5backend/notification/";
    const websocket = new WebSocket(WS_URL + token);
    useEffect(() => {
      
      websocket.onopen = () => {
        console.log("The notification websocket connection is open");
      };
  
      
    }, [token]); 

    useEffect(() => {
        websocket.onmessage = (event) => {
            console.log("Notification received from server:", event.data);
            const dataaObj = JSON.parse(event.data);
            onNotificationReceived(dataaObj);
          };
        }, [onNotificationReceived]);

   
  websocket.onclose = () => {
    console.log("The notification websocket connection is closed");
  };
  
}

export default WebSocketNotification;