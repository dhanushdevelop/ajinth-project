import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, LogIn, LogOut, User, Menu, X, Home, Settings } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) => (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive(to)
          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
          : 'hover:bg-primary-50 text-gray-700 hover:text-primary-600'
      } ${className}`}
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors font-serif"
          >
            VN Furniture
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/">
              <Home size={20} />
              Home
            </NavLink>
            
            {user?.email === 'admin@example.com' && (
              <NavLink to="/admin">
                <Settings size={20} />
                Admin
              </NavLink>
            )}

            {user ? (
              <>
                <NavLink to="/profile">
                  <User size={20} />
                  Profile
                </NavLink>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <LogIn size={20} />
                  Login
                </NavLink>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg transition-all duration-300"
                >
                  <User size={20} />
                  Sign Up
                </Link>
              </>
            )}
            
            <Link 
              to="/cart" 
              className="relative p-2 hover:bg-primary-50 rounded-full transition-all duration-300"
            >
              <ShoppingCart size={24} className="text-primary-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-50 text-primary-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg animate-slideDown">
            <NavLink to="/">
              <Home size={20} />
              Home
            </NavLink>
            
            {user?.email === 'admin@example.com' && (
              <NavLink to="/admin">
                <Settings size={20} />
                Admin
              </NavLink>
            )}

            {user ? (
              <>
                <NavLink to="/profile">
                  <User size={20} />
                  Profile
                </NavLink>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <LogIn size={20} />
                  Login
                </NavLink>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 mx-4 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  Sign Up
                </Link>
              </>
            )}
            
            <NavLink to="/cart" className="justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} />
                Cart
              </div>
              {cartItems.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}