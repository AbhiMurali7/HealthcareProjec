import { test, expect } from "@playwright/test";
import * as users from "../data/credentials.json";
import * as bookingData from "../data/testdata.json"
import PageManager from "../pages/pageManager.page";

test.describe("Booking Appointment @book", async () => {
    
    let pm : PageManager;

    test.beforeEach(async ({ page, baseURL }) => {
         pm = new PageManager(page);
         // Navigate to the page
        await page.goto(`${baseURL}`);
        await pm.LoginPage().clickMakeAppointment();
    })

    test.skip("Positive: Navigate to the appointment booking page and Check if the appointment details are displayed in the appointment history. ", async ({ page }) => {

        await pm.LoginPage().enterUsername(users.valid.username);
        await pm.LoginPage().enterPassword(users.valid.password);
        await pm.LoginPage().clickLoginButon();

        //Booking the Appointment Page
        await pm.appPage().selectDropdownOption(bookingData.test1.dropdown);
        await pm.appPage().checkCheckbox();
          // Select a common value for all radio buttons
        await pm.appPage().selectCommonValueForRadioButtons(bookingData.test1.radioButton);
         // Verify that all radio buttons have the common value selected
        await pm.appPage().verifyRadioButtonsHaveValue(bookingData.test1.radioButton);
        // Change this to the desired date
        const dateToSelect = new Date(bookingData.test1.date); 
        await pm.appPage().selectVisitDate(dateToSelect);
        await pm.appPage().comments(bookingData.test1.textComment);
        await pm.appPage().bookingButton();    
        // Confirmation Page
        expect (await pm.confirmPage().ConfirmationMessage()).toBe('Appointment Confirmation');
        expect(await pm.confirmPage().FacilityVal()).toBe(bookingData.test1.dropdown);
        await pm.confirmPage().readmissionCheck();
        expect(await pm.confirmPage().programRadio()).toBe(bookingData.test1.radioButton);
        const actualDate = await pm.confirmPage().visitDate();
        console.log(actualDate);
        expect(bookingData.test1.expectedDate).toBe(actualDate)
        expect(await pm.confirmPage().bookingComment()).toBe(bookingData.test1.textComment);
       
    });
    
    test("Negative: Booking the Appointment on past date", async ({ page }) => {

        await pm.LoginPage().enterUsername(users.valid.username);
        await pm.LoginPage().enterPassword(users.valid.password);
        await pm.LoginPage().clickLoginButon();

        //Booking the Appointment Page
        await pm.appPage().selectDropdownOption(bookingData.test3.dropdown);
        await pm.appPage().checkCheckbox();
          // Select a common value for all radio buttons
        await pm.appPage().selectCommonValueForRadioButtons(bookingData.test3.radioButton);
         // Verify that all radio buttons have the common value selected
        await pm.appPage().verifyRadioButtonsHaveValue(bookingData.test3.radioButton);
        // Change this to the desired date
        const dateToSelect = new Date(bookingData.test3.date); 
        await pm.appPage().selectVisitDate(dateToSelect);
        await pm.appPage().comments(bookingData.test3.textComment);
        await pm.appPage().bookingButton();    
        // Confirmation Page
        expect (await pm.confirmPage().ConfirmationMessage()).toBe('Appointment Confirmation');
        expect(await pm.confirmPage().FacilityVal()).toBe(bookingData.test3.dropdown);
        await pm.confirmPage().readmissionCheck();
        expect(await pm.confirmPage().programRadio()).toBe(bookingData.test3.radioButton);
        const actualDate = await pm.confirmPage().visitDate();
        console.log(actualDate);
        expect(bookingData.test3.expectedDate).toBe(actualDate)
        expect(await pm.confirmPage().bookingComment()).toBe(bookingData.test3.textComment);
       
    });

})