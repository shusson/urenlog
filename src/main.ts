import { existsSync, mkdirSync } from "fs";
import { ConfigService } from "./config.service";

const config = new ConfigService();

const puppeteer = require("puppeteer");
const HOME = require("os").homedir();
const CHROME_CONFIG_PATH = `${HOME}/.config/urenlog`;

if (!existsSync(CHROME_CONFIG_PATH)) {
    mkdirSync(CHROME_CONFIG_PATH);
}

const now = new Date();
const day = ("0" + now.getDate()).slice(-2);
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const today = now.getFullYear() + "-" + month + "-" + day;


const args = require("yargs") // eslint-disable-line
    .example(
        '$0 -d "2019-03-12" -h 8 "Making Sense of Quantum Neural Blockchain AI"'
    )
    .command("$0 [notes]", "Submit log", (yargs: any) => {
        yargs.positional("notes", {
            describe: "Notes about work",
            default: config.NOTE
        });
    })

    .help("h")
    .alias("h", "help")
    .alias("u", "hours")
    .nargs("u", 1)
    .describe("u", "Hours worked")
    .default("u", config.HOURS)
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
    try {
        const browser = await puppeteer.launch({
            // TODO: Waiting for the form submission is a bit flaky
            headless: false,
            userDataDir: CHROME_CONFIG_PATH
        });

        const page = await browser.newPage();

        await page.goto(config.FORM_URL);
        await page.waitForXPath("//div[contains(text(), 'CTcue time tracking')]");

        delay(200);

        // ---
        // Work date

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

        delay(200);

        // ---
        // Hours worked

        const hours = (await page.$x("//input[contains(@aria-label, 'Hours')]"))[0];
        await hours.type(args.hours.toString());
        delay(200);

        // ---
        // Note about work

        const notes = (await page.$x("//textarea[contains(@aria-label, 'What were you working on?')]"))[0];
        await notes.type(args.notes);
        await delay(1000);


        // ---
        // Submit the form

        if (!args.dry) {
            const submit = (await page.$x("//span[contains(text(), 'Submit')]"))[0];

            if (submit) {
                await submit.click();
            }

            await page.waitForNavigation();
        }

        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();

function delay(time: number) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}
