import React, { useState, useEffect } from 'react';
import axios from '../axios';

const Scholarships = () => {

    const [CurrentUser, setCurrentUser] = useState(undefined);
    const [allscholarships, setallscholarships] = useState([]);

    const axiosCall = () => {
        axios.get('/scholarships').then((res) => {
            setCurrentUser(res.data.CurrentUser);
            setallscholarships(res.data.allscholarships);
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

    const axiosPostRequest = () => {
        axios.post("/getFilters", {
            authority: document.getElementById("authority").value,
            category: document.getElementById("category").value,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            setCurrentUser(res.data.CurrentUser);
            setallscholarships(res.data.allscholarships);
        })
    }

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
                                <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" name="signin" onClick={(e) => {
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

            <div className="card mt-3 mx-auto"
                style={{ height: '50px', width: '700px', borderRadius: '25px', textAlign: 'center', fontSize: '28px', paddingTop: '10px' }}>
                All Scholarships
            </div>

            <div className="modal-body row mt-2">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h5 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '300' }}> Filters </h5>
                        </div>
                        <div className="card-body">
                            <form>
                                <label>Authority : </label>
                                <select className="browser-default custom-select mb-4" id="authority" name="authority" defaultValue={'All'}>
                                    <option value="" disabled>Choose option</option>
                                    <option value="Government">Government</option>
                                    <option value="Ngo">NGO</option>
                                    <option value="Private">Private</option>
                                </select>

                                <label>Category : </label>
                                <select className="browser-default custom-select mb-4" id="category" name="category" defaultValue={'All'}>
                                    <option value="" disabled>Choose option</option>
                                    <option value="All">General</option>
                                    <option value="ST">ST</option>
                                    <option value="SC">SC</option>
                                    <option value="OBC">OBC</option>
                                    <option value="EBC">EBC</option>
                                </select>

                                <label>Region : </label>
                                <select className="browser-default custom-select mb-4" id="region" defaultValue={'1'}>
                                    <option value="" disabled>Choose option</option>
                                    <option value="1">India</option>
                                    <option value="2">Maharashtra</option>
                                    <option value="3">Karnataka</option>
                                    <option value="4">Uttar Pradesh</option>
                                    <option value="5">West Bengal</option>
                                </select>

                                <label>Highest Qualification : </label>
                                <select className="browser-default custom-select mb-4" id="qualification" defaultValue={'1'}>
                                    <option value="" disabled>Choose option</option>
                                    <option value="1">10</option>
                                    <option value="2">12</option>
                                    <option value="3">Graduate</option>
                                </select>


                                <button className="btn btn-outline-primary btn-block" id="submitfilter" style={{ borderRadius: '25px' }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        axiosPostRequest();
                                    }}>Apply</button>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row mx-auto" id="scholardetails">

                        {
                            allscholarships?.map((scholarship) => {
                                return (
                                    <div className="col-sm-6 mt-2">
                                        <div className="card ml-auto">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {scholarship.sname}
                                                </h5>
                                                <i className="fas fa-landmark prefix mr-1"></i>
                                                <span className="card-text">
                                                    {scholarship.authority}
                                                </span>
                                                <br />

                                                <a href={`viewscholarship/${scholarship.id}`} className="btn btn-sm btn-outline-primary mt-3"
                                                    style={{ borderRadius: '25px' }}>
                                                    Check this
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Scholarships;