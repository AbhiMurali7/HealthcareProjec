import { Page } from "@playwright/test";
import LoginPage from "../pages/Login.page";
import AppointmentPage from "../pages/Appointment.page";
import ConfirmationPage from "../pages/Confirmation.page";

export default class PageManager{
     private readonly page : Page
     private readonly loginPage : LoginPage
     private readonly appointmentPage : AppointmentPage
     private readonly confirmationPage : ConfirmationPage

     constructor(page : Page){

        this.page = page;
        this.loginPage = new LoginPage(page)
        this.appointmentPage = new AppointmentPage(page)
        this.confirmationPage = new ConfirmationPage(page)
     }

   LoginPage(){
      return this.loginPage

   }
   appPage(){
      return this.appointmentPage

   }
   confirmPage(){
      return this.confirmationPage

   }

}