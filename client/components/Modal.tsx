import { fetchCommentForPosts } from '@/rpc-calls/fetchComments';
import React, { useEffect } from 'react';


interface Props {
  tweetKey: string,
  closeModal: () => void;
}

const Modal = ({tweetKey , closeModal}: Props) => {

    const fetchComments = async () => {
      
      fetchCommentForPosts(tweetKey).then((comments) => {
        console.log("Fetched comments are: " , comments)
      })
    }

    const handleClose = () => {
      closeModal()
    }

    useEffect(() => {
      fetchComments()
    } , [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 h-1/2 bg-white rounded-lg shadow-lg">
        <button onClick={handleClose}>close</button>
      </div>
    </div>
  );
};

export default Modal;