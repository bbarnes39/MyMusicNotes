import React, { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const DisplayAll = (props) => {

    const { trackReview, setTrackReview } = props

    useEffect(() => {
        axios
            .get('http://localhost:8000/home')
            .then((res) => {
                setTrackReview(res.data.trackReviews)
                console.log(res.data.trackReviews)
            })
            .catch((err) => { console.log(err) })
    }, [])

    return (
        <div>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between m-3">
                    <h2 className="m-3 align-self-center">All Reviews</h2>
                    <Link to={'/songs/newreview'} className="btn btn-info m-5">Add a new review!</Link>
                </div>
                <table className="table table-striped table-bordered table-success mx-auto p-3">
                    <thead>
                        <tr className="bg-secondary">
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Genre</th>
                            <th>Score</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            trackReview.map((trackReview) => (
                                <tr key={trackReview._id}>
                                    <td> {trackReview.title} </td>
                                    <td> {trackReview.artist} </td>
                                    <td> {trackReview.album} </td>
                                    <td> {trackReview.genre} </td>
                                    <td> {trackReview.score} </td>
                                    <td className="d-flex justify-content-evenly">
                                        <Link to={`/songs/${trackReview._id}`} className="btn btn-primary">Details</Link>
                                        <p>|</p>
                                        <Link to={`/songs/${trackReview._id}/editreview`} className="btn btn-warning">Edit</Link>
                                        <p>|</p>
                                        <Link to={`/songs/${trackReview._id}/delete`} className="btn btn-danger">Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )

}

export default DisplayAll