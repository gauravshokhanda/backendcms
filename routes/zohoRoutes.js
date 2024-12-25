const express = require("express");
const axios = require("axios");

const router = express.Router();

// Function to refresh Zoho token
const refreshZohoToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          refresh_token: process.env.ZOHO_REFRESH_TOKEN,
          client_id: process.env.ZOHO_CLIENT_ID,
          client_secret: process.env.ZOHO_CLIENT_SECRET,
          grant_type: "refresh_token",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error refreshing Zoho token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to add a lead to Zoho CRM
const addLeadToZoho = async (leadData) => {
  const accessToken = await refreshZohoToken();

  try {
    const response = await axios.post(
      "https://www.zohoapis.com/crm/v2/Leads", // Corrected API URL
      { data: [leadData] },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding lead to Zoho CRM:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Route to handle lead submission
router.post("/add-lead", async (req, res) => {
  const { name, email, phone, source, message, newsletter } = req.body;

  const leadData = {
    Last_Name: name, // Zoho requires Last Name
    Email: email,
    Phone: phone,
    Lead_Source: source,
    Description: message,
    Newsletter_Opt_In: newsletter ? "Yes" : "No",
  };

  try {
    const result = await addLeadToZoho(leadData);
    res
      .status(200)
      .send({ success: true, message: "Lead added successfully", result });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to add lead",
        error: error.message,
      });
  }
});

module.exports = router;
