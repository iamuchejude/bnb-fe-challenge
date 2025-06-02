type WrapperProps = {
  children: React.ReactNode;
  title: string;
};

export function Step(props: WrapperProps) {
  return (
    <div className="p-5">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-semibold mb-5">{props.title}</h1>
        {props.children}
      </div>
    </div>
  );
}
