import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import LoginScreen from '../screens/LoginScreen'; // Adjust path as needed
import SignUpScreen from '../screens/SignUpScreen'; // Adjust path as needed

const AuthWrapper = () => {
    const location = useLocation();
    const cardRef = useRef(null);
    const isSignUp = location.pathname === '/signup';

    useEffect(() => {
        // Set the initial rotation based on the path
        const initialRotation = isSignUp ? 180 : 0;
        gsap.set(cardRef.current, { rotationY: initialRotation });

        // Define the target rotation for the current state
        const targetRotation = isSignUp ? 180 : 0;

        // Animate the flip
        gsap.to(cardRef.current, {
            rotationY: targetRotation,
            duration: 0.8,
            ease: "power2.inOut",
            overwrite: true
        });
    }, [isSignUp]);

    return (
        // Main container with full screen size and 3D perspective
        <div className="flex items-center justify-center min-h-screen 
                      bg-[rgba(0,0,0,0.2)] backdrop-blur-[4px] font-orbitron 
                      [perspective:1000px]"> 
            
            <div 
                ref={cardRef} 
                className="relative w-full h-full 
                           transition-transform duration-800 
                           [transform-style:preserve-3d]"
            >
                {/* Login Screen (Front Face)
                  It is the 'default' face (0 degrees rotation)
                */}
                <div className="absolute inset-0 
                                [backface-visibility:hidden] 
                                [transform:rotateY(0deg)]">
                    <LoginScreen />
                </div>

                {/* Sign Up Screen (Back Face)
                  It is initially rotated 180 degrees so it faces away.
                */}
                <div className="absolute inset-0 
                                [backface-visibility:hidden] 
                                [transform:rotateY(180deg)]">
                    <SignUpScreen />
                </div>
            </div>
        </div>
    );
};

export default AuthWrapper;