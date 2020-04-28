export interface Field {
  type: string;
}

export interface GenericInput extends Field {
  name: string;
  label: string;

  value: any;
  readonly: boolean;
}
