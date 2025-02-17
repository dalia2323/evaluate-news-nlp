import { updateUI } from '../js/updateUI';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    test('Checking if UI is updated properly with results of API call', () => {
        const dom = new JSDOM(`<div id="results"></div>`);
        const content = { confidence: "100",score_tag: "P", subjectivity: "SUBJECTIVE", irony: "NONIRONIC" };
        const element = dom.window.document.getElementById('results');
        
        updateUI(element, content);
        expect(element.innerHTML).toBe(`<strong>Confidence: </strong>100<br>
        <strong>Score tag: </strong>P<br>
        <strong>Subjectivity: </strong>SUBJECTIVE<br>
        <strong>Irony: </strong>NONIRONIC`
        );
    });
});