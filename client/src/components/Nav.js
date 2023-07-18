import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Nav = (props) => {
    return(
        <div>
            <nav>
                <Link to={'/artists'} className="btn btn-info m-5">Artists</Link>
                <Link to={'/songs'} className="btn btn-info m-5">Songs</Link>
                <Link to={'/albums'} className="btn btn-info m-5">Albums</Link>
                <Link to={'/genres'} className="btn btn-info m-5">Genres</Link>
            </nav>
        </div>
    )
}

export default Nav;