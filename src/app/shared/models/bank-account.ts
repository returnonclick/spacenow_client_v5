
/* 
 * #### NAME
 * BankAccount
 * 
 * #### DESCRIPTION
 * It has the bank account information of the user
 * 
 * #### REFERENCES
 * https://www.humanservices.gov.au/sites/default/files/documents/aus178au-1402en.pdf
 * 
 * */

export class BankAccount {

  country: string = ""; // Country where bank registered
  bankName: string = ""; // Name of bank or financial institution
  accountName: string = ""; // Name of bank account 
  accountNumber: number = 0;
  accountHolderName: string = ""; // Fullname of bank account holder

  constructor() {}
}
