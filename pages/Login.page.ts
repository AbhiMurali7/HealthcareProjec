import { Page } from "@playwright/test";
import * as selectors from "../utils/selectors.json";

export default class LoginPage {

    constructor(public page: Page) {
    }

    async clickMakeAppointment(){
        await this.page.click(selectors.LoginPage.makeAppointmentButton);
    }

    async enterUsername(username: string) {
        await this.page.locator(selectors.LoginPage.usernameInput).fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(selectors.LoginPage.passwordInput).fill(password);
    }


    async clickLoginButon() {
        await this.page.click(selectors.LoginPage.loginButton);
    }

    get getErrorMessage() {
        return this.page.locator(selectors.LoginPage.errorMessage).textContent();
    }

    get getSuccessMessage() {
        return this.page.locator(selectors.LoginPage.pageTitle).textContent();
    }

}