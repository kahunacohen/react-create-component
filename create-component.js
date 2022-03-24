const fs = require("fs");
const path = require("path");

function write(path, str) {
    console.log(str);
    fs.writeFileSync(path, tmpl);
}

function createComponent(name, pth) {
    const str = `
import {useState, useEffect} from "react";
import {${name}Props} from "./types";
import { getGreeting } from "./functions";


export default function ${name}(props: ${name}Props) {
    const [stateVar, setStateVar] = useState("");
    useEffect(() => {
        (async () => {
            getGreeting("Jerry");
        })();
        }, []);

    // Return JSX here.
    return null;
}`
    fs.writeFileSync(path.join(pth, "index.ts"), str);
}
function createType(name, pth) {
    const str = `
/**
 * Interfaces/types go here.
 */
export interface ${name}Props {
    foo: string;
}`;
    fs.writeFileSync(path.join(pth, "types.ts"), str);
}

function createFunction(name, pth) {
    const str = `
/**
 * Functions not operating on component state go here.
 */

 export function getGreeting(name: string): string  {
     return "Hello, " + name;
 }`;
    fs.writeFileSync(path.join(pth, "functions.ts"), str);
}

function createTest(name, pth) {
    const str = `
import { getGreeting } from "./functions";


describe("${name}", () => {
    describe("functions", () => {
        describe("getGreeting", () => {
            it("returns a greeting", () => {
                expect(getGreeting("Bob")).toEqual("Hello, Bob");
            });
        });
    });
});`;

    fs.writeFileSync(path.join(pth, `${name.toLowerCase()}.test.ts`), str);
}

function create(name, pth) {
    const normalizedPath = path.join(path.normalize(pth), name).toLowerCase();
    fs.mkdirSync(normalizedPath, { recursive: true });
    createComponent(name, normalizedPath);
    createType(name, normalizedPath);
    createFunction(name, normalizedPath);
    createTest(name, normalizedPath);
}

create("MyThing", "./template");