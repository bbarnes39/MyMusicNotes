import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Register = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})

    const changeHandler = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/register', user, { withCredentials: true })
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
            <form onSubmit={submitHandler} className='m-3 border border-2 p-3'>
                <div className="d-flex flex-column">
                    <div className='row mb-3'>
                        <label className='col-form-label' htmlFor="username">Username:</label>
                        <div className="col-sm-12">
                            <input type="text" className='form-control' name='username' onChange={changeHandler} />
                        </div>
                        {
                            errors.username ?
                                <p className="text-danger"> {errors.username.message} </p> :
                                null
                        }
                    </div>
                    <div className='row mb-3'>
                        <label className='col-form-label' htmlFor="email">Email:</label>
                        <div className="col-sm-12">
                            <input type="text" className='form-control' name='email' onChange={changeHandler} />
                        </div>
                        {
                            errors.email ?
                                <p className="text-danger"> {errors.email.message} </p> :
                                null
                        }
                    </div>
                    <div className='row mb-3'>
                        <label className='col-form-label' htmlFor="password">Password:</label>
                        <div className="col-sm-12">
                            <input type="password" className='form-control' name='password' onChange={changeHandler} />
                        </div>
                        {
                            errors.password ?
                                <p className="text-danger"> {errors.password.message} </p> :
                                null
                        }
                    </div>
                    <div className='row mb-3'>
                        <label className='col-form-label' htmlFor="confirmPassword">Confirm Password:</label>
                        <div className="col-sm-12">
                            <input type="password" className='form-control' name='confirmPassword' onChange={changeHandler} />
                        </div>
                        {
                            errors.confirmPassword ?
                                <p className="text-danger"> {errors.confirmPassword.message} </p> :
                                null
                        }
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 m-2">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register