import React, { useState } from 'react';
import { LogOut, DatabaseBackup, BrainCircuit, UserPlus, Eraser, CircleUserRound } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';



const NavBar = () => {
    const { signout } = useAuthStore();
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-title">
                    <img className="navbar-logo" src="../src/assets/images2/dragon_7.jpg" alt="Site Logo" />
                </div>
                
            </nav>
        </div>
    )
}

export default NavBar