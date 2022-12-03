import React from 'react'

const Chatbot = () => {
    return (
        <>
            <div
                className="bg-image"
                style={{
                    backgroundImage: "url('https://sysquoinnovation.com/wp-content/uploads/2022/02/1-4dpDj2l8NJRHCQdx38dxIQ.png')",
                    height: 'fit-content'
                }}
            >
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a href="/" className="nav-link active">Home</a>
                    </li>
                </ul>
                <br />
                <div className="m-4">
                    <p className="btn btn-primary btn-lg">Some Common Asked Questions:-</p>
                    <br />
                    <span className="badge bg-primary">What types of scholarships are available?</span>
                    <span className="badge bg-secondary">What are my chances of gaining a scholarship?</span>
                    <span className="badge bg-success">Can I apply for a scholarship before being accepted into a university?</span>
                    <span className="badge bg-danger">Can I apply for a scholarship before being accepted into a college?</span>
                    <span className="badge bg-warning text-dark">How do I apply for international scholarships?</span>
                    <span className="badge bg-info text-dark">When is the best time to apply for study abroad scholarships?</span>
                    <span className="badge bg-secondary">What is lowest scholarship amount to a student is provided by any organization?</span>
                    <span className="badge bg-primary">How  many government agencies are providing scholarship?</span>

                </div>

                <iframe width="500" height="490" allow="microphone;" src='<%= process.env.DIALOG_API %>'></iframe>
            </div>
        </>
    )
}

export default Chatbot;