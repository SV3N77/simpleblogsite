import PostCards from "./PostCards";

export default function Posts() {
  return (
    <section className="flex flex-col">
      <div className="text-2xl">Posts</div>
      <PostCards />
    </section>
  );
}
