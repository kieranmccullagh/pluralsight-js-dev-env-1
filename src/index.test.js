import {expect} from 'chai'; //expect style that comes with chai. Using named expect.
import jsdom from 'jsdom';
import fs from 'fs'; // fs for file system

describe('Out first test', () => { //Provide a function
  it ('should pass', () => {
    expect(true).to.equal(true); //body of the test. True should equal true.
  });
});

describe('index.html', () => { //file we want to test
  it ('should say hello', (done) =>{ //we have a hello world inside the file.Async call here. Function takes a paramemter called done. Add when jsdom part is below.
    const index = fs.readFileSync('./src/index.html', "utf-8"); //reference to html file and hold in memory. Specify that its utf8 also.
    jsdom.env(index, function(err, window) { //Definning jsdom env. Pass the index file. Call back function. Creates dom env in memory. Two parameters. err and window argument.
      const h1 = window.document.getElementsByTagName('h1')[0]; //Represents window in browser. Looking for h1 tag. Returns array like object so give first oen with 0.
      expect(h1.innerHTML).to.equal("HELLO WORLD FROM STRAYA!"); //Write asserstion. Inner html should equal the text/
      window.close(); //Close the window to free up the memory taken up by the dom.
      done();//Tell mocha that test is done. Will report results when it sees done.
    });
  })
})