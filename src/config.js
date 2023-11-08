const config = {
  SOCIAL_AUTH_BACKEND_URL: process.env.SOCIAL_AUTH_BACKEND_URL || "",
  SOCIAL_AUTH_LINKEDIN_APP_ID: process.env.SOCIAL_AUTH_LINKEDIN_APP_ID || "",
  SOCIAL_AUTH_LINKEDIN_APP_SECRET:
    process.env.SOCIAL_AUTH_LINKEDIN_APP_SECRET || "",
  SOCIAL_AUTH_INSTAGRAM_APP_ID: process.env.SOCIAL_AUTH_INSTAGRAM_APP_ID || "",
  SOCIAL_AUTH_INSTAGRAM_APP_SECRET:
    process.env.SOCIAL_AUTH_INSTAGRAM_APP_SECRET || "",
  SOCIAL_AUTH_FB_APP_ID: process.env.SOCIAL_AUTH_FB_APP_ID || "",
  SOCIAL_AUTH_TWITTER_V2_APP_KEY:
    process.env.SOCIAL_AUTH_TWITTER_V2_APP_KEY || "",
  SOCIAL_AUTH_REDIRECT_URI: process.env.SOCIAL_AUTH_REDIRECT_URI || "",
};

export default config;
