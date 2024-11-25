import "./navbar.css"
function NavBar(props)
{
    return(
        <div className="navBarall">
        <header className="header">
        <div className="logo">
            <img src="/images/logo.jpg" alt="Logo" />
        </div>
            <nav className="navbar">
            <a href="">{props.one}</a>
            <a href="">{props.two}</a>
            <a href="">{props.three}</a>
            <a href="">{props.four}</a>
            </nav>
        </header>    
        </div>
    )
}

export default NavBar;