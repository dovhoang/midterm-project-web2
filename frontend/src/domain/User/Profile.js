import React, { useState, useEffect } from 'react';
import { getUserProfile } from './apiUser'
import './Profile.css'

const Profile = (props) => {
    const [profile, setProfile] = useState('')
    const getProfile = () => {
        console.log(props.match.params.userId)
        getUserProfile(props.match.params.userId)
            .then(res => {
                console.log(res.data)
                setProfile(res.data);
            })
    }

    useEffect(() => {
        getProfile();
    }, [])
    return (
        <div>
            <div className="profile-background" >
                <div className='content'>
                    <div className='avatar-round'>
                        <img src="../../avatar.jpg" alt="" className="avatar" />
                    </div>
                    <h3 className="name">{profile.name}</h3>
                    <div className='row'>
                        <div className="col-md-6">
                            <div >Username:</div>
                            <div >Email:</div>
                            <div >Team:</div>
                        </div>
                        <div className="col-md-6">
                            <div> {profile.username}</div>
                            <div> {profile.email}</div>
                            <div> {profile.team}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Profile;