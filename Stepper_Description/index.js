/**
 * 
 * STEPPER COMMON MISTAKES & IMPORTANCE OF DEFAULT IN SWITCH
 * 
 * There are two common ways we used to work with stepper is through 
 * 
 * - Increment & Decrement
 * - Label & switch 
 * 
 * 1. What happens if the state updation went wrong??
 *    ex: Pressed next button two time or unexpected increment operation in stepper flow.
 * 
 * 
 *   ------------------------------------------>> Increment & Decrement  <<------------------------------------------
 * 
 *    Stepper Flow :
 * 
 *    Fixed flow :
 * 
 *   'Personal Details' >> 'Business Details' >> 'Security Questions' >> 'ITR' >> 'GSTR' >> 'Bank Details' >> 'Summary'
 * 
 *    Dynamic flow :
 * 
 *   'Personal Details' >> 'Business Details' >> 'Security Questions' >> 'ITR' >> 'GSTR' >> 'Bank Details' >> 'Summary'
 * 
 *   const handleNext = () => {
 * 
 *    setActiveStep((prevActiveStep) => prevActiveStep + 1);
 * 
 *   };
 * 
 *   const handleBack = () => {
 * 
 *    setActiveStep((prevActiveStep) => prevActiveStep - 1);
 * 
 *   };
 * 
 * 
 *    <div>
 * 
 *    { stepperCount === 1 && <PersonalDetails />  }
 * 
 *    { stepperCount === 2 && <BusinessDetails />  }
 * 
 *    { stepperCount === 3 && <SecurityQuestions />  }  // some cases it needs to be skipped
 *  
 *    { stepperCount === 4 && <ITR />  }
 * 
 *    </div>
 * 
 * 
 *    * What if the count goes wrong?
 *    * Even if the count goes wrong we must have default screen to be shown
 * 
 *  ------------------------------------------>> Label & switch  <<------------------------------------------
 * 
 *   'Personal Details' >> 'Business Details' >> 'Security Questions' >> 'ITR' >> 'GSTR' >> 'Bank Details' >> 'Summary'
 * 
 *   From each screen we know the mapping -> to which screen we have to visit or redirect to next.
 * 
 *   switch(screenLabel){
 * 
 *   case 'PersonalDetails' : return <PersonalDetails />
 * 
 *   case 'BusinessDetails' : return <BusinessDetails />
 * 
 *   case 'SecurityQuestions' : return <SecurityQuestions />
 * 
 *   case 'ITR' : return <ITR />
 * 
 *   default : return <Summary /> // from this screen we can redirect to existing screen which were not completed.
 * 
 *   }
 * 
 * 
 * 2. Why some time the stepper count exceed the limit??
 *    ex: Too many form containers in same parent - performing too many state update on each component.
 *    Not disabling the button once its been pressed - have chance of clicking twice.
 * 
 * 
 * 3. How to Prevent it?
 *    ex : If we are working in stepper make sure the state update for stepper is properly handled
 *    or Have a default screen if the stepper count goes wrong, from that again we can have redirection to incomplete form
 * 
 * 
 */