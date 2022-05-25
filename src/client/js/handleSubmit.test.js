/**
 * @jest-environment jsdom
 */

import "babel-polyfill";
// Import the JavaScript file to be test tested
import { submission } from "./handleSubmit";

//test for the submission function
describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
          expect(submission).toBeDefined();
        });
    });