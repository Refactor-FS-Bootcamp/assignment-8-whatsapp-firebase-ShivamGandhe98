import React,{useState,useEffect} from 'react'
import { Avatar,IconButton } from '@material-ui/core'
import './Chat.css'
import { MoreVert, SearchOutlined, AttachFile, InsertEmoticon, MessageSharp } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app'

const Chat = () => {
    const [seed,setSeed] = useState("");
    const [input,setinput] = useState("");
    const { roomId } = useParams()
    const [roomName,setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue()


    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    }, [])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = e => {
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages').add({message: input,name: user.displayName,timestamp: firebase.firestore.FieldValue.serverTimestamp()})
        setinput('')
    }

    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`}/>
            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>Last seen at {" "}
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                </p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>    
                ))} 
            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input placeholder="Type a message" type="text" 
                    value={input} onChange={e => setinput(e.target.value)}/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
