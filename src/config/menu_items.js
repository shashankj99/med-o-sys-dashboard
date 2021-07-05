import { faTachometerAlt, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";

export default function menu_items() {
    // get roles from local storage
    const roles = JSON.parse(localStorage.getItem('roles'));

    let items = [
        {
            key: 1,
            link: '/home',
            label: 'Dashboard',
            icon: faTachometerAlt
        },
        {
            key: 2,
            link: '/profile',
            label: 'Profile',
            icon: faUser
        }
    ];

    if (roles) {
        if (roles.includes('super admin'))
            items.push(
                {
                    key: 3,
                    link: '/roles',
                    label: 'Roles',
                    icon: faUserShield
                }
            );
    }

    return items;
}