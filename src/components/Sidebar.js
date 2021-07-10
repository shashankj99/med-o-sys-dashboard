import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Badge, Button, Navbar } from '@themesberg/react-bootstrap';

export default function Sidebar({ items })
{
    const nodeRef = React.useRef(null);

    const [show, setShow] = useState(false);
    const showClass = show ? "show" : "";

    const onCollapse = () => setShow(!show);

    const pathname = window.location.pathname;

    const NavItem = (props) => {
        const { title, link, external, target, icon, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
        const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
        const navItemClassName = link === pathname ? "active" : "";
        const linkProps = external ? { href: link } : { as: Link, to: link };
    
        return (
            <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
                <Nav.Link {...linkProps} target={target} className={classNames}>
                    <span>
                        {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
                        <span className="sidebar-text">{title}</span>
                    </span>
                    {
                        badgeText ? (
                            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
                            ) : null
                    }
                </Nav.Link>
            </Nav.Item>
        );
      };

    return(
        <>
            <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
                <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
                    <span className="navbar-toggler-icon" />
                </Navbar.Toggle>
            </Navbar>

            <CSSTransition timeout={300} in={show} classNames="sidebar-transition" nodeRef={nodeRef}>
                <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
                    <div ref={nodeRef} className="sidebar-inner px-4 pt-3">
                        <Nav className="flex-column pt-3 pt-md-0">
                            {
                                items.map(item => (
                                    <NavItem title={item.label} link={item.link} icon={item.icon} key={item.key} />
                                ))
                            }
                        </Nav>
                    </div>
                </SimpleBar>
            </CSSTransition>
        </>
    );
}