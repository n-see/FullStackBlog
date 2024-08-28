import { Nav, Navbar, NavDropdown, Container, Image } from "react-bootstrap";
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Moon from "../assets/moon.jpg";

const NavBar = ({ isDarkMode, toggleDarkMode, user }) => {

    // stuff here

    return (
        <>
            <Navbar collapseOnSelect expand="lg"
                data-bs-theme={`${isDarkMode ? "dark" : "light"}`}
                className={`${isDarkMode ? "bg-dark text-light" : "bg-body-tertiary"}`}
                fixed="top"
            >
                <Container>
                    <Navbar.Brand href="#home">Our Daily Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/"}>Blog Page</Nav.Link>
                            <Nav.Link as={Link} to={"/Dashboard"}>Dashboard</Nav.Link>
                        </Nav>


                        <Nav className="welcome">
                            <Nav.Link href="#deets">
                                {
                                    isDarkMode ? (
                                        <FaRegMoon onClick={toggleDarkMode} fontSize={20} />
                                    ) : (
                                        <IoSunnyOutline onClick={toggleDarkMode} fontSize={30} />
                                    )
                                }
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/CreateAccount"}>Create Account</Nav.Link>
                            <Nav.Link as={Link} to={"/Login"}>Login</Nav.Link>

                            <Nav.Link>Welcome {user ? user.username : "Guest"}</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                <Image className="profilepic" src={Moon} roundedCircle />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar