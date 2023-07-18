import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = (props) => {
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const changeHandler = e => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/login', userLogin, { withCredentials: true })
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
                    <button type="submit" className="btn btn-primary mt-3 m-2">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login