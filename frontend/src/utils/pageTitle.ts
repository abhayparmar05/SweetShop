import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export const usePageTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const titles: { [key: string]: string } = {
            '/': 'Home - Sweet Shop',
            '/login': 'Login - Sweet Shop',
            '/register': 'Register - Sweet Shop',
            '/register/admin': 'Admin Registration - Sweet Shop',
            '/shop': 'Shop - Sweet Shop',
            '/admin': 'Admin Dashboard - Sweet Shop',
        };

        const pageTitle = titles[location.pathname] || 'Sweet Shop - Delicious Treats Await!';
        document.title = pageTitle;
    }, [location]);
};
