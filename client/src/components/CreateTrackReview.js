import React, { useState } from "react"
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"

const CreateTrackReview = (props) => {
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

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/songs/newreview', trackReview)
            .then((res) => {
                console.log(res)
                navigate('/home')
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
                    <h2 className="m-3 align-self-center">New Review</h2>
                    <Link to={'/home'} className="btn btn-info m-5">Back to home</Link>
                </div>
                <form onSubmit={submitHandler} className='m-3 border border-2 p-3'>
                    <div className="d-flex flex-column col-12">
                        <div className='row mb-3'>
                            <label className='col-form-label' htmlFor="title">Title:</label>
                            <div className="col-sm-12">
                                <input type="text" className='form-control' name='title' onChange={changeHandler} />
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
                                <input type="text" className='form-control' name='artist' onChange={changeHandler} />
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
                                <input type="text" className='form-control' name='album' onChange={changeHandler} />
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
                                <input type="text" className='form-control' name='genre' onChange={changeHandler} />
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
                                <input type="number" className='form-control' name='score' onChange={changeHandler} />
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
                                <input type="textarea" className='form-control' name='content' onChange={changeHandler} />
                            </div>
                            {
                                errors.content ?
                                    <p className="text-danger"> {errors.content.message} </p> :
                                    null
                            }
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 m-2">Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTrackReview