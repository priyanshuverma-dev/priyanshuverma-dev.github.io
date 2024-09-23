import { ForwardedRef, forwardRef, ReactNode } from "react";

export const DogSpinner = () => (
  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-full">
    <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-200 border-t-teal-500 w-16 h-16"></div>
  </div>
);

type DogContainerProps = {
  children: ReactNode;
};

export const DogContainer = forwardRef<HTMLDivElement, DogContainerProps>(
  ({ children }, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      ref={ref}
      className="voxel-dog mx-auto mt-[-20px]  sm:mt-[-60px] mb-[-40px] sm:mb-[-140px] md:mt-[-120px]  w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] md:w-[640px] md:h-[640px] relative"
    >
      {children}
    </div>
  )
);

const Loader = () => {
  return (
    <DogContainer>
      <DogSpinner />
    </DogContainer>
  );
};

export default Loader;
