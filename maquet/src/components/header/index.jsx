import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav} from 'react-bootstrap';

function Header() {
    return (
        <>
            <Navbar expand="lg" className='main__container'>
                <Container> 
            
                    <Navbar className='nav__title title-res'>Plant Guide</Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navs__container">
                            <Nav className='nav-item'><span className='item-text'>¿Que hacemos?</span></Nav>
                            <Nav className='nav-item'><span className='item-text'>Mi Perfil</span></Nav>
                            <Nav className='nav-item'><span className='item-text'>Contacto</span></Nav>
                            <Nav className='nav-item'><span className='item-text'>Blog</span></Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header