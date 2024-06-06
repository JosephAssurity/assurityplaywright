import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";


export default class AccountsServicesPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }
    private Elements = {
        openNewAccount: "(//div[@id='leftPanel']//a)[1]",
        accountType: '#type',
        openNewAccountButton: 'Open New Account',
        openAccountResult: "//div[@id='openAccountResult']//p[1]",
        newAccountID: "#newAccountId",
        accountOverviewTable: "id=accountTable",
        accountOverviewButton: "(//div[@id='leftPanel']//a)[2]",
        accountOverviewByRow: '#accountTable tbody tr',
        transferFund:'Transfer Funds',
        transferAmount: '#amount',
        transferFrom: '#fromAccountId',
        transferTo: '#toAccountId',
        transferButton: 'Transfer',
        amountResult: "id=amountResult",

    }
    async clickOpenNewAccount() {
        await this.page.locator(this.Elements.openNewAccount).click();
    }
    async clickAccountOverviewButton(){
        await this.page.locator(this.Elements.accountOverviewButton).click();
    }
    async selectSavingsAccount(){
        await this.page.locator(this.Elements.accountType).selectOption('1');
    }
    async clickOpenNewAccountButton(){
        await this.page.getByRole('button', {name: this.Elements.openNewAccountButton}).click();
    }
    async isAccountOpened(){
        expect(this.page.locator(this.Elements.openAccountResult)).toHaveText('Congratulations, your account is now open.');
    }
    async fetchNumbersInAccountTable(){
        return this.page.locator(this.Elements.accountOverviewTable);

    }
    async grabAccountid(){
        const id = await this.page.locator(this.Elements.newAccountID).textContent();
        return id;
    }
    async isNumberInAccountTable(accountnumber){
        const numberToCompare = await this.fetchNumbersInAccountTable()
        const regex = new RegExp(accountnumber, 'i');
        expect(numberToCompare).toHaveText(regex);
    }
    async isThereMultipleAccounts(){
        const accountRowsLocator = this.page.locator(this.Elements.accountOverviewByRow);
        const accontCount = await accountRowsLocator.count() - 1;
        if(accontCount <= 1){
            await this.clickOpenNewAccount();
            await this.selectSavingsAccount();
            await this.page.waitForTimeout(1000);
            await this.clickOpenNewAccountButton();
            await this.page.waitForTimeout(2000);
            await this.clickAccountOverviewButton();
        }
    }
    async transferFund(amount){
        await this.page.getByRole('link', {name: this.Elements.transferFund}).click();
        await this.page.locator(this.Elements.transferAmount).fill(amount);
        await this.page.locator(this.Elements.transferFrom).selectOption({index:0});
        await this.page.locator(this.Elements.transferTo).selectOption({index:1});
        await this.page.getByRole('button', { name: this.Elements.transferButton }).click();
        await this.page.waitForTimeout(1000);
    }
    async isTransferFundCorrect(amount){
        const amountResult = this.page.locator(this.Elements.amountResult)
        expect(await this.page.locator("(//h1[@class='title'])[2]")).toHaveText("Transfer Complete!");
        if(amount.includes("-")){   
            const removeNegative = amount.substring(1) 
            expect(await amountResult).toHaveText('-$'+ removeNegative +'.00');
        }else{
        expect(await this.page.locator(this.Elements.amountResult)).toHaveText('$'+ amount+'.00');
        }
    }

}