import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import HomePage from "../../pages/homePage";
import AccountsServicesPage from "../../pages/accountsServicesPage";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";

setDefaultTimeout(60 * 1000 * 2)
let homePage : HomePage;
let assert : Assert;

Given('User navigates to the application', async function () {
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the application")
    homePage = new HomePage(fixture.page);
})


Given('User enter the username as {string}', async function (username) {
    await homePage.enterUserName(username);
});

Given('User enter the password as {string}', async function (password) {
    await homePage.enterPassword(password);
})

When('User click on the login button', async function () {
    await homePage.clickLoginButton();
    await fixture.page.waitForLoadState();
    fixture.logger.info("Waiting for 2 seconds")
    await fixture.page.waitForTimeout(2000);
});


Then('Login should be success', async function () {
    await homePage.isLoggedIn();
})

When('Login should fail', async function () {
    await homePage.assertIncorrectCredentials();
});
