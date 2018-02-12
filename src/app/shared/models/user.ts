import * as firebase from 'firebase/app';

export class User {
  userId: string;
  displayName: string;
  email: string;
  password: string;
  photoURL: string;
  emailVerified: boolean;
  status?: UserStatus;
  idToken?: string;
  roles: any[];
  createdBy?: string;
  createdAt?: Date;
  lastUpdatedBy?: string;
  lastUpdatedAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;
  authState: firebase.User;
  type: UserType;

  constructor(authState?: firebase.User) {
    if (authState) {
      this.authState = authState;
      this.userId = authState.uid;
      this.emailVerified = authState.emailVerified;
      this.email = authState.providerData[0].email;
      this.photoURL = authState.providerData[0].photoURL ? authState.providerData[0].photoURL : 'https://pickaface.net/assets/images/slides/slide2.png';
      this.displayName = (authState.providerData[0].displayName ? authState.providerData[0].displayName : this.email);
    }
  }
}

export enum UserStatus {
  ACTIVE,
  INACTIVE
}

export enum UserType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business'
}
