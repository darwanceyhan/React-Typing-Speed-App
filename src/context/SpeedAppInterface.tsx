export interface SpeedAppInterface {
  Data: string[];
  GetStringData: () => void;
  CheckData: string;
  GetStringChecking: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
