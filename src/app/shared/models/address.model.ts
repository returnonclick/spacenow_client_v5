/*
 * AddressModel casts standard address and optional
 * data for specific countries (TT): can we?
 *
 *  */

export class AddressModel {
  // Braintree address model
  // Ref: https://developers.braintreepayments.com/reference/request/address/create/node
  streetAddress: string =""; // E.g. 123 Nice St
  extendedAddress: string =""; // E.g. Unit 56
  locality: string =""; // i.e., `suburb`, `city`
  region: string =""; // i.e. `state`, `province`
  postalCode: string ="";
  countryCodeAlpha2: string =""; // E.g. "AU"
  countryName: string ="";

  lng: number =0; // geo longtitude
  lat: number =0; // geo latitude

  // For admin purpose
  isVerified: boolean = false;

  constructor() {}

}

