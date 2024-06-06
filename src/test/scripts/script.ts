import { Page } from "@playwright/test";
import { chromium } from "@playwright/test";
import RegisterPage from "../../pages/registerPage";
 
(async () => {
    // Launch the browser
    const browser = await chromium.launch({ headless: false }); // set headless to false to see the browser actions
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);

    // Navigate to the website's sign up sheet
    await page.goto('https://parabank.parasoft.com/parabank/register.htm');

    // Fill in the registration form
    
    await registerPage.registerUser("John", "Smith", "SmithAddress", "Smith", 
        "Orlando", "123", "123", "123", 'demo', 
        'demo123', 'demo123');
    
    await registerPage.clickRegister();
    await page.waitForTimeout(2000);

    // Close the browser
    await browser.close();
})();