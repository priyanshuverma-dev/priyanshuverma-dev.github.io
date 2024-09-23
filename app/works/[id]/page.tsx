import { works } from "@/lib/data";
import { notFound } from "next/navigation";
import parser from "html-react-parser";
const Work = async ({ params }: { params: { id: string } }) => {
  const { collaborations, old, recent } = works;
  const listings = [...recent, ...collaborations, ...old];

  const work = listings.find((e) => e.id == params.id);

  if (!work) {
    return notFound();
  }

  return (
    <>
      <article className="border-2 rounded-sm border-black/20 p-4 w-full">
        TODO
      </article>
    </>
  );
};

export default Work;
