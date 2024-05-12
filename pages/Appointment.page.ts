import { expect, Locator, Page } from "@playwright/test";
import * as selectors from "../utils/selectors.json";

export default class AppointmentPage {

    readonly page : Page;

    constructor(page: Page) {

        this.page = page;
       
    }

    async selectDropdownOption(optionText: string) {
         const dropdown = await this.page.$(selectors.AppointmentPage.dropDown);
         if (!dropdown)
         throw new Error('Dropdown element not found');
         await dropdown.selectOption({ value: optionText });

    }
   
    async checkCheckbox() {
       const checkbox = await this.page.$(selectors.AppointmentPage.checkBox);
       await checkbox?.check();
    }

    async selectCommonValueForRadioButtons(commonValue: string) {
        const radioButtons = await this.page.$$(selectors.AppointmentPage.radioButton);
        for (const radioButton of radioButtons) {
            await radioButton.check();
          }
      
    }
    async verifyRadioButtonsHaveValue(commonValue: string) {
        const radioButtons = await this.page.$$(selectors.AppointmentPage.radioButton);
        for (const radioButton of radioButtons) {
          const value = await radioButton.evaluate((radio: HTMLInputElement) => radio.value);
          expect(value).toBe(commonValue);
        }
      }
    
    async comments(commentVal: string) {

       await this.page.locator(selectors.AppointmentPage.textComment).fill(commentVal);
        
    }

    async selectVisitDate(date: Date) {
        // Convert the date to the desired format expected by the date picker
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        const dateString = `${day}/${month}/${year}`;
        const datePickerInput = await this.page.$(selectors.AppointmentPage.datePicker);
        if (!datePickerInput)
            throw new Error('Date picker input element not found');
        await datePickerInput.type(dateString);
        await datePickerInput.press('Enter');
    }

   async bookingButton (){
    await this.page.locator(selectors.AppointmentPage.submitButton).click();
   }
}