import fs from "fs";

export const tofile = (d) => {
  fs.writeFile("jobdata.json", d, (err, data) => {
    if (err) throw new Error(err);
    console.log("file data was saved");
  });
};

export const parsifyJson = (data) => {
  try {
    // If the data is already an object, convert it to JSON string
    if (typeof data === "object") {
      return JSON.stringify(data);
    }

    // If the data is a string, parse it as JSON
    return JSON.parse(data);
  } catch (error) {
    console.error("Invalid JSON data:", error);
    return null;
  }
};
