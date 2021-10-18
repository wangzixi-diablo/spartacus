import * as checkout from '../../../../helpers/checkout-flow';
import { viewportContext } from '../../../../helpers/viewport-context';
import { cartWithCheapProduct, getSampleUser, SampleUser } from '../../../../sample-data/checkout-flow';

context('Checkout flow', () => {
  //viewportContext(['mobile', 'desktop'], () => {
    viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });
/*
    it('should perform checkout', () => {
      const user = getSampleUser();
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, user);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user);
      checkout.fillAddressFormWithCheapProduct(user);
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct(user);
      checkout.placeOrderWithCheapProduct(user);
      checkout.verifyOrderConfirmationPageWithCheapProduct(user);
    });
    */

    it.skip('complete checkout after session timeout at shipping address step', ()=> {
      const user = getSampleUser(); 
      /*
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, user);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user);
      */

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


    it.skip('complete checkout after session timeout at payment method step', ()=> {
      const user = getSampleUser();
      
      loginAndLoadCart(user);
      // TODO
      // Probably Regions Error. 

    });

    it.skip('complete checkout after session timeout at payment method billing address step', ()=> {
      const user = getSampleUser();
      
      loginAndLoadCart(user);
      // TODO
      // Probably Regions Error

    });

    it.skip('complete checkout after session timeout at order review step', ()=> {
      const user = getSampleUser();
      
      loginAndLoadCart(user);
      // TODO
      // Probably Regions Error

    });

    function loginAndLoadCart(sampleUser: SampleUser){
      checkout.visitHomePage();

      checkout.clickHamburger();

      checkout.registerUser(false, sampleUser);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(sampleUser);
    }

  });
});
