import Head from "next/head";
import PostCard from "../components/PostCard";

export const getStaticProps = async () => {
  const data = await fetch("http://localhost:3000/api/blogposts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return { props: { posts: data } };
};

export default function Home({ posts }) {
  return (
    <div className="mx-auto my-0">
      <Head>
        <title>Simple Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container mx-auto flex flex-col gap-5 pt-8">
        <div className="text-2xl">Posts</div>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
