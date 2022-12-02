import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

import '../styles/Home.css';
import '../styles/Main.css';
import '../styles/OldHome.css';


const ViewScholarship = () => {

    const { id } = useParams();

    const [CurrentUser, setCurrentUser] = useState(undefined);
    const [scholarship, setScholarship] = useState([]);

    const axiosCall = () => {
        axios.get(`/viewscholarship/${id}`).then((res) => {
            setCurrentUser(res.data.CurrentUser);
            setScholarship(res.data.scholarship);
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

            <div className="card mx-auto col-lg-10 mt-4" style={{ alignItems: 'center', padding: '20px' }}><br />
                <h2 id="name" style={{ fontSize: '34px' }}>
                    {scholarship[0]?.sname}
                </h2>
                <hr style={{ border: '1px solid', width: '800px', marginTop: '-3px' }} /><br />
                <div className="card-body" id="1">
                    <h4>About Scholarship</h4>
                    <hr style={{ border: '0.5px solid', width: '800px', marginTop: '-3px', color: 'gray' }} />
                    <br />
                    <div>
                        <h4>Authority</h4>
                        <p> {scholarship[0]?.authority} </p>
                        <hr style={{ border: '0.5px solid', width: '800px', marginTop: '-3px', color: 'gray' }} />
                        <br />
                    </div>
                    <div>
                        <h4>Department Name</h4>
                        <p> {scholarship[0]?.aname}</p>
                        <hr style={{ border: '0.5px solid', width: '800px', marginTop: '-3px', color: 'gray' }} />
                        <br />
                    </div>
                    <div>
                        <h4>Eligibility Criteria</h4>
                        <i className="fas fa-arrow-right prefix mr-1"></i>
                        &nbsp;
                        <span>Category : {scholarship[0]?.category} </span>
                        <br />
                        <i className="fas fa-arrow-right prefix mr-1"></i>
                        &nbsp;
                        <span>
                            Minimum Qualification : {scholarship[0]?.spass}
                        </span>
                        <br />
                        <i className="fas fa-arrow-right prefix mr-1"></i>
                        &nbsp;
                        <span>Cutoff : {scholarship[0]?.cutoff} </span>
                        <br />
                        <i className="fas fa-arrow-right prefix mr-1"></i>&nbsp;
                        <span>Region : {scholarship[0]?.state}</span>
                        <br />
                        <i className="fas fa-arrow-right prefix mr-1"></i>&nbsp;
                        <span>Applicable Branch : {scholarship[0]?.applbranch} </span>
                        <br /><i className="fas fa-arrow-right prefix mr-1"></i>&nbsp;
                        <span>Income Limit : {scholarship[0]?.incomelimit} </span>
                        <br /><br />
                        <hr style={{ border: '0.5px solid', width: '800px', marginTop: '-3px', color: 'gray' }} /><br />
                    </div>
                    <div>
                        <h4>Benefits</h4>
                        <p> {scholarship[0]?.benefit} </p>
                        <hr style={{ border: '0.5px solid', width: '800px', marginTop: '-3px', color: 'gray' }} />
                        <br /></div>
                    <div>
                        <h4>Renewal Policy</h4>
                        <div dangerouslySetInnerHTML={{ __html: scholarship[0]?.renewpolicy }} />

                        <hr style={{ border: '0.5px solid', width: '800px', marginTop: '-3px', color: 'gray' }} />
                        <br />
                    </div>
                    <div>
                        <h4>Documents Required</h4>
                        <div dangerouslySetInnerHTML={{ __html: scholarship[0]?.docrequired }} />
                        <hr style={{ border: '0.5px solid', width: '800px', marginTop: '-3px', color: 'gray' }} />
                        <br />
                    </div>
                </div>

                <div className="modal fade" id="modalRegisterForm" tabIndex="-1" role="dialog"
                    aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Check Eligibility</h4>
                                <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <form action="/checkEligibility" method="post">
                                <div className="modal-body mx-3">
                                    <div className="md-form mb-4">
                                        <input type="text" id="state" className="form-control validate"
                                            data-toggle="tooltip" data-placement="bottom"
                                            title="Default is India" name="state" />
                                        <label data-error="wrong" data-success="right"
                                            htmlFor="state">State</label>
                                    </div>
                                    <div className="md-form mb-3">
                                        <input type="number" id="income" className="form-control validate" name="income" />
                                        <label data-error="wrong" data-success="right"
                                            htmlFor="income">Income</label>
                                    </div>
                                    <div className="md-form mb-3">
                                        <select className="browser-default custom-select mb-3" id="qualification" name="qualification" defaultValue={''}>
                                            <option value="" disabled>Choose qualification</option>
                                            <option value="10">10</option>
                                            <option value="12">12</option>
                                            <option value="Graduate">Graduate</option>
                                        </select>
                                    </div>
                                    <div className="md-form mb-3">
                                        <input type="text" id="Percentage" className="form-control validate" name="percentage" />
                                        <label data-error="wrong" data-success="right"
                                            htmlFor="Percentage">Percentage</label>
                                    </div>
                                    <div className="md-form mb-3">
                                        <select className="browser-default custom-select mb-3" id="category" name="category" defaultValue={''}>
                                            <option value="" disabled>Category</option>
                                            <option value="SC">SC</option>
                                            <option value="ST">ST</option>
                                            <option value="EBC">EBC</option>
                                            <option value="OBC">OBC</option>
                                            <option value="General">General</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    <button className="btn btn-md btn-outline-primary mt-3" type="submit" value="submit"
                                        style={{ borderRadius: '25px', width: '120px' }}
                                        id="checkeligi">Check</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="row">
                    <a href={scholarship[0]?.link} id="visitsite" className="btn btn-md btn-outline-primary mt-3 float-right" style={{ borderRadius: '25px', marginLeft: '50px' }}>Visit Site</a>
                </div>
            </div>
        </>
    )
}

export default ViewScholarship;