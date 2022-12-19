import * as SC from "./styles";

interface CreateFreeToPlayInputProps {
  value?: any;
  label: string;
  name?: string;
  min?: string;
  step?:string;
  readonly?:boolean
  type: "number" | "text" | "datetime-local";
  onChange?: (event: any) => void;
}

const CreateFreeToPlayInput = ({ step,value, label, name, min, type, onChange }: CreateFreeToPlayInputProps ) => {
  return (
    <SC.InputWrapper>
      <SC.InputLabel htmlFor={name}>{label}</SC.InputLabel>
      <SC.Input type={type} value={value} name={name} id={name} min={min} onChange={onChange} step={step} />
    </SC.InputWrapper>
  );
};

export default CreateFreeToPlayInput;
