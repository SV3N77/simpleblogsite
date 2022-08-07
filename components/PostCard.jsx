import Image from "next/future/image";
import DropDown from "./DropDown";
import { useState } from "react";
import EditForm from "./EditForm";

export default function PostCard({ post: { id, title, content, image } }) {
  const [isEditing, setIsEditing] = useState(false);

  function onEdit() {
    setIsEditing(true);
  }

  return isEditing ? (
    <EditForm postId={id} title={title} content={content} image={image} />
  ) : (
    <div className="relative flex h-72 overflow-hidden rounded-md bg-amber-50 shadow-md">
      {image ? (
        <Image
          className="aspect-[4/3] bg-cover"
          src={`/images/${image}`}
          alt={image}
          width={400}
          height={300}
          priority
        />
      ) : null}
      <div className="flex flex-col gap-3 p-5">
        <div className="text-2xl">{title}</div>
        <div className="grow">{content}</div>
      </div>
      <div className="absolute right-2 top-2">
        <DropDown postId={id} onEdit={onEdit} />
      </div>
    </div>
  );
}
