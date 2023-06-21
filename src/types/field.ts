export type FieldType =
  | "checkbox"
  | "radio"
  | "text"
  | "textarea"
  | "select"
  | "number";

export type CategoryFieldDoc = {
  label: string;
  type: FieldType;
};
