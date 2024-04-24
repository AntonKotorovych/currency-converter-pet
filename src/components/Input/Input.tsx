export interface Props {
  type: string;
  name: string;
  id?: string;
  step?: string;
  value: string | number;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  'data-testid'?: string;
}

export default function Input(props: Props) {
  return (
    <div>
      <input {...props} />
    </div>
  );
}
