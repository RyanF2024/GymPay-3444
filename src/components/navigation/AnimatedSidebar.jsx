import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BiPin, BiX, BiMenu } from 'react-icons/bi';

const AnimatedSidebar = ({
  navItems = [],
  collapsedWidth = 64,
  expandedWidth = 240,
  defaultExpanded = false,
  showPinToggle = true,
  variant = 'default'
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isPinned, setIsPinned] = useState(defaultExpanded);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animation variants
  const sidebarVariants = {
    collapsed: {
      width: collapsedWidth,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    expanded: {
      width: expandedWidth,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const labelContainerVariants = {
    collapsed: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        staggerDirection: 1
      }
    },
    expanded: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        staggerDirection: -1,
        delayChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  const labelVariants = {
    collapsed: {
      opacity: 0,
      x: -10,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.15
      }
    },
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile && !isPinned) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isPinned) {
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!isMobile) {
        setIsExpanded(!isExpanded);
      }
    }
    if (e.key === 'Escape' && isMobile) {
      setShowMobileMenu(false);
    }
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    setIsExpanded(!isPinned);
  };

  const NavItem = ({ item, index }) => (
    <motion.div
      variants={labelVariants}
      className="relative"
    >
      <NavLink
        to={item.path}
        onClick={() => isMobile && setShowMobileMenu(false)}
        className={({ isActive }) =>
          `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            isActive
              ? 'bg-sidebar-active text-sidebar-text-primary border-l-4 border-primary-500'
              : 'text-sidebar-text-secondary hover:bg-sidebar-hover hover:text-sidebar-text-primary'
          }`
        }
        aria-label={item.label}
      >
        <motion.div
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <item.icon className="h-5 w-5" />
        </motion.div>
        
        <AnimatePresence>
          {(isExpanded || isMobile) && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="ml-3 truncate"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {item.badge && (
          <AnimatePresence>
            {(isExpanded || isMobile) && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full"
              >
                {item.badge}
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </NavLink>

      {/* Tooltip for collapsed state */}
      {!isExpanded && !isMobile && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
          {item.label}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      )}
    </motion.div>
  );

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setShowMobileMenu(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg text-gray-600 hover:text-gray-900"
          aria-label="Open navigation menu"
        >
          <BiMenu className="h-6 w-6" />
        </button>

        <AnimatePresence>
          {showMobileMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                onClick={() => setShowMobileMenu(false)}
              />
              <motion.aside
                initial={{ x: -expandedWidth }}
                animate={{ x: 0 }}
                exit={{ x: -expandedWidth }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                className="fixed left-0 top-0 h-full bg-sidebar-bg border-r border-sidebar-border z-50 shadow-xl"
                style={{ width: expandedWidth }}
                role="navigation"
                aria-label="Main navigation"
              >
                <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                  <h1 className="text-xl font-bold text-sidebar-text-primary">GymPay</h1>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-1 rounded-md text-sidebar-text-secondary hover:text-sidebar-text-primary"
                    aria-label="Close navigation menu"
                  >
                    <BiX className="h-5 w-5" />
                  </button>
                </div>
                <nav className="mt-4 px-2 space-y-1">
                  <motion.div
                    variants={labelContainerVariants}
                    initial="collapsed"
                    animate="expanded"
                  >
                    {navItems.map((item, index) => (
                      <NavItem key={item.path} item={item} index={index} />
                    ))}
                  </motion.div>
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop sidebar
  return (
    <motion.aside
      variants={sidebarVariants}
      initial={isExpanded ? "expanded" : "collapsed"}
      animate={isExpanded ? "expanded" : "collapsed"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="hidden lg:flex lg:flex-shrink-0 fixed left-0 top-0 h-full bg-sidebar-bg border-r border-sidebar-border z-30 overflow-hidden"
      role="navigation"
      aria-label="Main navigation"
      aria-expanded={isExpanded}
    >
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border min-h-[73px]">
          <AnimatePresence>
            {isExpanded && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                className="text-xl font-bold text-sidebar-text-primary"
              >
                GymPay
              </motion.h1>
            )}
          </AnimatePresence>
          
          {showPinToggle && isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={togglePin}
              className={`p-1 rounded-md transition-colors ${
                isPinned 
                  ? 'text-primary-600 bg-primary-100' 
                  : 'text-sidebar-text-secondary hover:text-sidebar-text-primary'
              }`}
              aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
            >
              <BiPin className="h-4 w-4" />
            </motion.button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <motion.div
            variants={labelContainerVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            {navItems.map((item, index) => (
              <NavItem key={item.path} item={item} index={index} />
            ))}
          </motion.div>
        </nav>
      </div>
    </motion.aside>
  );
};

export default AnimatedSidebar;