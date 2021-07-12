//Das Fragezeichen bedeutet, dass bei Instanziierung des Objekts vom Typ User die 7 Parameter optional übergeben werden können. (Kurzschreibweise)

export class User {

    constructor(
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public dateOfBirth?: number,
        public street?: string,
        public houseNumber?: string,
        public zipCode?: number,
        public city?: string
    ) {}
}