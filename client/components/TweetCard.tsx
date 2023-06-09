import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaComment, FaHeart  } from "react-icons/fa";
import {AiOutlineComment , AiFillDelete} from "react-icons/ai"
import { useWorkspace } from "@/utils/useWorkspace";
import Modal from "./Modal";
import { VotingResult, likeTweet } from "@/rpc-calls/likePost";
import { sendComment } from "@/rpc-calls/postComment";
import { userLikedSet } from "@/utils/createTagAndUserMap";

interface TweetCardProps {
  author: string,
  content: string,
  tag: string,
  tweetKey:  string 
}

const TweetCard = ({ author, content,  tag , tweetKey }: TweetCardProps) => {
  const [showComment, setShowComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loadModal , setLoadModal] = useState(false)
  const [thisPost , setThisPost] = useState(false)
  const router = useRouter()
  const { wallet } = useWorkspace()
  const handleCommentWindow = () => {
    setCommentContent("")
    setShowComment(!showComment)
  }

  const handleComment = () => {
    if(commentContent.trim().length < 5) {
      return;
    }
    sendComment(tweetKey , commentContent , tweetKey)
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

  const likePost = () => {
    likeTweet(tweetKey , VotingResult.Like).then(() => {
      setThisPost(true)
    })
  }
  const showModal = () => {
    setLoadModal(true)
  }

  const closeModal = () => {
    setLoadModal(false)
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
        <div className="flex items-center justify-betweem">
          <button onClick={redirectToUserProfile}>
          <div className="text-gray-400">{authorKey}</div>
          </button>
     
      <span className="ml-auto">
          
       {
        wallet.publicKey.toBase58() === "someradnomekeysdasdasdweafasd" ?  <AiFillDelete className="mr-1 hover:text-pink-400 hover:cursor-pointer" /> : <></>
       }
        
        </span>

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
            
          </div>
          <div>
          {
            (userLikedSet.has(tweetKey) || thisPost) ?   <FaHeart className="mr-1 text-pink-700" /> : <FaHeart onClick={likePost} className="mr-1 hover:text-pink-400 hover:cursor-pointer" />
          }
            
          </div>


<div>
            <AiOutlineComment onClick={showModal} className="mr-1 hover:text-pink-400 hover:cursor-pointer" />
        </div>
          </div>
     
      </div>
     </div>
      {showComment && (
        <div className="mt-4">
          <textarea className="w-full text-black rounded-md border-2 p-2" onChange={writingComment} 
          placeholder="Write Comment... (Comment must be of atleast length 5)"
          maxLength={60}
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

       {
        loadModal && <Modal closeModal={closeModal} tweetKey={tweetKey}/>
       }
    </div>
  );
};

export default TweetCard;
