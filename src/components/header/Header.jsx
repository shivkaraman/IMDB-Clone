import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Components
import ContentWrapper from '../contentWrapper/ContentWrapper'

//React icons
import { HiOutlineSearch } from "react-icons/hi"; //Search icon
import { SlMenu } from "react-icons/sl";          //Hamburger Menu Icon
import { VscChromeClose } from "react-icons/vsc"; //Close Icon
import logo from "../../assets/movix-logo.svg";

//Styles
import './header.css'

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    //Scroll to top of the page when we move to some other page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    //Managing navbar
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            //scrollY > lastScrollY => We are scrolling down. If this is false => We are scrolling up
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);


    //Managing search box and mobile menu
    const openSearchBar = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } 
        else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };
    
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("movie")} > Movies </li>
                    <li className="menuItem" onClick={() => navigationHandler("tv")} >TV Shows </li>
                    <li className="menuItem"> <HiOutlineSearch onClick={openSearchBar} /> </li>
                </ul>    

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearchBar} />
                    {mobileMenu 
                        ? <VscChromeClose onClick={() => setMobileMenu(false)} />
                        : <SlMenu onClick={openMobileMenu} />
                    }
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={ e => setQuery(e.target.value) }
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose onClick={() => setShowSearch(false)} />
                        </div>
                    </ContentWrapper>
                </div>
             )}
        </header>
    )
}

export default Header;