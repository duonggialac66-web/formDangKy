export async function appendToGoogleSheet(data: any[]) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("⚠️ Google Sheets Webhook URL is not configured in .env");
    return { success: false, error: "Missing Webhook URL" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error("Google Sheets Webhook Error:", errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error("Google Sheets Connection Error:", error);
    return { success: false, error };
  }
}
