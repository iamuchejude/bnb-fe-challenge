type InputGroupProps = {
  label: string;
  htmlFor?: string;
};

export function InputGroup({ label, htmlFor }: InputGroupProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
    </div>
  );
}
