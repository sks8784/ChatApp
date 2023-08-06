import React, { useEffect, useState } from 'react'
import {user,mobile,roomID} from "../Join/Join"
import socketIo from "socket.io-client";
import "./Chat.css"
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/close.png";


const ENDPOINT="https://chatappapi-ltqr.onrender.com/";
// const ENDPOINT="http://localhost:4500/";

let socket;

const Chat = () => {

    const [id, setid] = useState("");
    const [messages,setmessages]=useState([])
    const send=async(e)=>{
        const message=document.getElementById('chatInput').value;
         socket.emit('message',{message:message, id, mobile, roomID})
         document.getElementById('chatInput').value="";

    }
    console.log(messages);


  
    useEffect(() => {
      socket = socketIo(ENDPOINT, { transports: ['websocket', 'polling'] });
      socket.on("connect",()=>{
        setid(socket.id);
      })
      console.log(socket);
      if(user!=="" && mobile!==""&& roomID!==""){
        socket.emit('joined',{user,mobile,roomID})
      }
      
      

      socket.on('welcome',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
      })

      socket.on('userJoined',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
      })

      socket.on('leave',(data)=>{
        setmessages([...messages,data]);
        console.log(data.user,data.message);
      })
      
      
      return () => {
        socket.disconnect();
        socket.off();
      }
    },[])


   
    
    useEffect(() => {

      socket.on('sendPrevmssg',(data)=>{
        console.log(data);
        setmessages(...messages,data);
        console.log(messages);
      })

      
        socket.on('sendMessage',(data)=>{
          setmessages([...messages,data]);
          if(data!==""){
            // socket.emit('loadData',{user:data.user,mobile:data.mobile,roomID:data.roomID,id:data.id,message:data.message});
            socket.emit('loadData',{user:data.user,mobile:data.mobile,roomID:data.roomID,message:data.message});
          }
        console.log(messages);
        // console.log(data.user,data.message,data.id,data.roomID);
        console.log(data.user,data.message,data.roomID);
      })
       

      return () => {
        socket.off();
      }
    }, [messages])
    

  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
              <h2>ChatUp</h2>
              <a href="/"><img src={closeIcon} alt="close"/></a>
            </div>
            <ReactScrollToBottom className='chatBox'>
              {messages.map((item,i)=><Message user={item.mobile===mobile?``:item.user} message={item.message} classs={item.mobile===mobile?'right':'left'}/>)}
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input onKeyPress={(event)=>event.key==='Enter'? send():null} type="text" id="chatInput"/>
                <button onClick={send} className='sendBtn'>Send</button>
            </div>
        </div>
    </div>
  )
}

export default Chat
