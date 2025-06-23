import React from 'react'

const NavBar = () => {
  return (
    <div>
         <nav className="navbar">
        <div className="navbar-title">
            <img className="navbar-logo" src="../images2/dragon_1.jpg" alt="Logo" />
        </div>
        <div className="navbar-list">
            <div className="item">

                <div className="navbar-item margin">H</div>
                <div className="navbar-item margin">A</div>
                <div className="navbar-item margin">C</div>
                <div className="navbar-item margin">C</div>
                <div className="navbar-item margin">C</div>
            </div>
            <div className="sating">
                <div className="navbar-item margin">o</div>
                <img className="user-logo " src="../images2/dragon_1.jpg" alt="Logo" />
            </div>
        </div>
    </nav>

    </div>
  )
}

export default NavBar