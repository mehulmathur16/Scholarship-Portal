import React, { useEffect, useState } from 'react';
import axios from '../axios';

import '../styles/Home.css';
import '../styles/Main.css';

const Home = () => {

    const [CurrentUser, setCurrentUser] = useState(undefined);
    const [scholarships, setScholarships] = useState([]);
    const [newsUpdates, setnewsUpdates] = useState('');

    const axiosCall = () => {
        axios.get('/').then((res) => {
            setCurrentUser(res.data.CurrentUser);
            setScholarships(res.data.scholarships);
        })
    }

    const getCurrentLoggedInUser = () => {
        axios.get("/getCurrentLoggedInUser").then((res) => {
            setCurrentUser(res.data.CurrentUser);
        })
    }

    const getNewsUpdates = () => {
        axios.get("/newsupdate").then((res) => {
            var allUpdates = JSON.stringify(res.data.data);
            var updates = allUpdates.split("     ");

            var res = "";

            for (var i = 0; i < updates.length; i++) {
                updates[i].trim();
                var s2 = updates[i].replaceAll('\\n', '');
                var tag = "<p style=\"color:red\">";
                var update = tag.concat(s2);
                update.concat("</p>");
                res += update;
            }

            setnewsUpdates(res);
        })
    }

    useEffect(() => {
        axiosCall();
        getCurrentLoggedInUser();
        getNewsUpdates();
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


            <section className="banner-area relative" id="home" >
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active carousel-style">
                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                            <div className="banner-content col-lg-02 col-md-02 justify-content-center"><br />
                                <a href="/scholarships" className="primary-btn squire text-uppercase mt-10" style={
                                    {
                                        float: 'right', marginRight: '9rem',
                                        marginTop: '1rem',
                                    }
                                }> &nbsp; Search scholarships &nbsp; </a>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </section>


            <br />

            <div><section>
                <div className="row mb-5">
                    <div className="card mb-3 col-lg-3 col-md-4 mx-auto" style={{ maxWidth: '18rem' }}>
                        <div className="card-header text-white bg-dark" style={{
                            textAlign: 'center', paddingRight: '10px', paddingLeft: '10px', paddingTop: '5px', paddingBottom: '3px', borderRadius: '8px', backgroundColor: '#485461',
                            backgroundImage: 'linear-gradient(315deg, #485461 0%, #28313b 74%)'
                        }}>
                            <h4 className="mx-auto" style={{ color: 'white' }}>News Updates</h4>
                        </div>
                        <div className="card-body">
                            <marquee behaviour="scroll" direction="left" id="1" dangerouslySetInnerHTML={{ __html: newsUpdates }}></marquee>
                        </div>
                    </div>

                    <div className="container col-lg-7 col-md-10 mx-auto" style={{ marginLeft: '-60px' }}>
                        <div style={{
                            backgroundColor: '#202020', textAlign: 'center', paddingRight: '10px', paddingLeft: '10px', paddingTop: '5px', paddingBottom: '3px', borderRadius: '8px', backgroundColor: '#485461',
                            backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)"
                        }}>
                            <h4 className="mx-auto" style={{ color: 'white' }}>Latest Scholarships</h4>
                        </div>
                        <div>
                            <div className="row mt-3" id="scholardetails">
                                {scholarships?.map((scholarship) => {
                                    return (
                                        <div className="col-sm-6 mt-2" key={scholarship.id}>
                                            <div className="card ml-auto">
                                                <div className="card-body">
                                                    <h5 className="card-title"> {scholarship.sname} </h5><i
                                                        className="fas fa-landmark prefix mr-1"></i><span
                                                            className="card-text"> {scholarship.authority} </span><br /><a
                                                                href={`viewscholarship/${scholarship.id}`}
                                                                className="btn btn-sm btn-outline-primary mt-3"
                                                                style={{ borderRadius: '25px' }}>Check this</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
            <br />
        </ >
    )

}

export default Home;

