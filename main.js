// const ul = document.createElement('ul')
// let fragment = document.createDocumentFragment();
// let browsers = ['Firefox', 'Chrome', 'Opera',
//     'Safari', 'Internet Explorer'];

// browsers.forEach(function(browser) {
//     let li = document.createElement('li');
//     li.textContent = browser;
//     fragment.appendChild(li);
// });
// ul.appendChild(fragment);
// document.body.appendChild(ul)
import {displayAppName,Form} from './AppComponents.js'
import { AppStorage } from "./AppStorage.js";

const appComponents = [displayAppName(),Form.createForm()]
const fragment = document.createDocumentFragment();
appComponents.forEach(com=>{
    fragment.appendChild(com)
})




document.body.appendChild(fragment);
