import { apiUrl } from "../config";

export const submitData = async (formData) => {
  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};

export const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
