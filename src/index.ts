import { createNodeFromObject } from './core/vdom/create-node-from-object';

import App from './App';

document.querySelector('#app').appendChild(createNodeFromObject(App));
