export class NominatimResponse {
  constructor(
    public latitude: number,
    public longitude: number,
    public displayName: string,
    public address: NominatimAddress,
  ) { }
}

export class NominatimAddress {
  constructor(
    public city: string,
    public country: string,
    public county: string,
    public state: string,
  ) {}
}
