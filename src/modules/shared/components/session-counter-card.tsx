interface Props {
  title: string;
  count: string;
}

export const SessionCounterCard = ({ title, count }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 rounded-md p-6 w-full max-w-80 mx-auto ">
      <p className="text-sm font-semibold text-slate-600">{title}</p>
      <h2 className="text-lg lg:text-2xl text-honoluluBlue font-bold">{count}</h2>
    </div>
  )
}
