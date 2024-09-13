import dotenv from "dotenv";
import express from "express";
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
import connectDB from "../db/connectTodb.js";
import User from "../db/models/User.js";
dotenv.config({ path: "../.env" });

const app = express();
chromium.use(stealth());
const password = process.env.BRIGHT_DATA_PASSWORD;
const username = process.env.BIRGHT_DATA_USER;
const AUTH = `${username}:${password}`;
const SBR_CDP = `wss://${AUTH}@brd.superproxy.io:9222`;

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

  const jobsData = await User.find({});
  const page = await context.newPage();
  console.log(jobsData);
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
