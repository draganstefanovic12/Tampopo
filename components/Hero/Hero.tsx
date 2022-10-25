import Image from "next/image";

const Hero = () => {
  return (
    <div className="h-1/4 bg-secondary mt-12 relative flex justify-between w-full rounded">
      <div className="p-5">
        <h1 className="text-6xl main-shadow">Welcome to manilist</h1>
        <p className="main-shadow">connect your anilist account to update chapters you read</p>
      </div>
      <Image
        src="/hero-anime-girl.png"
        width={900}
        height={400}
        alt=""
        className="absolute right-0"
        objectFit="cover"
      />
    </div>
  );
};

export default Hero;
