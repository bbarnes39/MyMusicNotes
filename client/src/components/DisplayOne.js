import React, { useState, useEffect } from "react"
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'

const DisplayOne = (props) => {
    const { id } = useParams()

    const navigate = useNavigate()

    const [trackReview, setTrackReview] = useState({})

    useEffect(() => {
        axios
            .get(`http://localhost:8000/songs/${id}`)
            .then((res) => {
                setTrackReview(res.data.trackReview)
                console.log(res.data.trackReview)
            })
            .catch((err) => { console.log(err) })
    }, [])

    const deleteHandler = (id) => {
        axios
            .delete(`http://localhost:8000/songs/${id}/delete`)
            .then((res) => {
                navigate('/home')
            })
            .catch((err) => { console.log(err) })
    }

    return (
        <div>
            <div className="d-flex justify-content-between m-3">
            </div>
            <div className="d-flex justify-content-between">
                <h2 className="m-3 align-self-center">Details about: {trackReview.artist} - {trackReview.title}</h2>
                <Link to={'/home'} className="btn btn-info m-5">Back to home</Link>
            </div>
            <div className="border border-2 m-3 p-3">
                <table className="table table-success m-3 mx-auto">
                    <tbody>
                        <tr className="mb-3">
                            <td className="fw-bold col-4">Title:</td>
                            <td>{trackReview.title}</td>
                        </tr>
                        <tr className="mb-3">
                            <td className="fw-bold col-4">Artist:</td>
                            <td>{trackReview.artist}</td>
                        </tr>
                        <tr className="mb-3">
                            <td className="fw-bold col-4">Album:</td>
                            <td>{trackReview.album}</td>
                        </tr>
                        <tr className="mb-3">
                            <td className="fw-bold col-4">Genre:</td>
                            <td>{trackReview.genre}</td>
                        </tr>
                        <tr className="mb-3">
                            <td className="fw-bold col-4">Score:</td>
                            <td>{trackReview.score}</td>
                        </tr>
                        <tr className="mb-3">
                            <td className="fw-bold col-4">Review:</td>
                            <td>{trackReview.content}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="d-flex justify-content-evenly">
                    <Link to={`/songs/${trackReview._id}/editreview`} className="btn btn-warning m-3 w-25">Edit Review</Link>
                    <button className="btn btn-danger m-3 w-25" onClick={() => deleteHandler(trackReview._id)}>Delete review</button>
                </div>
            </div>
        </div>
    )

}

export default DisplayOne