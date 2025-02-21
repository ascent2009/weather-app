export interface IData {
  address: string;
  location: string;
  cloudcover?: number | undefined;
  conditions?: string | undefined;
  datetime?: string | undefined;
  dew: number;
  feelslike: number;
  humidity?: number | undefined;
  pressure?: number | undefined;
  snow?: number | undefined;
  snowdepth?: number | undefined;
  solarenergy?: number | undefined;
  solarradiation?: number | undefined;
  sunrise: string;
  sunset: string;
  temp: number;
  visibility?: number | undefined;
  description: string;
  days: [];
}

export type DropdownType = Pick<IData, "days">;
