import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../fireBase.config';
import './Login.css';
import { TravelContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';




firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [passwordMsg, setPasswordMsg] = useState("");
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
    });
    const { state2 } = useContext(TravelContext);
    const [loggedInUser, setLoggedInUser] = state2;

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/hotel" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoUrl, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoUrl,
                };
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }
    
    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then(res => {
            const { displayName, photoUrl, email } = res.user;
                const signedInFbUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoUrl,
                };
                setUser(signedInFbUser);
                setLoggedInUser(signedInFbUser);
                history.replace(from);
            
          }).catch(err => {
            console.log(err);
            console.log(err.message);
          });
    }
    
    

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    photo: '',
                    email: '',
                    password: '',
                    error: '',
                    success: false,
                };
                setUser(signedOutUser)
            })
            .catch(err => {

            })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        };
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordNeedNum = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordNeedNum
        };
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        console.log(user.email, user.password)
        if (user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    // newUserInfo.error = '';
                    // newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    updateUserName(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    // newUserInfo.error = error.message;
                    // newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        };

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    // newUserInfo.error = '';
                    // newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('sign in user info', res.user);
                })
                .catch(function (error) {
                    const newUserInfo = { ...user };
                    // newUserInfo.error = error.message;
                    // newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(() => {
            console.log('user name updated successfully')
        }).catch(error => {
            console.log(error)
        });

    }

    const confirmPassword = (e) => {
        if (e.target.value === user.password) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = true;
            setUser(newUserInfo);
            setPasswordMsg("");
        }
        else {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = false;
            setUser(newUserInfo);
            setPasswordMsg("Password did not match !")
        }
    };

    return (
        <div>
            <div className="Form">
                <div>
                    {newUser ? <h3>Create an account</h3> : <h3>Log In</h3>}
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        {
                            newUser && <input className="form-input" type="text" name="name" onBlur={handleBlur} placeholder="Username" required />
                        }
                        <br />
                        <input className="form-input" type="text" name="email" onBlur={handleBlur} placeholder="Email" required />
                        <br />
                        <input className="form-input" type="password" name="password" onBlur={handleBlur} placeholder="Password" required />
                        <br />
                        {
                            newUser && <> <input
                                className="form-input" type="password" name="conform password"
                                onBlur={confirmPassword} placeholder="Confirm Password" required />
                                {passwordMsg.length > 0 ? <small style={{
                                    color: 'red', marginLeft: '45px'
                                }}>{passwordMsg} </small> :
                                    <small></small>}
                            </>}
                        <br />
                        <input className="submit" type="submit" value={newUser ? 'Create an account' : 'Login'} />
                    </form>
                </div>
                {/* <p style={{color: 'red'}}>{user.error}</p>
                {user.success && <p style={{color: 'green'}}>user {newUser ? 'created' : 'logged in'} successfully</p>} */}

                <div style={{ textAlign: "center" }}>
                    {
                        newUser
                            ?
                            <> <span >Already have an account?</span>
                                <button className="last-button" type="button" style={{ color: 'orange' }}
                                    onClick={() => setNewUser(!newUser)}>Login</button> </>
                            :
                            <> <span >Don't have an account?</span> <button className="last-button" type="button" style={{ color: 'orange' }}
                                onClick={() => setNewUser(!newUser)}>Create an account</button> </>
                    }
                </div>

            </div>

            <br />
            <span className="span-or"><hr className="hori-line"/>OR<hr className="hori-line"/></span>
            <br />
            {user.isSignedIn ? <button className="google-button" onClick={handleSignOut} >Signout</button> :
                <button  className="google-button" onClick={handleSignIn} > <span className="img-position"><img width="12%" src="https://i.imgur.com/17voWeX.png" alt=""/></span><span className="text-position">Continue with Google</span></button>
            }
            <br/>
            <button onClick={handleFbSignIn} className="fb-button"> <span className="img2-position"><img width="12%" src="https://i.imgur.com/BFWzeUt.png" alt=""/></span><span className="text2-position">Continue with Facebook</span></button>
            {
                user.isSignedIn && <p>Welcome, {user.name}</p>
            }
        </div>
    );
};

export default Login;
