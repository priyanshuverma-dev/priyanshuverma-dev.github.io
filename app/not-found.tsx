import { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "Page is not found",
};

const NotFound = () => {
  return (
    <div className="container max-w-[60ch] mx-auto px-4 my-10">
      <h1 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
        Not found
      </h1>
      <p>The page you&apos;re looking for was not found.</p>
      <hr className="my-6 border-[#525252] opacity-40 border-2 rounded" />
      <div className="my-2">
        <NextLink href="/">
          <button className="bg-teal-600 hover:bg-teal-700 transition-colors text-white px-4 py-2 rounded flex items-center">
            Return to home
          </button>
        </NextLink>
      </div>
    </div>
  );
};

export default NotFound;
