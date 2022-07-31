import PostForm from "../../components/PostForm";

export default function AddPost() {
  return (
    <div className="container mx-auto mt-8 flex flex-col gap-8">
      <div className="text-2xl">Add Post</div>
      <PostForm />
    </div>
  );
}
