export class Weather {
  constructor(
    public id: number,
    public weather_state_name: string,
    public temperature: number,
    public humidity: number,
    public wind_speed: number,
    public cloud_cover: number,
    public rain: number,
    public snow: number,
  ) {}
}
