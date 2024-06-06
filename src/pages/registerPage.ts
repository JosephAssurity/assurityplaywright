import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class RegisterPage {

    private base: PlaywrightWrapper;
    
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }


    private Elements = {
        fName: "id=customer.firstName",
        lName: "id=customer.lastName",
        Address: "id=customer.address.street",
        City: "id=customer.address.city",
        State: "id=customer.address.state",
        zipCode: "id=customer.address.zipCode",
        phoneNum: "id=customer.phoneNumber",
        SSN: "id=customer.ssn",
        userName: "id=customer.username",
        Password: "id=customer.password",
        Confirm: "id=repeatedPassword",
        regBtn: "input[value='Register']",
        welcomeTitle: "//div[@id='rightPanel']//h1[1]", //title welcoming registered user
        welcomeMessage: "//div[@id='rightPanel']//p[1]",
        registerExistingUserNameError: "//table[@class='form2']//span[1]",

    }

    

    async navigateToRegisterPage() {
        await this.base.goto("https://parabank.parasoft.com/parabank/register.htm")
    }


    async registerUser(firstname: string, lastname: string, address: string,
        city: string, state: string, zipcode: string, phonenum: string, ssn: string, username: string,
        password: string, confirmPassword: string,
        ) {
        await this.page.locator(this.Elements.fName).fill(firstname);
        await this.page.locator(this.Elements.lName).fill(lastname);
        await this.page.locator(this.Elements.Address).fill(address);
        await this.page.locator(this.Elements.City).fill(city);
        await this.page.locator(this.Elements.State).fill(state);  
        await this.page.locator(this.Elements.zipCode).fill(zipcode);  
        await this.page.locator(this.Elements.phoneNum).fill(phonenum);  
        await this.page.locator(this.Elements.SSN).fill(ssn);  
        await this.page.locator(this.Elements.userName).fill(username);  
        await this.page.locator(this.Elements.Password).fill(password);  
        await this.page.locator(this.Elements.Confirm).fill(confirmPassword);     
    }

    async clickRegister(){
        await this.page.locator(this.Elements.regBtn).click();
    }

    async isRegisterSuccessful(expectedUserName){
        await this.page.waitForSelector(this.Elements.welcomeTitle);
    
        const welcomeTitle = await this.page.locator(this.Elements.welcomeTitle);
        const welcomeMessage = await this.page.locator(this.Elements.welcomeMessage);

        expect(welcomeTitle).toHaveText(`Welcome ${expectedUserName}`);
        expect(welcomeMessage).toHaveText('Your account was created successfully. You are now logged in.');
    }
    async isExistingUserName(){
        await this.page.waitForSelector(this.Elements.registerExistingUserNameError);
        const errorMessage = await this.page.locator(this.Elements.registerExistingUserNameError)
        expect(errorMessage).toHaveText('This username already exists.');
    }
    async isEmptyUserName(){
        await this.page.waitForSelector(this.Elements.registerExistingUserNameError);
        const errorMessage = await this.page.locator(this.Elements.registerExistingUserNameError)
        expect(errorMessage).toHaveText('Username is required.');
    }
    

}

