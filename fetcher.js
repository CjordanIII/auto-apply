const fetchData = async () => {
  try {
    const res = await fetch("https://www.indeed.com/");
    const data = await res.text();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

fetchData();
