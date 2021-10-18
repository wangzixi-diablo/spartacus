// TODO

import * as checkout from '../../../../helpers/checkout-flow';
import { viewportContext } from '../../../../helpers/viewport-context';
import { cartWithCheapProduct, getSampleUser, SampleUser } from '../../../../sample-data/checkout-flow';

context('Cart Update', () => {
    //viewportContext(['mobile', 'desktop'], () => {
      viewportContext(['desktop'], () => {
      beforeEach(() => {
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
      });


    it('Increase cart qty after session timeout', ()=> {
        const user = getSampleUser(); 
        loginAndLoadCart(user);
    
    });  

    it('Decrease cart qty after session timeout', ()=> {
        const user = getSampleUser(); 
        loginAndLoadCart(user);
    
        // Increase to 2. 
        // Decrease to 1. 
    });  

    it('Delete cart product after session timeout', ()=> {
        const user = getSampleUser(); 
        loginAndLoadCart(user);
    
    });  


/* 
    it.skip('complete checkout after session timeout at shipping address step', ()=> {
        const user = getSampleUser(); 
        
        //checkout.visitHomePage();
  
        //checkout.clickHamburger();
  
        //checkout.registerUser(false, user);
        //checkout.goToCheapProductDetailsPage();
        //checkout.addCheapProductToCartAndLogin(user);
        

        loginAndLoadCart(user);
        checkout.fillAddressFormWithCheapProduct(user, cartWithCheapProduct, true);
  
        // 
        checkout.loginUser(user);
        checkout.fillAddressFormWithCheapProduct(user, cartWithCheapProduct);
        checkout.verifyDeliveryMethod();
        checkout.fillPaymentFormWithCheapProduct(user);
        checkout.placeOrderWithCheapProduct(user);
        checkout.verifyOrderConfirmationPageWithCheapProduct(user);
  
      });
  
      it('complete checkout after session timeout at shipping method step', ()=> {
        const user = getSampleUser();
        
        //checkout.visitHomePage();
  
        //checkout.clickHamburger();
  
        //checkout.registerUser(false, user);
        //checkout.goToCheapProductDetailsPage();
        //checkout.addCheapProductToCartAndLogin(user);
  
        loginAndLoadCart(user);
  
        checkout.fillAddressFormWithCheapProduct(user, cartWithCheapProduct);
        checkout.verifyDeliveryMethod(true);
  
        // 
        checkout.loginUser(user);
        //checkout.fillAddressFormWithCheapProduct(user, cartWithCheapProduct);
        checkout.selectDefaultAddress(user, cartWithCheapProduct);
        checkout.verifyDeliveryMethod();
        checkout.fillPaymentFormWithCheapProduct(user);
        checkout.placeOrderWithCheapProduct(user);
        checkout.verifyOrderConfirmationPageWithCheapProduct(user);
  
        // NOTES: Regions Error.  
        //"errors" : [ {
        //  "message" : "RegionModel with country, isocode 'US, US-undefined' not found!",
        //  "type" : "UnknownIdentifierError"
  
  
      });
  */
  
      function loginAndLoadCart(sampleUser: SampleUser){
        checkout.visitHomePage();
  
        checkout.clickHamburger();
  
        checkout.registerUser(false, sampleUser);
        checkout.goToCheapProductDetailsPage();
        checkout.addCheapProductToCartAndLogin(sampleUser);
      }
  
    });
  });
