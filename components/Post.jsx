import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

export default function Post({ id, username, img, userimg, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const like = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db]);

  return (
    <div className="bg-white border my-7 border-rounded-sm">
      {/* header */}
      <div className="p-3 flex justify-between items-center ">
        <img
          src={userimg}
          alt={username}
          className="rounded-full h-12 w-12 p-1 mr-2 border object-contain"
        />
        <p className="flex-1 font-bold">{username}</p>

        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>

      {/* img */}
      <img
        src={img}
        onDoubleClick={like}
        alt=""
        className="object-cover w-full"
      />

      {/* buttons */}

      {session && (
        <div className="flex justify-between p-3">
          <div className="flex  space-x-4">
            {hasLiked ? (
              <HeartIconFilled onClick={like} className="btn text-red-600 " />
            ) : (
              <HeartIcon onClick={like} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}
      <>
        <p className="px-3 pt-3  font-semibold">{likes.length} likes - {comments.length} comments</p>
        <p className="p-3 truncate">
          <span className="font-bold mr-1">{username}</span> {caption}
        </p>
      </>

      {/* comments */}

      {comments.length > 0 && (
        <div className="ml-10 pb-1 h-20 overflow-y-scroll scrollbar-thumb-gray-200 scrollbar-thin">
          {comments.map((comment) => (
            <>
              <div
                key={comment.id}
                className="flex items-center space-x-2 mb-3"
              >
                <img
                  src={comment.data().userImage}
                  alt=""
                  className=" w-7 h-7 rounded-full"
                />
                <p className="flex-1 text-sm">
                  <span className="font-bold">{comment.data().username}</span>{" "}
                  {comment.data().comment}
                </p>
                <Moment fromNow className="pr-5 text-xs">
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            </>
          ))}
        </div>
      )}

      {/* inputBox */}

      {session ? (
        <form className="flex items-center p-4 gap-1 border-t-2">
          <EmojiHappyIcon className="h-7 cursor-pointer" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment"
            className="border-none flex-1 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      ) : (
        <p className="p-3 text-red-400 underline font-medium">
          Log in to post comment like and share
        </p>
      )}
    </div>
  );
}
