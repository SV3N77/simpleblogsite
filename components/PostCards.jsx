import Image from "next/future/image";

export default function PostCards() {
  return (
    <div className="mt-5 flex h-72 overflow-hidden rounded-md bg-amber-50 shadow-md">
      <Image
        className="bg-cover"
        src="/images/MountFuji.png"
        alt="Mount Fuji"
        width={400}
        height={300}
      />
      <div className="flex flex-col gap-3 p-5">
        <div className="text-2xl">Title</div>
        <div className="grow">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
    </div>
  );
}
