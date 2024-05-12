import { test, expect } from "@playwright/test";
import * as users from "../data/credentials.json";
import PageManager from "../pages/pageManager.page";

test.describe("Login Feature @login", async () => {
    
    let pm : PageManager;

    test.beforeEach(async ({ page, baseURL }) => {
        pm = new PageManager(page);
        await page.goto(`${baseURL}`);
        await pm.LoginPage().clickMakeAppointment();
    })

    test("Positive: User tries to login with correct credentials.", async ({ page }) => {

        await pm.LoginPage().enterUsername(users.valid.username);
        await pm.LoginPage().enterPassword(users.valid.password);
        await pm.LoginPage().clickLoginButon();
        expect(await pm.LoginPage().getSuccessMessage).toBe("Make Appointment");
    });


    test("Negative: User tries to login without credentials.", async ({ page }) => {

        await pm.LoginPage().enterUsername("");
        await pm.LoginPage().enterPassword("");
        await pm.LoginPage().clickLoginButon();
        expect(await pm.LoginPage().getErrorMessage).toBe("Login failed! Please ensure the username and password are valid.");
    });

    test("Negative: User tries to login without password.", async ({ page }) => {

        await pm.LoginPage().enterUsername(users.valid.username);
        await pm.LoginPage().enterPassword("");

        await pm.LoginPage().clickLoginButon();

        expect(await pm.LoginPage().getErrorMessage).toBe("Login failed! Please ensure the username and password are valid.");
    });

    test("Negative: User tries to login without username.", async ({ page }) => {

        await pm.LoginPage().enterUsername("");
        await pm.LoginPage().enterPassword(users.valid.password);
        await pm.LoginPage().clickLoginButon();

        expect(await pm.LoginPage().getErrorMessage).toBe("Login failed! Please ensure the username and password are valid.");
    });

    test("Negative: User tries to login with invalid credentials.", async ({ page }) => {

        await pm.LoginPage().enterUsername(users.invalid.username);
        await pm.LoginPage().enterPassword(users.invalid.password);
        await pm.LoginPage().clickLoginButon();

        expect(await pm.LoginPage().getErrorMessage).toBe("Login failed! Please ensure the username and password are valid.");
    });


})