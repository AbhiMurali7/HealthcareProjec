import { expect, Locator, Page } from "@playwright/test";
import * as selectors from "../utils/selectors.json";

export default class ConfirmationPage{

    readonly page : Page;

    constructor(page: Page) {

        this.page = page;
       
    }

    async ConfirmationMessage(){
        return this.page.locator(selectors.ConfirmationPage.successMessage).textContent();
    }
    
    async FacilityVal(){
        return this.page.locator(selectors.ConfirmationPage.facilityVal).textContent();
    }

    async readmissionCheck(){
        return this.page.locator(selectors.ConfirmationPage.checkBoxVal).textContent();
    }

    async programRadio(){
        return this.page.locator(selectors.ConfirmationPage.radioButtonVal).textContent();
    }

    async visitDate(){
        return this.page.locator(selectors.ConfirmationPage.datePickerVal).textContent();
    }

    async bookingComment(){
        return this.page.locator(selectors.ConfirmationPage.commentVal).textContent();
    }

    

}