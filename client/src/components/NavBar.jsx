import React, { useState } from 'react';
import { LogOut, DatabaseBackup, BrainCircuit, UserPlus, Eraser, CircleUserRound } from 'lucide-react';
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
                            <CircleUserRound />
                        </div>
                        <div className="navbar-item">
                            <DatabaseBackup />
                        </div>
                        <div className="navbar-item">
                            <BrainCircuit />
                        </div>
                        <div className="navbar-item">
                            <Eraser />
                        </div>

                        <div className="navbar-item">
                            <UserPlus />
                        </div>
                    </div>
                    <div className="sating">
                        <div className="navbar-item navbar-item-signout" onClick={signout}><LogOut /></div>
                        {/* <img className="user-logo" src="../src/assets/images2/dragon_3.jpg" alt="User Logo" /> */}
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
                    <div className="navbar-item buttons__cta">
                        <CircleUserRound />
                    </div>
                    <div className="navbar-item buttons__cta">
                        <DatabaseBackup />
                    </div>
                    <div className="navbar-item buttons__cta">
                        <BrainCircuit />
                    </div>
                    <div className="navbar-item buttons__cta">
                        <Eraser />
                    </div>

                    <div className="navbar-item buttons__cta">
                        <UserPlus />
                    </div>
                    <div className="navbar-item buttons__cta" onClick={signout}>
                        <LogOut />
                    </div>


                </div>
            </div>

        </div>
    )
}

export default NavBar