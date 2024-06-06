import { Given,When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import AccountsServicesPage from "../../pages/accountsServicesPage";
import { fixture } from "../../hooks/pageFixture";
import { loggers } from "winston";
import { expect } from "@playwright/test";

let accountsServicesPage : AccountsServicesPage
let accountnumber: string

When('User clicks on Open New Account button', async function () {
    accountsServicesPage = new AccountsServicesPage(fixture.page);
    await accountsServicesPage.clickOpenNewAccount();
});


When('User Selects Savings Account type and click open new account button', async function () {
    await accountsServicesPage.selectSavingsAccount();
    await fixture.page.waitForTimeout(1000);
    await accountsServicesPage.clickOpenNewAccountButton();
    await fixture.page.waitForTimeout(2000);
    fixture.logger.info("Waiting for 2 seconds")
});


Then('Account should be created', async function () {
    await accountsServicesPage.isAccountOpened();
    accountnumber = await accountsServicesPage.grabAccountid();

});

Given('User has opened new account', async function () {
    accountsServicesPage = new AccountsServicesPage(fixture.page);

});


When('User selects accounts overview', async function () {
   await accountsServicesPage.clickAccountOverviewButton();
   await fixture.page.waitForTimeout(2000);
});



Then('Account should exist in the accounts overview', async function () {
    accountsServicesPage.isNumberInAccountTable(accountnumber);
});