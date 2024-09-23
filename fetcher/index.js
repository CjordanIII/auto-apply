import dotenv from "dotenv";
import express from "express";
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
import connectDB from "../db/connectTodb.js";
import Jobs from "../db/models/Jobs.js";

dotenv.config({path:"../../auto-apply/.env"});

const app = express();
chromium.use(stealth());

const SBR_CDP = `${process.env.BRIGHT_DATA_LINK}`;

async function main(jobtitle) {
  // Launch a new instance of a Chromium browser with headless mode
  // disabled for visibility
  console.log("connecting to browser");
  const browser = await chromium.connectOverCDP(SBR_CDP);

  // Create a new Playwright context to isolate browsing session
  console.log("opening up browser");
  const context = await browser.newContext();
  // Open a new page/tab within the context
  console.log("creating new page");
  const page = await context.newPage();

  // Navigate to the GitHub topics homepage
  console.log("going to indeed");
  await page.goto("https://www.indeed.com/");

  // Wait for 1 second to ensure page content loads properly
  await page.waitForTimeout(1000);

  // get search bar
  const searchBar = "#text-input-what";
  console.log("searching for job");
  await page.fill(searchBar, jobtitle);

  await page.press(searchBar, "Enter");

  const nextPageBtn = "pagination-page-next";
  const div = page.locator("[id=mosaic-provider-jobcards]");
  // todo put this in another file

  // next page
  let hasNexPage = true;
  let count = 0;
  console.log("adding stuff to stack");
  while (hasNexPage && count < 1000000) {
    await getLinks(div);
    const nextPage = page.getByTestId(nextPageBtn);
    const isDisabled = await nextPage.evaluate((btn) => btn.disabled);
    if (!nextPage || isDisabled) {
      hasNexPage = false;
    } else {
      await nextPage.click();
      console.log(count);
      await page.waitForLoadState("domcontentloaded");
      count++;
    }
  }
  await browser.close();
}

const getLinks = async (div) => {
  const jobs = await div.evaluate(() => {
    // jobs data arr
    const arr = [];
    // sort divs of jobs and get only easy apply and the name
    Array.from(document.getElementsByClassName("slider_container")).map((a) => {
      // todo recursion

      if (a.innerHTML.includes("Easily apply")) {
        // if the div have easy apply then get the link and job title
        const joblink = a.querySelector("a[href]");

        const jobTitle = a.querySelector("h2,h3");
        // if theses exest add them to the array
        if (joblink && jobTitle) {
          try {
            arr.push({
              jobname: jobTitle.innerText.trim(),
              link: joblink.href,
            });

            console.log("Saved job");
          } catch (error) {
            console.log(error, "Job");
          }
        }
      }
    });
    return arr;
  });
  console.log("add jobs to db");
  for (let job of jobs) {
    try {
      const newjob = new Jobs({
        jobname: job.jobname,
        link: job.link,
      });

      await newjob.save();
      console.log(`Saved job: ${job.jobname}`);
    } catch (error) {
       
      console.log(error);
    }
  }
};
// Execute the main function
try {
  connectDB();
  app.listen(3000, () => console.log("server running on port 3000"));
  main("software developer");
} catch (error) {

  console.log(error);
}
