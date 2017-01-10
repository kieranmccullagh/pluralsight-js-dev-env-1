import './index.css'; //Just like importing a js file. It works.
import numeral from 'numeral'; //numeral package installed at start of part of package.json

/*eslint-disable no-console*/


const courseValue = numeral(1000).format('$0,0.00'); //const set with 1000 value. Format string as course value
console.log(`I would pay ${courseValue} for this awesome course!`); //message outputted here. ` used. Tells JS to parse any variable placeholders inside.