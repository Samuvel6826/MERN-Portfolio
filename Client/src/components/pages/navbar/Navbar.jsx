import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUserAuth } from "../../authentication/UserAuthContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { IoSettings } from "react-icons/io5";
import CustomMenuList from "./CustomMenuList";
import MobileMenu from "./MobileMenu";
import { Link } from "react-scroll";
import './Navbar.css';

const Navbar = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null); // For managing timeout
	const [openMobileMenu, setOpenMobileMenu] = useState(false);
	const [activeMenu, setActiveMenu] = useState('home');
	const { logOut, user } = useUserAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const isLoginPage = location.pathname === "/login";

	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const handleDownloadClick = async (fileUrl) => {
		try {
			const response = await fetch(fileUrl);
			const blob = await response.blob();
			const link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = fileUrl.split('/').pop();
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error("Download error:", error);
		}
	};

	const handleMouseEnter = () => {
		clearTimeout(timeoutId);
		setOpenMenu(true);
	};

	const handleMouseLeave = () => {
		const id = setTimeout(() => setOpenMenu(false), 200);
		setTimeoutId(id);
	};

	const toggleMobileMenu = () => setOpenMobileMenu(prev => !prev);

	return (
		<header id="topBar" className="sticky top-0 z-20 flex h-16 w-full bg-tertiary px-4 text-base text-letter shadow-lg lg:px-10 xl:text-xl">
			<nav id="nav-header" className="flex h-full w-full items-center justify-between">
				<div id="desktopMenu" className="hidden w-full items-center justify-between lg:flex">
					<a href="#" id="logo" className="font-aldrich text-[1.6rem] font-bold transition-transform duration-300 hover:scale-110 xl:text-4xl"
						style={{ background: "linear-gradient(90deg, #00c6ff, #0072ff)", WebkitBackgroundClip: "text", color: "transparent", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" }}>
						Samtocode24
					</a>

					{!isLoginPage && (
						<div className="flex gap-3 xl:gap-6">
							{['home', 'about', 'education', 'skills', 'projects', 'contact'].map((section) => (
								<Link
									key={section}
									to={section}
									spy={true}
									smooth={true}
									offset={-63}
									duration={200}
									className={`desktopMenuListItem ${activeMenu === section ? 'active' : ''}`}
									onSetActive={() => setActiveMenu(section)}
								>
									{section.charAt(0).toUpperCase() + section.slice(1)}
								</Link>
							))}
						</div>
					)}

					<div className="flex gap-4">
						<div
							id="resumeContainer"
							className="relative"
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<button
								id="resumeBtn"
								className="flex items-center gap-3 rounded-full border border-primary bg-transparent px-4 py-2 font-normal capitalize tracking-normal text-primary transition-all duration-300 hover:bg-primary hover:text-letter focus:outline-none focus:ring-2 focus:ring-primary"
							>
								Resume
								<ChevronDownIcon
									strokeWidth={2.5}
									className={`h-4 w-4 transition-transform ${openMenu ? "rotate-180" : "rotate-0"}`}
								/>
							</button>
							{openMenu && (
								<div className="absolute right-0 mt-2 w-96 flex-col gap-2 bg-tertiary text-2xl shadow-lg">
									<CustomMenuList handleDownloadClick={handleDownloadClick} />
								</div>
							)}
						</div>

						{user ? (
							<button
								className="flex items-center rounded-full border border-primary bg-transparent px-4 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-letter"
								onClick={handleLogout}
								aria-label="Log Out"
							>
								Log Out
							</button>
						) : (
							<a href="/login" className="flex items-center rounded-full border border-primary bg-transparent px-4 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-letter">
								Admin Panel <IoSettings className="ml-2" />
							</a>
						)}
					</div>
				</div>

				<div id="mobileMenu" className="flex w-full flex-col items-center text-xl lg:hidden">
					<div className="flex w-full items-center justify-between">
						<a href="#" id="logo" className="font-aldrich text-2xl font-bold transition-transform duration-300 hover:scale-110"
							style={{ fontSize: "1.8rem", background: "linear-gradient(90deg, #00c6ff, #0072ff)", WebkitBackgroundClip: "text", color: "transparent", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)" }}>
							Samtocode24
						</a>
						<button
							className="flex items-center rounded-lg border-2 border-primary p-2 transition-colors duration-300 hover:bg-gray-800"
							onClick={toggleMobileMenu}
							aria-label="Open menu"
						>
							<i className="uil uil-apps text-xl"></i>
						</button>
					</div>
					<MobileMenu
						openRight={openMobileMenu}
						setOpenRight={setOpenMobileMenu}
						isLoginPage={isLoginPage}
						handleLogout={handleLogout}
						user={user}
					/>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;