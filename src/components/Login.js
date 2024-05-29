import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/router'

const Login = () => {
    const username = useRef()
    const password = useRef();
    const [error, setError] = useState(null);
    const [loading, setloading] = useState(false)
    const router = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log(uid);
                // ...
            } else {
                console.log("User is signed out");

                // User is signed out
                // ...
            }
        });

        return () => {

        }
    }, [])

    // const handleSubmit = (e) => {
    //     // e.preventDefault()
    //     // // console.log(username.current.value, password.current.value);
    //     // signInWithEmailAndPassword(auth, username.current.value, password.current.value)
    //     //     .then((userCredential) => {
    //     //         // Signed in 
    //     //         const user = userCredential.user;
    //     //         console.log(user);
    //     //     })
    //     //     .catch((error) => {
    //     //         const errorCode = error.code;
    //     //         const errorMessage = error.message;
    //     //     });

    // }
    const handleLogin = async (e) => {
        setloading(true)
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username.current.value, password.current.value);
            const idToken = await userCredential.user.getIdToken();
            // Save token to a cookie for server-side verification
            // document.cookie = `token=${idToken}; path=/`;
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/auth.user
                    const uid = user.uid;
                    console.log(uid);
                    router.push('/')
                    setloading(false)

                    // ...
                } else {
                    // User is signed out
                    // ...
                }
            });
            // router.push('/');
        } catch (error) {
            // setError(error.message
            setloading(false)

            console.log(error.message);
        }
    };

    return (
        <>
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
                                                <input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" ref={username} />
                                            </div>
                                            <label>Password</label>
                                            <div className="mb-3">
                                                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" ref={password} />
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
                                    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: "url('assets/img/curved-images/curved6.jpg')" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login