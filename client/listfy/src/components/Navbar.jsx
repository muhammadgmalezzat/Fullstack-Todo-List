import React, { useState,useContext } from 'react';
import { ListChecks, User } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import { AppContext } from '../contexts/AppContext';

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { token, userData } = useContext(AppContext);
    const toggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="flex items-center">
                            <ListChecks className="h-8 w-8 text-purple-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">Listfy</span>
                        </a>
                    </div>
                    {token && userData && (
                        <div className="flex items-center">
                            <div
                                className="ml-3 relative"
                                onClick={() => toggle()}
                            >
                                <div>
                                    <button
                                        type="button"
                                        className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        id="user-menu"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-200">
                                            <User className="h-5 w-5" />
                                        </div>
                                    </button>
                                </div>
                                <ProfileDropdown isOpen={isDropdownOpen} />
                            </div>
                        </div>)}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;