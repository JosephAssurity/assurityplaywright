import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import AccountsServicesPage from "../../pages/accountsServicesPage";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import exp = require("constants");

setDefaultTimeout(60 * 1000 * 2)
let accountsServicesPage : AccountsServicesPage;
let assert : Assert;



Given('User has two accounts created', async function () {
    accountsServicesPage = new AccountsServicesPage(fixture.page);
    await fixture.page.waitForTimeout(1000);
    await accountsServicesPage.isThereMultipleAccounts();
});



When('User transfers {string} from savings to cheque account', async function (fund) {
    await accountsServicesPage.transferFund(fund);
  

});

Then('cheque account should be updated by {string} amount', async function (fund) {
    await accountsServicesPage.isTransferFundCorrect(fund);
});
