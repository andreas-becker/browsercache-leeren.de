require("typeface-open-sans");
const Bowser = require("bowser");

import "./style.css"

const browser = Bowser.getParser(window.navigator.userAgent);
console.log(browser.parsedResult);
document.body.classList.add(String(browser.parsedResult.os.name).toLowerCase());
document.body.classList.add(String(browser.parsedResult.platform.type).toLowerCase());
document.body.classList.add(String(browser.parsedResult.browser.name).toLowerCase());

document.getElementById('js-browsername').innerHTML = browser.parsedResult.browser.name + ' ' + browser.parsedResult.browser.version;