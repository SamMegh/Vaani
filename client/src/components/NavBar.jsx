import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';



const NavBar = () => {
    const { signout } = useAuthStore();

    const [isActive, setIsActive] = useState(false);

    const toggleButtons = () => {
        setIsActive(!isActive);
        document.activeElement.blur();
    };

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
                        <div className="navbar-item navbar-item-signout" onClick={signout}><LogOut /></div>
                        <img className="user-logo" src="../src/assets/images2/dragon_3.jpg" alt="User Logo" />
                    </div>
                </div>
            </nav>





            <div className={`buttons ${isActive ? 'buttons--active' : ''}`}>
                <button
                    className={`buttons__toggle ${isActive ? 'buttons__toggle--active' : ''}`}
                    onClick={toggleButtons}
                >
                    <i className="fa fa-share-alt"></i>
                </button>

                <div className="buttons__ctas">
                    <a className="buttons__cta" href="#"><i className="fa-brands fa-facebook-f"></i>Acount</a>
                    <a className="buttons__cta" href="#"><i className="fa-brands fa-twitter"></i>Logout</a>
                    <a className="buttons__cta" href="#"><i className="fa-brands fa-linkedin-in"></i>History</a>
                </div>
            </div>

        </div>
    )
}

export default NavBar