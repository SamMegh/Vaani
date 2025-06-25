import React from 'react'
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
const NavBar = () => {
    const {signout}=useAuthStore();
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-title">
                    <img className="navbar-logo" src="../src/assets/images2/dragon_7.jpg" alt="Site Logo" />
                </div>
                <div className="navbar-list">
                    <div className="item">
                        <div className="navbar-item">

                        </div>
                        <div className="navbar-item">

                        </div>
                        <div className="navbar-item">

                        </div>
                        <div className="navbar-item">

                        </div>
                        <div className="navbar-item">

                        </div>
                    </div>
                    <div className="sating">
                        <div className="navbar-item navbar-item-signout" onClick={signout}><LogOut/></div>
                        <img className="user-logo" src="../src/assets/images2/dragon_3.jpg" alt="User Logo" />
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavBar