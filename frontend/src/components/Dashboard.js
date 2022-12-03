import React from 'react';
import axios from '../axios';

const Dashboard = () => {

    const axiosPostRequest = () => {
        axios.post("/uploaddata", {
            id: document.getElementById("id").value,
            sname: document.getElementById("sname").value,
            authority: document.getElementById("authority").value,
            aname: document.getElementById("aname").value,
            spass: document.getElementById("spass").value,
            cutoff: document.getElementById("cutoff").value,
            state: document.getElementById("state").value,
            applbranchtotal: document.getElementById("applbranchtotal").value,
            applbranch: document.getElementById("applbranch").value,
            incomelimit: document.getElementById("incomelimit").value,
            benefit: document.getElementById("benefit").value,
            link: document.getElementById("link").value,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((res) => {
            window.location.href = '/';
        })
    }

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '20px', fontWeight: '500' }}> ADMIN DASHBOARD  <br /><br /> </h1>

            <form className="col-sm-6 mx-auto">
                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input type="text" id='id' className="form-label-dashboard" name="id" aria-describedby="emailHelp" placeholder="Enter scholarship name" />

                </div>

                <div className="form-group">
                    <label htmlFor="sname">Scholarship name</label>
                    <input id="sname" type="text" className="form-control" name="sname" aria-describedby="emailHelp" placeholder="Enter scholarship name" />

                </div>
                <div className="form-group">
                    <label htmlFor="authoritytype">Authority type</label>
                    <input id="authority" type="text" className="form-control" name="authority" aria-describedby="emailHelp" placeholder="Enter authority" />

                </div>

                <div className="form-group">
                    <label htmlFor="Authorityname">Authority name</label>
                    <input id="aname" type="email" className="form-control" name="aname" aria-describedby="emailHelp" placeholder="Enter authority name" />

                </div>

                <div className="form-group">
                    <label htmlFor="spass">Passing  Standard</label>
                    <input id="spass" type="text" className="form-control" name="spass" aria-describedby="emailHelp" placeholder="Enter passing standard" />

                </div>

                <div className="form-group">
                    <label htmlFor="cutoff">Cutoff</label>
                    <input id="cutoff" type="text" className="form-control" name="cutoff" aria-describedby="emailHelp" placeholder="Enter cutoff" />

                </div>

                <div className="form-group">
                    <label htmlFor="region">Enter region</label>
                    <input id="state" type="text" className="form-control" name="state" aria-describedby="emailHelp" placeholder="Enter region" />

                </div>

                <div className="form-group">
                    <label htmlFor="applbranchtotal">Total Applicable Branch</label>
                    <input id="applbranchtotal" type="text" className="form-control" name="applbranchtotal" aria-describedby="emailHelp" placeholder="Enter total applicable branch" />

                </div>

                <div className="form-group">
                    <label htmlFor="applbranch">Applicable Branch</label>
                    <input id="applbranch" type="text" className="form-control" name="applbranch" aria-describedby="emailHelp" placeholder="Enter applicable branch" />

                </div>

                <div className="form-group">
                    <label htmlFor="incomelimit">Income Limit</label>
                    <input id="incomelimit" type="text" className="form-control" name="incomelimit" aria-describedby="emailHelp" placeholder="Enter Income limit" />

                </div>

                <div className="form-group">
                    <label htmlFor="benefit">Benefit</label>
                    <input id="benefit" type="text" className="form-control" name="benefit" aria-describedby="emailHelp" placeholder="Enter Benefit amount" />

                </div>

                <div className="form-group">
                    <label htmlFor="link">Link to apply</label>
                    <input id="link" type="text" className="form-control" name="link" aria-describedby="emailHelp" placeholder="Enter link" />

                </div>

                <button className="btn btn-outline-success mb-5 mx-auto" onClick={(e) => {
                    e.preventDefault();
                    axiosPostRequest();
                }} >Submit</button>
            </form>
        </>
    )
}

export default Dashboard;