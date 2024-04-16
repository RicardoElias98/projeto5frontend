import { useEffect } from "react";

function WebSocketTasks(token, onTaskReceived) {
    const WS_URL = "ws://localhost:8080/projecto5backend/notification/";
    const websocket = new WebSocket(WS_URL + token);
    useEffect(() => {
      
      websocket.onopen = () => {
        console.log("The task websocket connection is open");
      };
  
      
    }, [token]); 

    useEffect(() => {
        websocket.onmessage = (event) => {
            console.log("task received from server:", event.data);
            const dataaObj = JSON.parse(event.data);
            onTaskReceived(dataaObj);
          };
        }, [onTaskReceived]);

   
  websocket.onclose = () => {
    console.log("The tasks websocket connection is closed");
  };
  
}
  

export default WebSocketTasks;