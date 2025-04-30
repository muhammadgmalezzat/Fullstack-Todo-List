import React,{useContext} from 'react';
import { UserCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { toast } from 'react-toastify';
function ProfileDropdown({ isOpen }) {
  const { setToken,getAllTodos  } = useContext(AppContext);
  const navigate = useNavigate();

const logout = () => {
        localStorage.removeItem('token')
  setToken(false)
  getAllTodos()
  navigate('/login');
  toast.success("Logged Out Successfully")
    };
  return (
    <div
      className={`
        origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none
        transition-all duration-200 ease-in-out
        ${isOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}
      `}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <a
        href="/profile"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
      >
        <UserCircle className="mr-2 h-4 w-4 text-gray-500" />
        <span>View Profile</span>
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
        onClick={() => {
          logout();
        }}
      >
        <LogOut className="mr-2 h-4 w-4 text-gray-500" />
        <span>Log Out</span>
      </a>
    </div>
  );
}

export default ProfileDropdown;