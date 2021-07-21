//Das Fragezeichen hinter obj bedeutet, dass bei Instanziierung eines Objectes vom Typ User optional ein JSON-Object reingegeben werden kann.
//Von diesem reingegebenen Objekt können dann die gesetzten Parameter (Key-Value Paare) verwendet werden.

export class User {

    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: number;
    street: string;
    houseNumber: string;
    zipCode: number;
    city: string;
    userId: string;
    profileImageURL: string;

      constructor(obj? : any) {
          //Wenn ein obj reingegeben wurde, d.h. es existiert, dann wird der firstName von diesem obj verwendet. Ansonsten wird ein leerer String gesetzt.
          // ? : ist die Kurzschreibweise für if-else
          this.firstName = obj ? obj.firstName : '';
          this.lastName = obj ? obj.lastName : '';
          this.email = obj ? obj.email : '';
          this.dateOfBirth = obj ? obj.dateOfBirth : '';
          this.street = obj ? obj.street : '';
          this.houseNumber = obj ? obj.houseNumber : '';
          this.zipCode = obj ? obj.zipCode : '';
          this.city = obj ? obj.city : '';
          this.userId = obj ? obj.userId : '';
          this.profileImageURL = obj ? obj.profileImageURL : 'https://firebasestorage.googleapis.com/v0/b/simple-crm-b617d.appspot.com/o/profilePictures%2Fdefault%2Fdefault-profile.png?alt=media&token=600a2e1c-8d1e-4f9a-b570-db75b1cbab82';

      }
}