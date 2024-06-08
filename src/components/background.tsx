import Image, { getImageProps } from 'next/image';
import section from '/public/forrestBackground.webp';


export const Background = () => {
  return (
    <div
      className="bg-fixed z-0 md:flex justify-center relative overflow-hidden"
    >
      <Image
        src={section}
        alt="Forrest Background Image"
        className="md:w-[1300px] w-full h-full object-cover"
        layout="responsive"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black from-2%" />
    </div>
  );
};

export default Background;