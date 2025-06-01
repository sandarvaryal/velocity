import axios from "axios";

export async function addTrackingInstance(
  trackingNumber: string | null,
  service: string
) {
  try {
    const { data } = await axios.post(
      `https://api.aftership.com/tracking/2025-01/trackings/`,
      { tracking_number: trackingNumber, slug: service },
      {
        headers: {
          "as-api-key": process.env.AS_API_KEY,
        },
      }
    );
    console.log("functionData", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
