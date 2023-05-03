import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaComment, FaHeart } from "react-icons/fa";

interface TweetCardProps {
  author: string,
  content: string,
  commentCount: number,
  likeCount: number,
  tag: string
}

const TweetCard = ({ author, content, commentCount, likeCount , tag }: TweetCardProps) => {
  const [showComment, setShowComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const router = useRouter()

  const handleCommentWindow = () => {
    setCommentContent("")
    setShowComment(!showComment)
  }

  const handleComment = () => {
    console.log("asdasd", commentContent);
    setShowComment(false);
    setCommentContent("");
  };

  const handleCancelClick = () => {
    setShowComment(false);
    setCommentContent('');
  } 


  const writingComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    setCharCount(content.length)
    setCommentContent(content)
  }

  const redirectToUserProfile = () => {
    router.push(`/users/${author}`)
  }

  const redirectToTopic = () => {
    router.push(`/topics/${tag}`)
  }
  const commentRemaining = 60 - charCount
  let authorKey = author.substring(0 , 6) + "......" + author.slice(-6)
  return (
    <div className="m-5 flex-col items-start justify-start p-4 bg-gray-900 border border-gray-800 rounded-md">
     <div className="flex">
     <div className="mr-4">
        <img
          className="w-10 h-10 rounded-full"
          src={`https://picsum.photos/seed/${author}/64/64`}
          alt={author}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-start">
          <button onClick={redirectToUserProfile}>
          <div className="text-gray-400">{authorKey}</div>
          </button>
        </div>
        <div className="mt-4 text-white">{content}</div>
        <div>
        <button className="my-4 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full" onClick={redirectToTopic}>
  {"# " + tag}
</button>
        </div>
        <div className="mt-4 flex items-center justify-around text-gray-400">
          <div>
            <FaComment className="mr-1 hover:text-blue-200 hover:cursor-pointer" onClick={handleCommentWindow}/>
            {commentCount}
          </div>
          <div>
            <FaHeart className="mr-1 hover:text-pink-400 hover:cursor-pointer" />
            {likeCount}
          </div>
        </div>
      </div>
     </div>
      {showComment && (
        <div className="mt-4">
          <textarea className="w-full text-black rounded-md border-2 p-2" onChange={writingComment} 
          placeholder="Write Comment..."
          />
          <div className="flex justify-end mt-2">
          <div className="flex-row item-center justify-center mr-3 mt-2.5 text-gray-400 text-sm">{commentRemaining}</div>
            <button
              className="bg-gray-500 text-white rounded-md px-4 py-2 mr-2"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white rounded-md px-4 py-2"
              onClick={handleComment}
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetCard;
