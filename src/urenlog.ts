const fs = require("fs");
import * as puppeteer from "puppeteer";

const HOME = require("os").homedir();

const DATA_PATH = `${HOME}/.config/urenlog`;

if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
}

const now = new Date();
const day = ("0" + now.getDate()).slice(-2);
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const today = now.getFullYear() + "-" + month + "-" + day;

const args = require("yargs") // eslint-disable-line
    .example(
        '$0 -d "2018-08-03" -h 8 -t "Device Prototyping" Making Sense of Quantum Neural Blockchain AI"'
    )
    .command("$0 [notes]", "Submit log", (yargs: any) => {
        yargs.positional("notes", {
            describe: "Notes about work",
            default: "Making Sense of Quantum Neural Blockchain AI"
        });
    })
    .help("h")
    .alias("h", "help")
    .alias("u", "hours")
    .nargs("u", 1)
    .describe("u", "Hours worked")
    .default("u", "8")
    .alias("t", "workType")
    .nargs("t", 1)
    .describe("t", "work type")
    .default("t", "Device prototyping")
    .alias("d", "date")
    .nargs("d", 1)
    .describe("d", "date of work (default is todays date)")
    .default("d", `${today}`).argv;

console.log(args);

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: DATA_PATH
        });
        const page = await browser.newPage();
        await page.goto("https://goo.gl/forms/q5rOgWnFgQ7msXeG3");

        await page.waitForXPath("//div[contains(text(), 'CTcue hours registration')]");

        const date = (await page.$x("//input[@type='date']"))[0];

        await page.evaluate(() => {
            let input = document.querySelector("input[type='date']");
            if (!input) {
                return;
            }
            input.setAttribute("type", "text");
            return;
        });

        await date.type(args.date);

        const work = (await page.$x(`//span[contains(text(), '${args.workType}')]`))[0];
        await work.click();

        const hours = (await page.$x("//input[contains(@aria-label, 'Hours')]"))[0];
        await hours.type(args.hours.toString());

        const notes = (await page.$x("//textarea[contains(@aria-label, 'Notes about work')]"))[0];
        await notes.type(args.notes);
        await delay(1000);

        await browser.close();
    } catch (error) {
        console.log(error);
    }

    function delay(time: number) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time);
        });
    }
})();
