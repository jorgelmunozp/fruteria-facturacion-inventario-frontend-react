import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from './components/icons/logo/Logo.js';
import { myColor } from './global.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';

import './assets/styles/styles.css';

const preloadApp = import('./App.js'); // Preload the App component to improve initial load time
const App = lazy(() => preloadApp);

const root = createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div style={{display:'flex', height:'100vh', width:'100%', alignItems:'center', justifyContent:'center', animation:'splash 0.75s linear infinite' }}><Logo height={10} width={10} strokeWidth={0.25} color={myColor} /></div>}>
    <App Logo={Logo} />
  </Suspense>
);
