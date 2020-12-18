export class mdlUser {
  id: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  clientType: number = 0;  // 1: udc client 2: non udc event client, 3: family
  udcNumber: string = '';
  dob: string = '';
  region: string = '';
  medRequirement: string = '';
  description: string = '';
  ndisNumber: string = '';
  provider: string = '';
  planmanager: string = '';

  phoneNumber: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  subsurb: string = '';
  state: string = '';
  postcode: string = '';
  longitude: number = 0;
  latitude: number = 0;

  authSettings: mdlauthSetting[];

}

export class mdlauthSetting {
  id: string = '';
  text: string = '';
  setting: number = 0;
}
