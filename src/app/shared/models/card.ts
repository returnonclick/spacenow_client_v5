// E-Way cards model
// Ref: https://eway.io/api-v3/?_ga=2.196315820.1081692942.1516852035-565847718.1516852035#transaction-query

export class Card extends Object {

  name:         string = ''        // (50) The name of the card holder
  number:       number = 0         // (50) The card number that is to be processed for this transaction. (Not required when processing using an existing CustomerTokenID with TokenPayment method). This should be the encrypted value if using Client Side Encryption.
  expiryMonth:  number = 0         // (2) The month that the card expires. (Not required when processing using an existing CustomerTokenID with TokenPayment method)
  expiryYear:   number = 0         // (2) The year that the card expires. (Not required when processing using an existing CustomerTokenID with TokenPayment method)
  cvn:          number = 0         // (4) The Card Verification Number. This should be the encrypted value if using Client Side Encryption. (Required if the TransactionTye is Purchase)

  constructor( model: any = null) {

    super(model)

    if (model) {

      this.number       = model.number
      this.name         = model.name
      this.expiryMonth  = model.expiryMonth
      this.expiryYear   = model.expiryYear
      this.cvn          = model.cvn

    }

  }

}

export default [ Card ]