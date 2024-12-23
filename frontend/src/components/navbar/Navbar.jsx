import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar(props) {
    const [isActive, setIsActive] = useState(false);
    const [dropdownActive, setDropdownActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(prev => !prev); // Toggle the state
    };
    
    const toggleDropdown = () => {
        setDropdownActive(prev => !prev);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <img src="/images/logo.png" alt="logo" className={styles.logo} />
                <button
                    className={styles.toggleButton}
                    aria-expanded={isActive}
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}
                >
                    ☰
                </button>
                {/* The navbarCollapse class dynamically changes based on the isActive state */}
                <div className={`${styles.navbarCollapse} ${isActive ? styles.active : ''}`}>
                    <ul className={styles.navbarNav}>
                        <li className={styles.navItem} onClick={props.onClickOne} >
                            <Link className={styles.navLink} to={props.pathOne}>{props.one}</Link>
                        </li>
                        <li className={`${styles.navItem} ${styles.dropdown}`}>
                            <button
                                className={`${styles.navLink} ${styles.dropdownToggle}`}
                                aria-expanded={dropdownActive}
                                onClick={toggleDropdown}
                            >
                                {props.two}
                            </button>
                            <ul className={`${styles.dropdownMenu} ${dropdownActive ? styles.show : ''}`} >
                                <li className={styles.dropdownItem} onClick={props.onClickTwo1}>
                                    <Link className={styles.navLink} to={props.pathTwo1}>{props.two1}</Link>
                                </li>
                                <li className={styles.dropdownItem} onClick={props.onClickTwo2}>
                                    <Link className={styles.navLink} to={props.pathTwo2}>{props.two2}</Link>
                                </li>
                                <li className={styles.dropdownItem} onClick={props.onClickTwo3}>
                                    <Link className={styles.navLink} to={props.pathTwo3}>{props.two3}</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.navItem} onClick={props.onClickThree}>
                            <Link className={styles.navLink} to={props.pathThree}>{props.three}</Link>
                        </li>
                        <li className={styles.navItem} onClick={props.onClickFour}>
                            <Link className={styles.navLink} to={props.pathFour}>{props.four}</Link>
                        </li>
                        <li className={styles.navItem} onClick={props.onClickFive}> 
                            <Link className={styles.navLink} to={props.pathFive}>{props.five}</Link>
                        </li>
                        <li className={styles.navItem} onClick={props.onClickSix}> 
                            <Link className={styles.navLink} to={props.pathSix}>{props.six}</Link>
                        </li>
                        <li className={styles.navItem}>
                            <button className={`${styles.navLink} ${styles.logout}`} onClick={props.logout}>Logout</button>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
