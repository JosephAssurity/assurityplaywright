import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";


export default class HomePage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        userInput: "[name='username']",
        passwordInput: "[name = password]",
        loginBtn: "input[value='Log In']",
        errorMessage: ".error",
        accountServices: "h2"
    }

    async navigateToHomePage() {
        await this.base.goto("https://parabank.parasoft.com/parabank/index.htm")
    }
    async enterUserName(user: string) {
        await this.page.locator(this.Elements.userInput).fill(user);
    }
    async enterPassword(Password: string) {
        await this.page.locator(this.Elements.passwordInput).fill(Password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements.loginBtn);
    }

    async getErrorMessage(): Promise<string> {
        return this.page.locator(this.Elements.errorMessage).textContent();
    }
    async isLoggedIn() {
        expect(await this.page.locator(this.Elements.accountServices)).toHaveText("Account Services");
    }
    async assertIncorrectCredentials(){
        //Wait for error message
        await this.page.locator(this.Elements.errorMessage).waitFor();
        const errorMessage = await this.getErrorMessage();
        if(errorMessage === "Please enter a username and password."){
        } else{    
            expect(errorMessage).toBe("The username and password could not be verified.");
        }
    }


    async loginUser(user: string, password: string) {
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }


}