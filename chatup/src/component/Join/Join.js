import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/360_F_511873784_NLmIMOcuwo9JTuoXJNyR0jQSQOUXUvFk.jpg"
import {Link} from "react-router-dom"

let user,roomID,mobile;
const sendUser=()=>{
    user=document.getElementById("joinInput").value;
    mobile=document.getElementById("userMobile").value;
    roomID=document.getElementById("joinRoom").value;
    document.getElementById("joinInput").value="";
    document.getElementById("userMobile").value="";
    document.getElementById("joinRoom").value="";
}

const Join = () => {

    const [name,setname] = useState("");
    console.log(name);

    const [mobile,setMobile] = useState("");
    console.log(mobile);

    const [room,setRoom]=useState("");
    console.log(room);
    

  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={logo} alt=""/>
        <h1>CHAtUP</h1>
        <input onChange={(e)=>setname(e.target.value)} placeholder="Enter your name" type="text" id="joinInput"/>
        <input onChange={(e)=>setMobile(e.target.value)} placeholder="Enter your mobile no." type="text" id="userMobile"/>
        <input onChange={(e)=>setRoom(e.target.value)} placeholder="Enter room ID" type="text" id='joinRoom'/>
        <Link onClick={(event)=> (name && room)?null:event.preventDefault()} to="/chat"><button onClick={sendUser} className='joinbtn'>Login</button></Link> 
         
      </div>
    </div>
  )
}

export default Join
export {user,mobile,roomID}
