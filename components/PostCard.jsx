import Image from "next/future/image";
import DropDown from "./DropDown";

export default function PostCard({ post: { id, title, content, image } }) {
  return (
    <div className="relative flex h-72 overflow-hidden rounded-md bg-amber-50 shadow-md">
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
      <div className="absolute right-2 top-2">
        <DropDown postid={id} />
      </div>
    </div>
  );
}
