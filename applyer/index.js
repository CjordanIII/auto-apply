import dotenv from "dotenv";
import express from "express";
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
import connectDB from "../db/connectTodb.js";
import Jobs from "../db/models/Jobs.js";
dotenv.config({ path: "../.env" });

const app = express();
chromium.use(stealth());

const SBR_CDP = `${process.env.BRIGHT_DATA_LINK}`;

async function main() {
  // Launch a new instance of a Chromium browser with headless mode
  // disabled for visibility
  console.log("connecting to browser");
  const browser = await chromium.connectOverCDP(SBR_CDP);

  // Create a new Playwright context to isolate browsing session
  console.log("opening up browser");
  const context = await browser.newContext();
  // Open a new page/tab within the context
  console.log("creating new page");

  const jobsData = await Jobs.find({});
  const page = await context.newPage();
  // using for of loop because forEach would act up
  for(const item of jobsData ){
    console.log("creating screeshot")
try {
      await page.goto(item.link);
      console.log("hold one.....")
       await page.waitForTimeout(1000);
       console.log("waiting for dom to load")
      await page.waitForLoadState("domcontentloaded");
     
    await page.click("[id='indeedApplyButton']");
       await page.screenshot({
         path: `./page_screenshots/sucess/result_${item.jobname}.png`,
         fullPage: true,
       });
       console.log("screen shot of " + item.jobname + "successful");
} catch (error) {
    await page.screenshot({
      path: `./page_screenshots/errors/result.png`,
      fullPage: true,
    });
  console.log("screenshot failded ",error)
}
    
  }
  // add data loop
  // add diffrent functions
  await browser.close();
}

// Execute the main function

try {
  connectDB();
  app.listen(3000, () => console.log("server running on port 3000"));
  main();
} catch (error) {
  console.log(error);
}
