/** @format */

import Login from "@/components/Login";
import { addDoc, collection, getDocs, query, doc, updateDoc, where, setDoc } from "firebase/firestore/lite";
import Head from "next/head";

import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../../lib/firebase";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

// import sgMail from '@sendgrid/mail';
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('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');
const index = () => {
    const username = useRef()
    const password = useRef();
    const authtokenref = useRef();
    const [emailauthtoken, setemailauthtoken] = useState()
    const [usernameemail, setusernameemail] = useState()
    const playername = useRef();
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(false)
    const [submitting, setsubmitting] = useState(false);

    const router = useRouter();
    const [emailVerificationBannerActive, setemailVerificationBannerActive] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault();
        setloading(true);
        let generatedauthtoken = uuidv4();
        setemailauthtoken(generatedauthtoken);
        const data = {
            Name: playername.current.value,
            Email: username.current.value,
            Password: password.current.value,
            authtoken: generatedauthtoken
        };
        setusernameemail(username.current.value)
        try {
            // Check if a player with the same email already exists
            const q = query(collection(db, "players"), where("Email", "==", data.Email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert("A player with this email already exists.");
                setloading(false);
                return;
            }

            // Add the new player data
            const docRef = await addDoc(collection(db, "players"), data);
            let toEmail = username.current.value;
            let subject = "auth token"
            let htmlContent = 'AUTH Token: ' + generatedauthtoken;
            try {
                const response = await fetch('/api/sendemail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ toEmail, subject, htmlContent }),
                });

                if (!response.ok) {
                    throw new Error('Failed to send email');
                }

                const data = await response.json();
                // alert(data.message); // Display success message
                setloading(false);
            } catch (error) {
                console.error('Error:', error.message);
                setError('Failed to send email');
                setloading(false);
            }


            setemailVerificationBannerActive(true)
            alert("Registration successful");
            setloading(false);
            localStorage.setItem('USERNAME_SET', docRef.id);
            localStorage.setItem('USERLOGGED_IN', true);
        } catch (error) {
            console.error("Error: ", error);
            setloading(false);
        }
    };

    function handleVerification(e) {
        e.preventDefault();
        let email = usernameemail;
        let authToken = emailauthtoken;

        console.log(email);
        console.log(authToken);
        // Assuming you have Firebase Firestore initialized as `db`
        const playersRef = collection(db, 'players');
        const q = query(playersRef, where('Email', '==', email), where('authtoken', '==', authToken));

        getDocs(q)
            .then((querySnapshot) => {
                if (querySnapshot.size > 0) {
                    // Loop through each document in the query result
                    querySnapshot.forEach(async (doc) => {
                        const playerId = doc.id; // Get the document ID
                        const playerData = doc.data(); // Get the document data
                        verifyUserAndSendAToLogin(playerId)
                        // Prepare data to update (in this case, setting verified = true)



                    });
                } else {
                    console.log('No player found with matching email and auth token');
                }
            })
            .catch((error) => {
                console.error('Error querying players collection:', error);
            });
    }
    const verifyUserAndSendAToLogin = async (playerId) => {
        const dataToUpdate = {
            verified: true,
        }
        try {
            // Update the document with merge: true to only update the specified fields
            await setDoc(doc(db, 'players', playerId), dataToUpdate, { merge: true });

            // Notify user and redirect to profile page
            alert('Player verified successfully');
            router.push(`/players/profile/${playerId}`);
        } catch (error) {
            console.error('Error updating document:', error);
        }
    }
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            {
                emailVerificationBannerActive == false ?
                    <section className='h-screen'>
                        <div className="page-header min-vh-75">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                        <div className="card card-plain mt-1">
                                            <div className="card-header pb-0 text-left bg-transparent">
                                                <h3 className="font-weight-bolder text-info text-gradient">Register</h3>
                                                <p className="mb-0">Enter your Name, email and password to register</p>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={(e) => handleRegister(e)}>
                                                    <label>Name</label>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" pattern="[A-Z a-z.]*"
                                                            title="Only alphabets and dots are allowed. Numbers are not allowed." placeholder="Name" aria-label="Email" aria-describedby="email-addon" ref={playername} required />
                                                    </div>
                                                    <label>Email</label>
                                                    <div className="mb-3">
                                                        <input type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                                            title="Please enter a valid email address." className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" ref={username} required />
                                                    </div>
                                                    <label>Password</label>
                                                    <div className="mb-3">
                                                        <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" ref={password} required />
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0 d-flex align-items-center justify-content-center">Register
                                                            {loading && (
                                                                <div
                                                                    className="spinner-border text-white d-block ms-3"
                                                                    role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <p className="mb-0 card-header bg-transparent">Already registered? <Link className="link" href={"/players/login"}>Login</Link></p>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                            <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: "url('/assets/img/curved-images/curved6.jpg')" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <section className='h-screen'>
                        <div className="page-header min-vh-75">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                        <div className="card card-plain mt-1">
                                            <div className="card-header pb-0 text-left bg-transparent">
                                                <h3 className="font-weight-bolder text-info text-gradient">Verification</h3>
                                                <p className="mb-0">Please check your email for verification code.</p>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={(e) => handleVerification(e)}>

                                                    <label>AUTH token</label>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" placeholder="authtoken" aria-describedby="authtoken-addon" ref={authtokenref} required />
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0 d-flex align-items-center justify-content-center">Register
                                                            {loading && (
                                                                <div
                                                                    className="spinner-border text-white d-block ms-3"
                                                                    role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <p className="mb-0 card-header bg-transparent">Already registered? <Link className="link" href={"/players/login"}>Login</Link></p>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                            <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: "url('/assets/img/curved-images/curved6.jpg')" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </>
    );
};

export default index;
