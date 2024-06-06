import { Given, When, Then } from "@cucumber/cucumber";
import RegisterPage from "../../pages/registerPage";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../helper/wrapper/assert";
import * as data from "../../helper/util/test-data/registerUser.json";


let registerPage: RegisterPage;
let assert: Assert;

let username = data.userName + Date.now().toString(); 

Given('User clicks on register link', async function () {
    registerPage = new RegisterPage(fixture.page);
    assert = new Assert(fixture.page);
    await registerPage.navigateToRegisterPage();
});

When('user enters all valid sign up details', async function () {
    //Create unique enterUserName
    await registerPage.registerUser(data.firstName, data.lastName, data.address, data.city, 
        data.state, data.zipCode, data.phoneNumber, data.SSN, username, 
        data.password, data.confirmPassword);
    username = username;
});

When('user clicks on register button', async function () {
    await registerPage.clickRegister();

});

Then('valid user should be created', async function () {
    await registerPage.isRegisterSuccessful(username);
});

When('user enters valid sign up details but without a username', async function() {
    await registerPage.registerUser(data.firstName, data.lastName, data.address, data.city, 
        data.state, data.zipCode, data.phoneNumber, data.SSN, '', 
        data.password, data.confirmPassword);
});
Then('error message should pop up', async function(){
    await registerPage.isEmptyUserName();
});

When('user enters valid sign up details but with a existing username as {string}', async function (username) {
    await registerPage.registerUser(data.firstName, data.lastName, data.address, data.city, 
        data.state, data.zipCode, data.phoneNumber, data.SSN, 'demo', 
        'demo123', 'demo123');
});
Then('error already exist message should pop up', async function () {
    await registerPage.isExistingUserName;
});