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
                        {props.one && (
                            <li className={styles.item}>
                                <Link className={styles.itemLink} to={props.pathOne}>{props.one}</Link>
                            </li>
                        )}
                        {props.two && (
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
                                        <Link className={styles.itemLink} to={props.pathTwo1}>{props.two1}</Link>
                                    </li>
                                    <li className={styles.dropdownItem}>
                                        <Link className={styles.itemLink} to={props.pathTwo2}>{props.two2}</Link>
                                    </li>
                                    <li className={styles.dropdownItem}>
                                        <Link className={styles.itemLink} to={props.pathTwo3}>{props.two3}</Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                        {props.three && (
                            <li className={styles.item}>
                                <Link className={styles.itemLink} to={props.pathThree}>{props.three}</Link>
                            </li>
                        )}
                        {props.four && (
                            <li className={styles.item}>
                                <Link className={styles.itemLink} to={props.pathFour}>{props.four}</Link>
                            </li>
                        )}
                        {props.five && (
                            <li className={styles.item}>
                                <Link className={styles.itemLink} to={props.pathFive}>{props.five}</Link>
                            </li>
                        )}
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