import express from "express";
import { chromium } from "playwright";
import connectDB from "./db/connectTodb.js";
import User from "./db/models/User.js";
const app = express();

async function main(jobtitle) {
  // Launch a new instance of a Chromium browser with headless mode
  // disabled for visibility
  const browser = await chromium.launch({
    headless: false,
    slowMo: 350,
  });

  // Create a new Playwright context to isolate browsing session
  const context = await browser.newContext();
  // Open a new page/tab within the context
  const page = await context.newPage();

  // Navigate to the GitHub topics homepage
  await page.goto("https://www.indeed.com/");

  // Wait for 1 second to ensure page content loads properly
  await page.waitForTimeout(1000);

  // get search bar
  const searchBar = "#text-input-what";

  await page.fill(searchBar, jobtitle);

  await page.press(searchBar, "Enter");

  const nextPageBtn = "pagination-page-next";
  const div = page.locator("[id=mosaic-provider-jobcards]");
  // todo put this in another file

  // next page
  let hasNexPage = true;
  let count = 0;
  while (hasNexPage && count < 5) {
    await getLinks(div);
    const nextPage = page.getByTestId(nextPageBtn);
    const isDisabled = await nextPage.evaluate((btn) => btn.disabled);
    if (!nextPage || isDisabled) {
      hasNexPage = false;
    } else {
      await nextPage.click();
      await page.waitForLoadState("domcontentloaded");
    }
    console.log(count);
    count++;
  }

  //   await browser.close();
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
  console.log(jobs);
  for (let job of jobs) {
    try {
      const newUser = new User({
        jobname: job.jobname,
        link: job.link,
      });

      await newUser.save();
      console.log(`Saved job: ${job.jobname}`);
    } catch (error) {
      console.log(error);
    }
  }
  // Convert the results to JSON and save to a file
};
// Execute the main function
try {
  connectDB();
  app.listen(3000, () => console.log("server running on port 3000"));
  main("software developer");
} catch (error) {
  console.log(error);
}
