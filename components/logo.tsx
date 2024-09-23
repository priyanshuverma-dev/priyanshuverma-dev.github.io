import Link from "next/link";
import { PiFootballHelmetDuotone } from "react-icons/pi";
const Logo = () => {
  return (
    <Link href="/" scroll={false}>
      <div className="inline-flex items-center h-8 p-2 font-bold text-lg transition-transform duration-200">
        <PiFootballHelmetDuotone className="transition-transform duration-200 text-gray-800 dark:text-white" />
        <span className="ml-3 font-bold text-gray-800 dark:text-white">
          Priyanshu Verma
        </span>
      </div>
    </Link>
  );
};

export default Logo;
