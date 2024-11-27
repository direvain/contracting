import React, { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar(props) {
    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(prev => !prev); // Toggle the state
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
                        <li className={styles.navItem}>
                            <a className={styles.navLink} href="#">{props.one}</a>
                        </li>
                        <li className={styles.navItem}>
                            <a className={styles.navLink} href="#">{props.two}</a>
                        </li>
                        <li className={styles.navItem}>
                            <a className={styles.navLink} href="#">{props.three}</a>
                        </li>
                        <li className={styles.navItem}>
                            <a className={styles.navLink} href="#">{props.four}</a>
                        </li>
                        <li className={styles.navItem}>
                            <a className={styles.navLink} href="#">{props.five}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
