/** @format */

import Login from "@/components/Login";
import { collection, getDocs } from "firebase/firestore/lite";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../../lib/firebase";

const index = () => {
    const username = useRef()
    const password = useRef();
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(false)
    const router = useRouter();
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            const querySnapshot = await getDocs(collection(db, "players"));
            const playersList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPlayers(playersList);
        };

        fetchPlayers();
    }, []);
    const handleLogin = (e) => {
        setloading(true)
        e.preventDefault();
        let foundPlayer = null;
        let emailpresent = false;
        players?.map((p) => {
            if (p?.Email === username.current.value) {
                emailpresent = true;
                foundPlayer = p;
            }
        })
        if (emailpresent == false) {
            alert('Email not found');
            setloading(false)
        } else if (password.current.value == foundPlayer?.Password) {
            setloading(false)
            alert('Login Successful!');
            localStorage.setItem('USERNAME_SET', foundPlayer?.id);
            localStorage.setItem('USERLOGGED_IN', true);
            router.push(`/players/profile/${foundPlayer?.id}`);
        } else {
            alert('wrong password');
            setloading(false)

        }

    }
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <section className='h-screen'>
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-1">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                                        <p className="mb-0">Enter your email and password to login in</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={(e) => handleLogin(e)}>
                                            <label>Email</label>
                                            <div className="mb-3">
                                                <input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" ref={username} required />
                                            </div>
                                            <label>Password</label>
                                            <div className="mb-3">
                                                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" ref={password} required />
                                            </div>
                                            {/* <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="rememberMe" checked="" />
                                                    <label className="form-check-label" for="rememberMe">Remember me</label>
                                                </div> */}
                                            <div className="text-center">
                                                <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0 d-flex align-items-center justify-content-center">Sign in
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
        </>
    );
};

export default index;
