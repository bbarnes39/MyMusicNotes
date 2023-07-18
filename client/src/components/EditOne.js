import React, { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate, useParams, Link } from "react-router-dom"

const EditOne = (props) => {
    const { id } = useParams()

    const navigate = useNavigate()

    const [trackReview, setTrackReview] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
        score: null,
        content: ''
    })

    const [errors, setErrors] = useState({})

    const changeHandler = (e) => {
        setTrackReview({ ...trackReview, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8000/songs/${id}`)
            .then((res) => {
                setTrackReview(res.data.trackReview)
                console.log(res.data.trackReview)
            })
            .catch((err) => { console.log(err) })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/songs/${id}/editreview`, trackReview)
            .then((res) => {
                console.log(res)
                navigate(`/songs/${id}`)
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between m-3">
                    <h2 className="m-3 mb-3">Edit Review for {trackReview.artist} - {trackReview.title} </h2>
                    <Link to={'/home'} className="btn btn-info m-5">Back to home</Link>
                </div>
                <form onSubmit={submitHandler} className='m-3 border border-2 p-3'>
                    <div className="d-flex flex-column col-12">
                        <div className='row mb-3'>
                            <label className='col-form-label' htmlFor="title">Title:</label>
                            <div className="col-sm-12">
                                <input type="text" className='form-control' name='title' onChange={changeHandler} value={trackReview.title} />
                            </div>
                            {
                                errors.title ?
                                    <p className="text-danger"> {errors.title.message} </p> :
                                    null
                            }
                        </div>
                        <div className='row mb-3'>
                            <label className='col-form-label' htmlFor="artist">Artist:</label>
                            <div className="col-sm-12">
                                <input type="text" className='form-control' name='artist' onChange={changeHandler} value={trackReview.artist} />
                            </div>
                            {
                                errors.artist ?
                                    <p className="text-danger"> {errors.artist.message} </p> :
                                    null
                            }
                        </div>
                        <div className='row mb-3'>
                            <label className='col-form-label' htmlFor="album">Album:</label>
                            <div className="col-sm-12">
                                <input type="text" className='form-control' name='album' onChange={changeHandler} value={trackReview.album} />
                            </div>
                            {
                                errors.album ?
                                    <p className="text-danger"> {errors.album.message} </p> :
                                    null
                            }
                        </div>
                        <div className='row mb-3'>
                            <label className='col-form-label' htmlFor="genre">Genre:</label>
                            <div className="col-sm-12">
                                <input type="text" className='form-control' name='genre' onChange={changeHandler} value={trackReview.genre} />
                            </div>
                            {
                                errors.genre ?
                                    <p className="text-danger"> {errors.genre.message} </p> :
                                    null
                            }
                        </div>
                        <div className='row mb-3'>
                            <label className='col-form-label' htmlFor="score">Your Score:</label>
                            <div className="col-sm-12">
                                <input type="number" className='form-control' name='score' onChange={changeHandler} value={trackReview.score} />
                            </div>
                            {
                                errors.score ?
                                    <p className="text-danger"> {errors.score.message} </p> :
                                    null
                            }
                        </div>
                        <div className='row mb-3'>
                            <label className='col-form-label' htmlFor="content">Your Review:</label>
                            <div className="col-sm-12">
                                <input type="textarea" className='form-control' name='content' onChange={changeHandler} value={trackReview.content} />
                            </div>
                            {
                                errors.content ?
                                    <p className="text-danger"> {errors.content.message} </p> :
                                    null
                            }
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 m-2">Finish Editing</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditOne