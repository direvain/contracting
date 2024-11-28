import styles from "./Footer.module.css"

function Footer(props) {
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logoSection}>
                    <img src="/images/logo.png" alt="logo" className={styles.logo} />
                </div>
                <div className={styles.footerCollapse}>
                    <ul className={styles.itemList}>
                        <li className={styles.item}>
                            <a className={styles.itemLink} href="#">{props.one}</a>
                        </li>
                        <li className={styles.item}>
                            <a className={styles.itemLink} href="#">{props.two}</a>
                        </li>
                        <li className={styles.item}>
                            <a className={styles.itemLink} href="#">{props.three}</a>
                        </li>
                        <li className={styles.item}>
                            <a className={styles.itemLink} href="#">{props.four}</a>
                        </li>
                        <li className={styles.item}>
                            <a className={styles.itemLink} href="#">{props.five}</a>
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