import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Nav = (props) => {
    return(
        <div>
            <nav>
                <Link to={'/artists'}>Artists</Link>
                <Link to={'/songs'}>Songs</Link>
                <Link to={'/albums'}>Albums</Link>
                <Link to={'/genres'}>Genres</Link>
            </nav>
        </div>
    )
}

export default Nav;