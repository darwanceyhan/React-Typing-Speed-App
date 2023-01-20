export interface SpeedAppInterface {
  Data: string[];
  GetStringData: () => void;
  InputData: string;
  GetInputData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  i: number;
  key: number;
  DataQuery: boolean[];
  GetStringQuery: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
