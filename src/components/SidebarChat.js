import React, { useState,useEffect } from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from '../firebase';
import { Link } from 'react-router-dom';

const SidebarChat = ({ id,name,addNewChat }) => {
    const [messages, setMessages] = useState("")
    const [seed,setSeed] = useState("");

    useEffect(() => {
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot(snapshop => setMessages(snapshop.docs.map(doc => doc.data())))
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Plese enter name for chat")
        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    }
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>  
        </Link>
        
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
