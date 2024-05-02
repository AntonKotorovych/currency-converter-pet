export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  'data-testid'?: string;
}

export default function Input(props: Props) {
  return (
    <div>
      <input {...props} />
    </div>
  );
}
