import React, {useEffect, useState} from 'react'
import './Chat.css'
import {Avatar, IconButton} from "@mui/material";
import {AttachFile, SearchOutlined} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import MicIcon from "@mui/icons-material/Mic"
import {useParams} from "react-router-dom";
import db from "./firebase";
import firebase from 'firebase/compat'
import {useStateValue} from "./StateProvider";

function Chat() {

    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue()

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = e => {
        e.preventDefault()

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    }


    return(
        <div className={'chat'}>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {
                        new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                    }</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {
                    messages.map((message) => (
                        <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                            <span className={'chat__name'}>{message.name}</span>
                            {message.message}
                            <span className={'chat__timestamp'}>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                        </p>
                        ))
                }
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input placeholder={"Type a message"} onChange={e => setInput(e.target.value)} value={input} type="text"/>
                    <button onClick={sendMessage} type={'submit'}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat