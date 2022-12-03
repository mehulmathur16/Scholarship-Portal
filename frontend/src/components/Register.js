import React, { useState, useEffect } from 'react';
import axios from '../axios';

const Register = () => {

    const [CurrentUser, setCurrentUser] = useState(undefined);

    const axiosCall = () => {
        axios.get('/signup').then((res) => {
            setCurrentUser(res.data.CurrentUser);
        })
    }

    const axiosPostRequest = () => {
        axios.post("/register", {
            name: document.getElementById("name").value,
            id: document.getElementById("email").value,
            category: document.getElementById("category").value,
            ssc: document.getElementById("10").value,
            hsc: document.getElementById("12").value,
            graduation: document.getElementById("graduation").value,
            state: document.getElementById("state").value,
            branch: document.getElementById("branch").value,
            income: document.getElementById("income").value,
            password: document.getElementById("password").value,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            if (res.data === "ok") {
                window.location.href = '/';
            }
        })
    }

    const getCurrentLoggedInUser = () => {
        axios.get("/getCurrentLoggedInUser").then((res) => {
            setCurrentUser(res.data.CurrentUser);
        })
    }

    useEffect(() => {
        axiosCall();
        getCurrentLoggedInUser();
    }, [])

    const axiosLoginPostCall = () => {
        axios.post("/login", {
            username: document.getElementById("email").value,
            password: document.getElementById("password").value,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            if (res.data.success) {
                setCurrentUser(res.data.user);
            }
        })
    }

    const axiosLogoutPostCall = () => {
        axios.get('/logout').then(() => {

        })
        setCurrentUser(null);
    }

    return (
        <>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.4/js/mdb.min.js"></script>

            <nav className="navbar navbar-expand-lg navbar-dark text-white main-navbar">
                <a className="navbar-brand" href="/">Indian Development Foundation</a>
                <a className="navbar-brand" href="/dashboard">Dashboard</a>
                <a className="navbar-brand" href="/chatbot">Chatbot</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    {(!CurrentUser) ? (
                        <form className="form-inline my-2 my-lg-0 ml-auto">
                            <div className="md-form my-0">
                                <input id="email" className="form-control mr-sm-2 email-styling" type="email" placeholder="Enter Email-id" name="username" required />&nbsp; &nbsp;
                                <input id="password" className="form-control mr-sm-2 password-styling" type="password" placeholder="Enter password" name="password" required />&nbsp;
                                <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" type="submit" name="signin" onClick={(e) => {
                                    e.preventDefault();
                                    axiosLoginPostCall();
                                }} >Sign In</button>
                                <a className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" href="/signup">Register</a>
                            </div>
                        </form>
                    ) : (
                        <div style={{ textAlign: 'center' }} className="form-inline my-2 my-lg-0 ml-auto">
                            <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" id="loggingout" onClick={(e) => {
                                e.preventDefault();
                                axiosLogoutPostCall();
                            }}><a href="/logout">Log Out</a></button>
                        </div>
                    )}

                </div>
            </nav>

            <div className="col-8 mx-auto mb-3">
                <div className="card mt-3">
                    <div className="card-header text-center">
                        <h4>User SignUp</h4>
                    </div>

                    <form id="login-form" className="form" style={{ marginTop: '20px' }}>
                        <div className="card-body col-9 mx-auto">
                            <div className="row">
                                <div className="col-6 md-form form-sm mb-4">
                                    <input type="text" id="name" className="form-control form-control-sm validate" name="name" required />
                                    <label data-error="wrong" data-success="right" htmlFor="name" className='active'>Enter Name</label>
                                </div>
                                <div className="col-6 md-form form-sm mb-4 float-right">
                                    <input type="email" id="email" className="form-control form-control-sm validate" name="id" required />
                                    <label data-error="wrong" data-success="right" htmlFor="email" className='active'>Enter Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 md-form form-sm mb-4">
                                    <input type="password" id="password" className="form-control form-control-sm validate" name="password" required />
                                    <label data-error="wrong" data-success="right" htmlFor="password" className='active'>Enter Password</label>
                                </div>
                                <div className="col-6 md-form form-sm mb-4">
                                    <input type="number" id="income" className="form-control form-control-sm validate" name="income" required />
                                    <label data-error="wrong" data-success="right" htmlFor="income" className='active'>Enter Income:</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 md-form form-sm mb-4">
                                    <input type="text" id="10" className="form-control form-control-sm validate" name="ssc" />
                                    <label data-error="wrong" data-success="right" htmlFor="10" className='active'>Enter SSC %:</label>
                                </div>
                                <div className="col-6 md-form form-sm mb-4">
                                    <input type="text" id="12" className="form-control form-control-sm validate" name="hsc" />
                                    <label data-error="wrong" data-success="right" htmlFor="12" className='active'>Enter HSC %:</label>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-6 md-form form-sm mb-4">
                                    <input type="text" id="graduation" className="form-control form-control-sm validate" name="graduation" />
                                    <label data-error="wrong" data-success="right" htmlFor="graduation" className='active'>Enter Graduation Pointer:</label>
                                </div>
                                <div className="col-6 md-form form-sm mb-4">
                                    <select className="browser-default custom-select" id="category" name="category" defaultValue={''} style={{ fontSize: '12px' }}>
                                        <option value="">Choose Category</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                        <option value="OBC">OBC</option>
                                        <option value="EBC">EBC</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 md-form form-sm mb-4">
                                    <input type="text" id="branch" className="form-control form-control-sm validate" name="branch" />
                                    <label data-error="wrong" data-success="right" htmlFor="branch" className='active'>Enter Branch:</label>
                                </div>
                                <div className="col-6 md-form form-sm mb-4">
                                    <input type="text" id="state" className="form-control form-control-sm validate" name="state" />
                                    <label data-error="wrong" data-success="right" htmlFor="state" className='active'>Enter State or India(for all states):</label>
                                </div>

                            </div>

                            <div className="row">
                                <button className="btn btn-outline-primary mx-auto" style={{ borderRadius: '25px', width: '30%' }} onClick={(e) => { e.preventDefault(); axiosPostRequest() }}>SignUp</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;