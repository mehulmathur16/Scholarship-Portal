import React, { useState, useEffect } from 'react';
import axios from '../axios';

import '../styles/Home.css';
import '../styles/Main.css';
import '../styles/OldHome.css';

const Scholarships = () => {

    const [CurrentUser, setCurrentUser] = useState(undefined);
    const [allscholarships, setallscholarships] = useState([]);

    const axiosCall = () => {
        axios.get('/scholarships').then((res) => {
            setCurrentUser(res.data.CurrentUser);
            setallscholarships(res.data.allscholarships);
        })
    }

    useEffect(() => {
        axiosCall();
    }, [])

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
                        <form className="form-inline my-2 my-lg-0 ml-auto" method="post" action="/login">
                            <div className="md-form my-0">
                                <input className="form-control mr-sm-2" type="email" placeholder="Enter Email-id" name="username" required />&nbsp; &nbsp;
                                <input className="form-control mr-sm-2" type="password" placeholder="Enter password" name="password" required />&nbsp;
                                <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" type="submit" name="signin" >Sign In</button>
                                <a className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" href="/signup">Register</a>
                            </div>
                        </form>
                    ) : (
                        <div style={{ textAlign: 'center' }} className="form-inline my-2 my-lg-0 ml-auto">
                            <button className="btn btn-outline-white btn-md my-2 my-sm-0 ml-3" id="loggingout"><a href="/logout">Log Out</a></button>
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
                            <form action="/getFilters" method="post">
                                <div className="mb-5"><label>Authority : </label>
                                    <div style={{ float: 'right', marginRight: '25px' }}>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="Government" name="authority"
                                                value="Government" />
                                            <label className="custom-control-label" htmlFor="Government">Government</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="Ngo" name="authority" value="Ngo" />
                                            <label className="custom-control-label" htmlFor="Ngo">NGO</label>
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="Private" name="authority" value="Private" />
                                            <label className="custom-control-label" htmlFor="Private">Private</label>
                                        </div>
                                    </div>
                                </div>

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
                                    type="submit">Apply</button>

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