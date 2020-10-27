import React, { useState, useEffect } from 'react';
import { getUserProfile } from './apiUser'
import UpdateProfile from './UpdateProfile'
import ChangePassword from './ChangePassword'
import './Profile.css'
import { Button } from 'antd'

const Profile = (props) => {
    const [profile, setProfile] = useState('');
    const [showFormUpdateProfile, setShowFormUpdateProfile] = useState(false);
    const [showFormChangePassword, setShowFormChangePassword] = useState(false)
    const getProfile = () => {
        console.log(props.match.params.userId)
        getUserProfile(props.match.params.userId)
            .then(res => {
                console.log(res.data)
                setProfile(res.data);
            })
    }
    const handleClickEditProfle = () => {
        setShowFormUpdateProfile(true);
        setShowFormChangePassword(false);
    }
    const handleClickChangePassword = () => {
        setShowFormChangePassword(true);
        setShowFormUpdateProfile(false);
    }

    const handleCloseFormEditProfile = () => {
        setShowFormUpdateProfile(false);
    }
    const handleCloseFormChangePassword = () => {
        setShowFormChangePassword(false)
    }

    useEffect(() => {
        getProfile();
    }, [showFormUpdateProfile, showFormChangePassword])
    return (
        <div className="container">
            <div className="profile-background" >
                <div className="row">
                    <div className="col-md-4 d-flex justify-content-center">
                        <div className='avatar-round'>
                            <img src="../../avatar.jpg" alt="" className="avatar" />
                        </div>
                    </div>
                    <div className="col-md-8 ">
                        <div className="control">
                            <Button onClick={handleClickEditProfle}>Eidt profile</Button>
                            <Button onClick={handleClickChangePassword}>Change password</Button>
                        </div>
                        <div className='info'>
                            <div className="name">{profile.name}</div>
                            <div className='row'>
                                <div className="col-md-8"> Email: {profile.email}</div>
                                <div className="col-md-4"> Team: {profile.team ? profile.team : 'No'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 offset-md-3 mt-3">
                {showFormUpdateProfile && <UpdateProfile user={profile} handleClose={handleCloseFormEditProfile} />}
            </div>
            <div className="col-md-6 offset-md-3 mt-3">
                {showFormChangePassword && <ChangePassword id={profile._id} handleClose={handleCloseFormChangePassword} />}
            </div>


        </div>
    );

}
export default Profile;