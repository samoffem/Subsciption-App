import React, {useState, useEffect} from 'react'

import ChannelService from '../../services/Channels'
import SubscriptionService from '../../services/Subscription'
import AuthenticationService from '../../services/Authentication'
import {connect} from 'react-redux'
import './Dashboard.css'
import img_1 from '../../assets/img-1.svg'
import Modal from '../Modal/Modal'


function Dashboard({userId, token, useremail}) {
   
    const [open, setOpen] = useState(false)
    const [channels, setChannels] = useState([])
    const [subscriptions, setSubscriptions] = useState([])

    const removeSubscription = (ChannelId, UserId)=>{
        console.log("Channelid",ChannelId,"UserId", UserId)
        SubscriptionService.removeSubscription({ChannelId, UserId})
        .then((res)=>{
            console.log(res)
            //let newSubscriptions = subscriptions
        })
    }


   
    
    useEffect(()=>{
        ChannelService.viewChannels()
        .then((res)=>{
            setChannels(res.data)
        })
    }, [])
    useEffect(()=>{
        SubscriptionService.getSubscription({params:{UserId:userId}})
        .then(res=>setSubscriptions(res.data))
    },[])
   
    return (
        <div className="dashboard-container">
            <Modal open ={open} 
            setOpen={setOpen} 
            channels={channels} 
            userId={userId} 
            subscriptions={subscriptions} 
            setSubscriptions={setSubscriptions} />
            <h4>Dashboard</h4>
            
                <div className="dashboard-header">
                    <div className="left-header">
                        <h2>Welcome {useremail}</h2>
                        <p>Please subscribe to any Pet Update channel you like</p>
                        <button onClick={()=>setOpen(true)} className="view-channels-button">View Channel List</button>
                    </div>
                    <div className="img-wrapper">
                        <img src={img_1} width="250px" height="200px" />
                    </div>
                </div>
           
            
            <div className="dashboard-body">
                <p>You are currently subscribed to {subscriptions.length} channels</p>

                <div className="sub-channels-container">
                    {
                        subscriptions.map((sub)=>{
                            for(let i= 0; i<channels.length; i++){
                                if(sub.ChannelId === channels[i].id)
                                    return (
                                        <div className="sub-channel-wrapper" key={channels[i].id}>
                                            <p>{channels[i].name}</p>
                                            <button onClick={()=> removeSubscription(channels[i].id, userId)} className="unsubscribe-button">Unsubscribe</button>
                                        </div>
                                    )

                            }
                            
                        })
                    }
                </div>    
            </div>
            
        </div>
    )
}

const mapStateToProps = (state)=>{
    console.log(state)
    return{
        userId: state.user.id,
        useremail: state.user.email,
        token: state.token
    }
}


export default connect(mapStateToProps)(Dashboard)
