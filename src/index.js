import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './Component/App';
import configureStore from './Store/configureStore';
import { BrowserRouter } from 'react-router-dom';

const { store } = configureStore();


// ReactDOM.render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Provider>,
//     document.getElementById('root')
// );
const root = document.getElementById('root');
createRoot(root).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);