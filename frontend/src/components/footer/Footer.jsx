import React, { useState } from "react";
import { Link } from 'react-router-dom'
import styles from "./Footer.module.css"

function Footer(props) {
    const [dropdownActive, setDropdownActive] = useState(false);

    const toggleDropdown = () => {
        setDropdownActive(prev => !prev);
    };

    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logoSection}>
                    <img src="/images/logo.png" alt="logo" className={styles.logo} />
                </div>
                <div className={styles.footerCollapse}>
                    <ul className={styles.itemList}>
                        <li className={styles.item}>
                            <Link className={styles.itemLink} to={props.pathOne}>{props.one}</Link>
                        </li>
                        <li className={`${styles.item} ${styles.dropdown}`}>
                            <button
                                className={`${styles.itemLink} ${styles.dropdownToggle}`}
                                aria-expanded={dropdownActive}
                                onClick={toggleDropdown}
                            >
                                {props.two}
                            </button>
                            <ul className={`${styles.dropdownMenu} ${dropdownActive ? styles.show : ''}`}>
                                <li className={styles.dropdownItem}>
                                    <Link className={styles.itemLink} to={props.pathTwo1}>Preparing orders</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link className={styles.itemLink} to={props.pathTwo2}>Pending orders</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link className={styles.itemLink} to={props.pathTwo3}>Past orders</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.item}>
            
                            <Link className={styles.itemLink} to={props.pathThree}>{props.three}</Link>
                        </li>
                        <li className={styles.item}>
                            <Link className={styles.itemLink} to={props.pathFour}>{props.four}</Link>
                        </li>
                        <li className={styles.item}>
                            <Link className={styles.itemLink} to={props.pathFive}>{props.five}</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.copyright}>
                    <p className={styles.copyrightText}>Copyright &copy; {new Date().getFullYear()} <b>E3marJo</b>.<br /> All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;