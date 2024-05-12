
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',

  timeout: 60 * 1000 * 5,
  fullyParallel: true,
  retries: 0,
   reporter: [
    ["dot"],
    [
      "json",
      {
        outputFile: "jsonReports/jsonReport.json",
      },
    ],
    [
      "html",
      {
        open: "never",
      },
    ],
  ],
   use: {
    baseURL: "https://katalon-demo-cura.herokuapp.com/",
    screenshot: "on",
    trace: 'on',
    video: 'on',
    headless: false
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome'  },
    },
 
  ]

  
});
