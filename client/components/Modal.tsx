import { fetchCommentForPosts } from '@/rpc-calls/fetchComments';
import { CommentType } from '@/types/CommentTypes';
import React, { useEffect , useState } from 'react';
import { MdClose } from 'react-icons/md';
import Loading from './Loading';
import CommentCard from './CommentCard';

interface Props {
  tweetKey: string,
  closeModal: () => void;
}

const Modal = ({tweetKey , closeModal}: Props) => {
  const [loadedComments , setComments] = useState<CommentType[]>([])
  const [loading , setLoading] = useState(true)
    const fetchComments = async () => {
      
      fetchCommentForPosts(tweetKey).then((comments) => {
        setComments(comments)
      }).finally(() => {
        setLoading(false)
      })
    }

    const handleClose = () => {
      closeModal()
    }

    useEffect(() => {
      fetchComments()
    } , [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
    <div className="bg-gray-900 text-white w-1/2 h-1/2 rounded shadow-lg z-10 relative">
      <button  className="absolute top-0 right-0 m-2 text-gray-500 hover:text-white" onClick={handleClose}>
        <MdClose size={24} />
      </button>
      <div className='mt-3'>
      {
        loading ? <Loading /> : <>{
          loadedComments && loadedComments.length === 0 ? <div className='text-center mt-5'>No comments made on this post</div> :
          loadedComments.map((ele) => <CommentCard comment={ele.account.content} publicKey={ele.account.user} />)
        }</>
      }
      </div>
    </div>
    </div>
  );
};

export default Modal;