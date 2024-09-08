import { chromium } from "playwright";
import { parsifyJson, tofile } from "./tofile.js";
async function main() {
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

  await page.fill(searchBar, "software developer");

  await page.press(searchBar, "Enter");

  //   const jobcontainer = page.getByTestId("indeedApply");
  // prettier-ignore
  const div = page.locator("[id=mosaic-provider-jobcards]");

  const itterater = await div.evaluate(() => {
    const arr = [];
    Array.from(document.getElementsByClassName("slider_container")).map((a) => {
      if (a.innerHTML.includes("Easily apply")) {
        const joblink = a.querySelector("a[href]");
        const jobTitle = a.querySelector("h2,h3");

        if (joblink && jobTitle) {
          arr.push({ jobname: jobTitle.innerText.trim(), link: joblink.href });
        }
      }
    });

    return arr;
  });

  // Convert the results to JSON and save to a file
  const jsonJobs = parsifyJson(itterater);
  tofile(jsonJobs);

  //   await browser.close();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Execute the main function
try {
  main();
} catch (error) {
  console.log(error);
}
