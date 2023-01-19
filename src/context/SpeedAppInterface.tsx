export interface SpeedAppInterface {
  Data: string[]; // string[] is an array of strings
  GetStringData: () => void;
  InputData: string;
  GetStringChecking: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isİncluded: boolean;
  i: number;
  DataQuery: boolean[];
}
