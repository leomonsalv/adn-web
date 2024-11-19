export interface FormState {
  errors?: StringMap;
  successMsg?: string;
  data?: any;
  blurs?: StringToBooleanMap;
}

export interface StringMap {
  [key: string]: string;
}

export interface StringToBooleanMap {
  [key: string]: boolean;
}
