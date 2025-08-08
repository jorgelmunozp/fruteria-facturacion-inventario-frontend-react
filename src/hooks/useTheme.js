import { useState } from 'react';

export const useTheme = () => {
    const body = document.getElementById('body');
    const storagedTheme = localStorage.getItem('theme');                                        // Check localstorage for theme preferences stored
    const [ theme, setTheme ] = useState( storagedTheme ? storagedTheme : body.dataset.theme ); // Theme: Light or Dark
    
    if( storagedTheme ) { body.dataset.theme = storagedTheme }                                  // If exist assign any localstoraged theme

    /****** Body and Navbar Theme ******/
    const handleTheme = () => {
        const navbar = document.getElementById('navbar');

        switch ( theme ) {
            case 'light': body.dataset.theme='dark'; navbar.dataset.theme='dark'; localStorage.setItem('theme', 'dark'); setTheme('dark'); break;
            case 'dark': body.dataset.theme='light'; navbar.dataset.theme='light'; localStorage.setItem('theme', 'light'); setTheme('light'); break;
            default: body.dataset.theme='light'; navbar.dataset.theme='light'; localStorage.setItem('theme', 'light'); setTheme('light'); break;
        }
        // document.getElementById('collapsibleNavbar').classList.remove('show');
    }

    return [ theme, handleTheme ]
}