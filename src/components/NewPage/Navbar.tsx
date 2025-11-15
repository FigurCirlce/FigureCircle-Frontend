// import { useState } from 'react'
// import {
//   Bell,
//   LogOut,
//   Home,
//   Users,
//   LayoutDashboard,
//   Calendar,
//   UserCircle,
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'

// const NavbarShowcase=() =>{
//   // Showcase modes
//   const MODES = [
//     'Landing • Logged Out',
//     'Landing • Logged In',
//     'Dashboard • Unified Top Nav',
//   ] as const
//   type Mode = typeof MODES[number]

//   const [mode, setMode] = useState<Mode>('Landing • Logged Out')
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState<'Dashboard' | 'Meetings' | 'Mentors' | 'Profile'>('Dashboard')

//   // Logo Component
//   const Logo = () => (
//     <div className="flex items-center space-x-2">
//       <div className="text-2xl leading-none text-red-600">➤</div>
//       <h1 className="font-semibold text-lg tracking-tight">FigureCircle</h1>
//     </div>
//   )

//   // Avatar Menu
//   const AvatarMenu = () => (
//     <div className="relative">
//       <button
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//         className="w-9 h-9 rounded-full border-2 border-transparent hover:border-blue-500 grid place-items-center transition-colors"
//         aria-label="Open profile menu"
//       >
//         <CircleUser className="w-7 h-7 text-gray-600" />
//       </button>

//       {dropdownOpen && (
//         <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border w-48 p-3 flex flex-col space-y-2 z-10 transition-all duration-200">
//           <div className="flex items-center space-x-3 border-b pb-2">
//             <CircleUser className="w-6 h-6 text-gray-600" />
//             <span className="text-sm font-medium">smrititest</span>
//           </div>
//           <button className="text-left hover:bg-gray-50 px-2 py-1 rounded">
//             Profile
//           </button>
//           <button className="text-left hover:bg-gray-50 px-2 py-1 rounded">
//             Settings
//           </button>
//           <button className="text-left hover:bg-gray-50 px-2 py-1 rounded text-red-500 flex items-center space-x-2">
//             <LogOut size={16} /> <span>Logout</span>
//           </button>
//         </div>
//       )}
//     </div>
//   )

//   // Navbar Shell Wrapper
//   const TopShell = ({ children }: { children: React.ReactNode }) => (
//     <nav className="w-full flex items-center justify-between px-8 py-3 bg-white shadow-sm border-b border-gray-100">
//       {children}
//     </nav>
//   )

//   // Variants

//   const LandingLoggedOut = () => (
//     <TopShell>
//       <Logo />
//       <div className="flex items-center space-x-3">
//         <button className="text-blue-600">Login</button>
//         <Button>Sign Up</Button>
//         <Button variant="outline" className="border-blue-600 text-blue-600">
//           Join as Expert
//         </Button>
//       </div>
//     </TopShell>
//   )

//   const LandingLoggedIn = () => (
//     <TopShell>
//       <Logo />
//       <div className="flex items-center space-x-6 text-gray-700">
//         <button className="hover:text-blue-600 flex items-center space-x-1">
//           <Home size={18} /> <span>Home</span>
//         </button>
//         <button className="hover:text-blue-600 flex items-center space-x-1">
//           <Users size={18} /> <span>Mentors</span>
//         </button>
//         <Button className="px-4">My Dashboard</Button>
//       </div>
//       <div className="flex items-center space-x-4">
//         <button className="relative">
//           <Bell size={20} />
//           <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
//         </button>
//         <AvatarMenu />
//       </div>
//     </TopShell>
//   )

//   const DashboardTopNav = () => (
//     <TopShell>
//       <Logo />
//       <div className="flex items-center">
//         <div className="bg-gray-100 rounded-full p-1 flex space-x-1">
//           {[
//             { name: 'Dashboard', icon: LayoutDashboard },
//             { name: 'Meetings', icon: Calendar },
//             { name: 'Mentors', icon: Users },
//           ].map((t) => (
//             <button
//               key={t.name}
//               onClick={() => setActiveTab(t.name as typeof activeTab)}
//               className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded-full transition ${
//                 activeTab === (t.name as typeof activeTab)
//                   ? 'bg-white shadow text-blue-600'
//                   : 'text-gray-600 hover:text-blue-600'
//               }`}
//             >
//               <t.icon size={16} />
//               <span>{t.name}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center space-x-3">
//         <button className="relative" aria-label="Notifications">
//           <Bell size={20} />
//           <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
//         </button>
//         <AvatarMenu />
//       </div>
//     </TopShell>
//   )

//   // Hero Section
//   const Hero = ({
//     title,
//     subtitle,
//     cta,
//   }: {
//     title: string
//     subtitle: string
//     cta?: string
//   }) => (
//     <div className="px-8 py-16 flex flex-col items-center">
//       <h2 className="text-4xl font-extrabold text-center max-w-3xl">
//         {title}
//       </h2>
//       <p className="mt-3 text-gray-500 text-center max-w-2xl">{subtitle}</p>
//       {cta && <Button className="mt-6">{cta}</Button>}
//     </div>
//   )

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       {/* Mode Switcher */}
//       <div className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b">
//         <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
//           <div className="text-sm text-gray-600">
//             Navbar / Landing & Dashboard States
//           </div>
//           <div className="flex items-center gap-2">
//             {MODES.map((m) => (
//               <Button
//                 key={m}
//                 variant={mode === m ? 'default' : 'outline'}
//                 size="sm"
//                 onClick={() => setMode(m)}
//               >
//                 {m}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Render selected variant */}
//       {mode === 'Landing • Logged Out' && (
//         <>
//           <LandingLoggedOut />
//           <Hero
//             title="Learn the right skills with expert mentorship."
//             subtitle="Join mentors and learners building real growth paths."
//             cta="Get Started"
//           />
//         </>
//       )}

//       {mode === 'Landing • Logged In' && (
//         <>
//           <LandingLoggedIn />
//           <Hero
//             title="Welcome back, Smriti!"
//             subtitle="Jump into your personalized roadmap or connect with mentors."
//             cta="Go to Dashboard"
//           />
//         </>
//       )}

//       {mode === 'Dashboard • Unified Top Nav' && (
//         <>
//           <DashboardTopNav />
//           <div className="max-w-5xl mx-auto px-6 py-12">
//             <h3 className="text-2xl font-bold mb-2">{activeTab}</h3>
//             <p className="text-gray-500 mb-6">
//               This is a preview of the unified dashboard layout without a left
//               sidebar.
//             </p>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {[1, 2, 3, 4, 5, 6].map((i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl shadow-sm border p-4 h-32 flex items-center justify-center"
//                 >
//                   Card {i}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }

// export default NavbarShowcase 
// import { useState } from 'react'
// import { Bell, LogOut, Home, Users, LayoutDashboard, Calendar, User } from 'lucide-react'
// import { UserCircle } from "lucide-react";
// import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'
// import { ArrowRight } from 'lucide-react'

// export default function NavbarShowcase() {
//   // Showcase which variant to preview
//   const MODES = [
//     'Landing • Logged Out',
//     'Landing • Logged In',
//     'Dashboard • Unified Top Nav',
//   ] as const
//   type Mode = typeof MODES[number]

//   const [mode, setMode] = useState<Mode>('Landing • Logged Out')
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState<'Dashboard'|'Meetings'|'Mentors'|'Profile'>('Dashboard')

//   // Reusable bits
//   const Logo = () => (
//     <div className="flex items-center space-x-2">
//       <div className="text-2xl leading-none text-red-600">➤</div>
//       <h1 className="font-semibold text-lg tracking-tight">FigureCircle</h1>
//     </div>
//   )

//   const AvatarMenu = () => (
//     <div className="relative">
//       {/* Gender‑neutral avatar icon */}
//       <button
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//         className="w-9 h-9 rounded-full border-2 border-transparent hover:border-blue-500 grid place-items-center transition-colors"
//         aria-label="Open profile menu"
//       >
//         <UserCircle className="w-7 h-7 text-gray-600" />
//       </button>
//       {dropdownOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -5 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border w-48 p-3 flex flex-col space-y-2 z-10"
//         >
//           <div className="flex items-center space-x-3 border-b pb-2">
//             <UserCircle className="w-6 h-6 text-gray-600" />
//             <span className="text-sm font-medium">smrititest</span>
//           </div>
//           {/* Removed Dashboard from here to avoid duplication */}
//           <button className="text-left hover:bg-gray-50 px-2 py-1 rounded">Profile</button>
//           <button className="text-left hover:bg-gray-50 px-2 py-1 rounded">Settings</button>
//           <button className="text-left hover:bg-gray-50 px-2 py-1 rounded text-red-500 flex items-center space-x-2"><LogOut size={16}/> <span>Logout</span></button>
//         </motion.div>
//       )}
//     </div>
//   )

//   const TopShell = ({ children }: { children: React.ReactNode }) => (
//     <nav className="w-full flex items-center justify-between px-8 py-3 bg-white shadow-sm border-b border-gray-100">
//       {children}
//     </nav>
//   )

//   // ------- Variants -------
//   const LandingLoggedOut = () => (
//     <TopShell>
//       <Logo />
//       <div className="flex items-center space-x-3">
//         <button className="text-blue-600">Login</button>
//         <Button>Sign Up</Button>
//         <Button variant="outline" className="border-blue-600 text-blue-600">Join as Expert</Button>
//       </div>
//     </TopShell>
//   )

//   const LandingLoggedIn = () => (
//     <TopShell>
//       <Logo />
//       <div className="flex items-center space-x-6 text-gray-700">
//         <Button
//           className="px-4 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//           onClick={() => setMode('Dashboard • Unified Top Nav')}
//         >
//           My Dashboard
//           <ArrowRight className="ml-2 w-4 h-4" />
//         </Button>
//       </div>
//       <div className="flex items-center space-x-4">
//         {/* Bell removed for a cleaner logged-in landing */}
//         <AvatarMenu />
//       </div>
//     </TopShell>
//   )

//   const DashboardTopNav = () => (
//     <TopShell>
//       <Logo />

//       {/* Center: Condensed segmented control (reduces perceived item count) */}
//       <div className="flex items-center">
//         <div className="bg-gray-100 rounded-full p-1 flex space-x-1">
//           {[
//             { name: 'Dashboard', icon: LayoutDashboard },
//             { name: 'Meetings', icon: Calendar },
//             { name: 'Mentors', icon: Users },
//           ].map((t) => (
//             <button
//               key={t.name}
//               onClick={() => setActiveTab(t.name as typeof activeTab)}
//               className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded-full transition ${
//                 activeTab === (t.name as typeof activeTab)
//                   ? 'bg-white shadow text-blue-600'
//                   : 'text-gray-600 hover:text-blue-600'
//               }`}
//             >
//               <t.icon size={16} />
//               <span>{t.name}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Right: Alerts + Profile (Profile link moved into menu) */}
//       <div className="flex items-center space-x-3">
//         <button className="relative" aria-label="Notifications">
//           <Bell size={20} />
//           <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
//         </button>
//         <AvatarMenu />
//       </div>
//     </TopShell>
//   )

//   const Hero = ({ title, subtitle, cta }: { title: string; subtitle: string; cta?: string }) => (
//     <div className="px-8 py-16 flex flex-col items-center">
//       <h2 className="text-4xl font-extrabold text-center max-w-3xl">{title}</h2>
//       <p className="mt-3 text-gray-500 text-center max-w-2xl">{subtitle}</p>
//       {cta && <Button className="mt-6">{cta}</Button>}
//     </div>
//   )

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       {/* Mode Switcher */}
//       <div className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b">
//         <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
//           <div className="text-sm text-gray-600">Navbar / Landing & Dashboard States</div>
//           <div className="flex items-center gap-2">
//             {MODES.map((m) => (
//               <Button key={m} variant={mode === m ? 'default' : 'outline'} size="sm" onClick={() => setMode(m)}>
//                 {m}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Render selected variant */}
//       {mode === 'Landing • Logged Out' && (
//         <>
//           <LandingLoggedOut />
//           <Hero title="Learn the right skills with expert mentorship." subtitle="Join mentors and learners building real growth paths." cta="Get Started" />
//         </>
//       )}

//       {mode === 'Landing • Logged In' && (
//         <>
//           <LandingLoggedIn />
//           <Hero title="Welcome back, Smriti!" subtitle="Jump into your personalized roadmap or connect with mentors." cta="Go to Dashboard" />
//         </>
//       )}

//       {mode === 'Dashboard • Unified Top Nav' && (
//         <>
//           <DashboardTopNav />
//           <div className="max-w-5xl mx-auto px-6 py-12">
//             <h3 className="text-2xl font-bold mb-2">{activeTab}</h3>
//             <p className="text-gray-500 mb-6">This is a preview of the unified dashboard layout without a left sidebar.</p>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {[1,2,3,4,5,6].map((i)=> (
//                 <div key={i} className="bg-white rounded-2xl shadow-sm border p-4 h-32 flex items-center justify-center">Card {i}</div>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }
// import { useState } from 'react'
// import { Bell, LogOut, LayoutDashboard, Calendar, Users } from 'lucide-react'
// import { UserCircle } from "lucide-react"
// import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'

// const Navbar=()=> {
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState<'Dashboard' | 'Meetings' | 'Mentors'>('Dashboard')

//   const Logo = () => (
//     <div className="flex items-center space-x-2">
//       <div className="text-2xl leading-none text-red-600">➤</div>
//       <h1 className="font-semibold text-lg tracking-tight">FigureCircle</h1>
//     </div>
//   )

//   const AvatarMenu = () => (
//     <div className="relative">
//       <button
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//         className="w-9 h-9 rounded-full border-2 border-transparent hover:border-blue-500 grid place-items-center transition-colors"
//         aria-label="Open profile menu"
//       >
//         <UserCircle className="w-7 h-7 text-gray-600" />
//       </button>
//       {dropdownOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -5 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border w-48 p-3 flex flex-col space-y-2 z-10"
//         >
//           <div className="flex items-center space-x-3 border-b pb-2">
//             <UserCircle className="w-6 h-6 text-gray-600" />
//             <span className="text-sm font-medium">smrititest</span>
//           </div>
//           <button className="text-left hover:bg-gray-50 px-2 py-1 rounded">Profile</button>
//           <button className="text-left hover:bg-gray-50 px-2 py-1 rounded">Settings</button>
//           <button className="text-left hover:bg-gray-50 px-2 py-1 rounded text-red-500 flex items-center space-x-2">
//             <LogOut size={16} /> <span>Logout</span>
//           </button>
//         </motion.div>
//       )}
//     </div>
//   )

//   return (
//     <nav className="w-full flex items-center justify-between px-8 py-3 bg-white shadow-sm border-b border-gray-100">
//       <Logo />

//       {/* Center tabs */}
//       <div className="flex items-center">
//         <div className="bg-gray-100 rounded-full p-1 flex space-x-1">
//           {[
//             { name: 'Dashboard', icon: LayoutDashboard },
//             { name: 'Meetings', icon: Calendar },
//             { name: 'Mentors', icon: Users },
//           ].map((t) => (
//             <button
//               key={t.name}
//               onClick={() => setActiveTab(t.name as typeof activeTab)}
//               className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium rounded-full transition ${
//                 activeTab === (t.name as typeof activeTab)
//                   ? 'bg-white shadow text-blue-600'
//                   : 'text-gray-600 hover:text-blue-600'
//               }`}
//             >
//               <t.icon size={16} />
//               <span>{t.name}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Right side icons */}
//       <div className="flex items-center space-x-3">
//         <button className="relative" aria-label="Notifications">
//           <Bell size={20} />
//           <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
//         </button>
//         <AvatarMenu />
//       </div>
//     </nav>
//   )
// }
// export default Navbar

import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { Menu, LayoutDashboard, Calendar, User, CalendarX2 } from 'lucide-react'
import logo from "../../assets/image (1).png"
// import pic from '../../assets/pic.jpg'
import NotificationBell from './NotificationBell'
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  title?: string
  icon?: React.ReactElement
}

interface NavbarProps {
  setActivePage: (page: string) => void
  close: boolean
}

const Navbar: React.FC<NavbarProps> = ({ setActivePage, close }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string>('Dashboard')
   const navigate=useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const HomeMenu: MenuItem[] = [
    { title: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { title: 'Mentors', icon: <CalendarX2 size={18} /> },
    { title: 'Schedule Meeting', icon: <Calendar size={18} /> },
    { title: 'My Profile', icon: <User size={18} /> },
    
  ]

  const HomeMenuNEW: MenuItem[] = [
    { title: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { title: 'My Profile', icon: <User size={18} /> },
    { title: 'Mentors', icon: <CalendarX2 size={18} /> },
  ]

  const handleItemClick = (title: string) => {
    setActiveItem(title)
    setActivePage(title)
    setIsMenuOpen(false)
  }

  // const userData = JSON.parse(localStorage.getItem("degree") || "{}")
  // const username = userData?.firstname || userData?.name || "User"

  const menuItems = !close ? HomeMenu : HomeMenuNEW

    const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // const handleHome=()=>{
  //   navigate('/');
  // }
  

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-100 fixed top-0 left-0 z-40">
      {/* Top Section */}
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" width={50} />
          <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">FigureCircle</h1>
        </div>

        {/* Center: Menu items (desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <div className='flex px-1 py-1 rounded-2xl bg-slate-100'>
          {menuItems.map((item, index) => {
            const isActive = activeItem === item.title
            return (
              <button
                key={index}
                onClick={() => handleItemClick(item.title ?? "")}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-sm font-medium transition 
                  ${isActive
                    ? 'bg-white text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            )
          })}
          </div>
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-3">
       
                      <div className="mr-3">
                 <NotificationBell/>
                 </div>
                  <button
                   className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-2xl text-xs md:text-sm hover:bg-blue-700" onClick={handleLogout}>
                          
                     Log Out
                   </button>
                  
          {/* <IconButton onClick={toggleMenu} className="md:hidden text-gray-800">
            <Menu />
          </IconButton> */}
           <div className="flex md:hidden">
    <IconButton onClick={toggleMenu} className="text-gray-800">
      <Menu />
    </IconButton>
  </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md flex flex-col px-4 py-2 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = activeItem === item.title
            return (
              <button
                key={index}
                onClick={() => handleItemClick(item.title ?? "")}
                className={`flex items-center gap-3 p-2 rounded text-sm transition 
                  ${isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 text-gray-700'}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            )
          })}
        </div>
      )}
    </nav>
  )
}

export default Navbar
