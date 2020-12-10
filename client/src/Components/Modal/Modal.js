import React,{useState} from 'react'
import Subscription from '../../services/Subscription'
import SubscriptionService from '../../services/Subscription'
import "./Modal.css"

const Modal = ({open, setOpen, channels, userId, subscriptions, setSubscriptions}) => {
    const [error, setError] = useState('')

    
    const subscribe = (UserId, ChannelId)=>{
        SubscriptionService.postSubscription({UserId, ChannelId})
        .then((res)=>{
            let newArray = [...subscriptions]
            newArray.push(res.data)
            setSubscriptions(newArray)
        }).catch(err=>setError("Already subscrbed to this channel"))
        
    }
    if(!open) return null
    return (
        <div className="container-overlay">
            <button onClick={()=>{setOpen(false); setError("")}} className="close-button">Close</button>
            <div className="channels-container">
                <h4>Available Channels {error && <small style={{color: 'red'}}>{error}</small>}</h4>
                <div className="channels-wrapper">
                    {
                        channels.map((channel)=>{
                            return(
                                <div className="channel" key={channel.id}>
                                    <p>{channel.name} </p>
                                    <button onClick={()=>{subscribe(userId,channel.id); setError('')}} className="subscribe-button">Subscribe</button>
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Modal
