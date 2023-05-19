import { PublicKey } from '@solana/web3.js';
import React from 'react';

interface CommentCardProps {
  comment: string;
  publicKey: string | PublicKey;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, publicKey }) => {

    const returnSlicedKey = (author: string) => {
        let authorKey = author.substring(0 , 7) + "......" + author.slice(-7)
        return authorKey
      }

  return (
    <div className="flex items-start space-x-2 p-2">
      <img src={`https://picsum.photos/seed/${publicKey}/64/64`} alt="Profile" className="w-10 h-10 rounded-full" />
      <div>
        <div className="flex items-center space-x-1">
          <span className="font-bold">{returnSlicedKey(publicKey.toString())}</span>
         
        </div>
        <p className="text-sm">{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
