"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as puppeteer from "puppeteer-core";
const fs_1 = require("fs");
const config_service_1 = require("./config.service");
const puppeteer = require("puppeteer");
const HOME = require("os").homedir();
const CHROME_CONFIG_PATH = `${HOME}/.config/urenlog`;
if (!fs_1.existsSync(CHROME_CONFIG_PATH)) {
    fs_1.mkdirSync(CHROME_CONFIG_PATH);
}
const now = new Date();
const day = ("0" + now.getDate()).slice(-2);
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const today = now.getFullYear() + "-" + month + "-" + day;
const args = require("yargs") // eslint-disable-line
    .example('$0 -d "2018-08-03" -h 8 -t "Device Prototyping" "Making Sense of Quantum Neural Blockchain AI"')
    .command("$0 [notes]", "Submit log", (yargs) => {
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
    .boolean("s")
    .alias("s", "dry")
    .describe("s", "Dry run")
    .boolean("k")
    .alias("k", "headmore")
    .describe("k", "Run with browser (not headless)")
    .alias("d", "date")
    .nargs("d", 1)
    .describe("d", "date of work (default is todays date)")
    .default("d", `${today}`).argv;
(async () => {
    const config = new config_service_1.ConfigService();
    try {
        const browser = await puppeteer.launch({
            headless: !args.headmore,
            userDataDir: CHROME_CONFIG_PATH
        });
        const page = await browser.newPage();
        await page.goto(config.FORM_URL);
        await page.waitForXPath("//div[contains(text(), 'CTcue hours registration')]");
        delay(100);
        // const date = (await page.$x("//input[@type='date']"))[0];
        // await page.evaluate(() => {
        //     let input = document.querySelector("input[type='date']");
        //     if (!input) {
        //         return;
        //     }
        //     input.setAttribute("type", "text");
        //     return;
        // });
        // await date.type(args.date);
        // const work = (await page.$x(`//span[contains(text(), '${args.workType}')]`))[0];
        // await work.click();
        // const hours = (await page.$x("//input[contains(@aria-label, 'Hours')]"))[0];
        // await hours.type(args.hours.toString());
        // const notes = (await page.$x("//textarea[contains(@aria-label, 'Notes about work')]"))[0];
        // await notes.type(args.notes);
        // await delay(1000);
        // if (args.dry) {
        //     await browser.close();
        //     return;
        // }
        // // TODO: Also check for 'Verzenden' (dutch variant) -- ala search for different thing than the label
        // const submit = (await page.$x("//span[contains(text(), 'Submit')]"))[0];
        // await submit.click();
        // await page.waitForXPath("//div[contains(text(), 'Lekker hoor!')]");
        // console.log("Done.");
        // await browser.close();
    }
    catch (error) {
        console.log(error);
    }
})();
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
//# sourceMappingURL=main.js.map