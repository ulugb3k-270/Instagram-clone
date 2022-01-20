import { useEffect, useState } from "react";
import Post from "./Post";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";

const posts = [
  {
    id: "123",
    username: "ulugb3k_270",
    caption: "this is dope",
    userimg: "https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg",
    img: "https://i.ibb.co/crMDfkq/ulugb3k-270-265333762-495856565007443-8020324828821657156-n.jpg",
  },
  {
    id: "124",
    username: "ulug_6778",
    userimg:
      "https://avatars.dicebear.com/api/adventurer/your-custom-seeds.svg",
    img: "https://i.ibb.co/mbYp7pH/ulugb3k-270-245212701-427070142110462-3305985827378098028-n.jpg",
    caption: "THIS IS  alksdlkasdlkasdlkasdasldasldlasdkasldk",
  },
];

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);


  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          img={post.data().image}
          userimg={post.data().profileImg}
          username={post.data().username}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}
