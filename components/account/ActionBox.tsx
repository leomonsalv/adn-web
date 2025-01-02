import Link from "next/link";

interface ActionBoxProps {
  icon: any;
  title: string;
  label: string;
  route: string;
}

export default function ActionBox({
  icon,
  title,
  label,
  route,
}: ActionBoxProps) {
  return (
    <div className="h-30">
      <Link href={route} className="flex h-full">
        <div className="border-2 border-green-300 p-4 flex items-center bg-green-200 rounded-lg rounded-r-none">
          {icon}
        </div>
        <div className="p-4 border-2 border-l-0 border-green-300 rounded-lg rounded-l-none w-full">
          <div className="flex flex-col align-middle">
            <h3 className="font-bold text-lg">{title}</h3>
            <span className="block font-light text-sm">{label}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
