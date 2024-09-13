// npm install axios
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const api_key = process.env.CAPSOLVER_API_KEY;
const site_key = "0x4XXXXXXXXXXXXXXXXX";
const site_url = "https://www.yourwebsite.com";

async function capsolver() {
  const payload = {
    clientKey: api_key,
    task: {
      type: "AntiTurnstileTaskProxyLess",
      websiteKey: site_key,
      websiteURL: site_url,
      metadata: {
        action: "", // optional
      },
    },
  };

  try {
    const res = await axios.post(
      "https://api.capsolver.com/createTask",
      payload
    );
    const task_id = res.data.taskId;
    if (!task_id) {
      console.log("Failed to create task:", res.data);
      return;
    }
    console.log("Got taskId:", task_id);

    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second

      const getResultPayload = { clientKey: api_key, taskId: task_id };
      const resp = await axios.post(
        "https://api.capsolver.com/getTaskResult",
        getResultPayload
      );
      const status = resp.data.status;

      if (status === "ready") {
        return resp.data.solution.token;
      }
      if (status === "failed" || resp.data.errorId) {
        console.log("Solve failed! response:", resp.data);
        return;
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

capsolver().then((token) => {
  console.log(token);
});
