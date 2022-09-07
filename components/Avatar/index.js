import Image from "next/image";

export default function Avatar({ alt, src }) {
  return (
    <>
      <Image width={24} height={24} alt={alt} src={src} />
    </>
  );
}
