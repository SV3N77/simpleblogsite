import Image from "next/future/image";

export default function PostCards({ post }) {
  const { title, content, image } = post;

  return (
    <div className="flex h-72 overflow-hidden rounded-md bg-amber-50 shadow-md">
      <Image
        className="bg-cover"
        src={`/images/${image}`}
        alt={image}
        width={400}
        height={300}
      />
      <div className="flex flex-col gap-3 p-5">
        <div className="text-2xl">{title}</div>
        <div className="grow">{content}</div>
      </div>
    </div>
  );
}
