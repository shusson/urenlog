const fs = require("fs");
import * as puppeteer from "puppeteer";

const HOME = require("os").homedir();

const DATA_PATH = `${HOME}/.config/urenlog`;

if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
}

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

        const now = new Date();
        const day = ("0" + now.getDate()).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        const today = now.getFullYear() + "-" + month + "-" + day;

        await page.evaluate(() => {
            let input = document.querySelector("input[type='date']");
            if (!input) {
                return;
            }
            input.setAttribute("type", "text");
            return;
        });

        await date.type(today);
        await delay(1000);

        const work = (await page.$x("//span[contains(text(), 'Device prototyping')]"))[0];
        await work.click();

        const hours = (await page.$x("//input[contains(@aria-label, 'Hours')]"))[0];
        await hours.type("8");

        const notes = (await page.$x("//textarea[contains(@aria-label, 'Notes about work')]"))[0];
        await notes.type("fred");

        await browser.close();
    } catch (error) {}

    function delay(time: number) {
        return new Promise(function(resolve) {
            setTimeout(resolve, time);
        });
    }
})();
