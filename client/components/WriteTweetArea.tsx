import { useState } from 'react';
import { HiOutlinePhotograph } from "react-icons/hi";

const WriteTweetArea = () => {
  const [tweetContent, setTweetContent] = useState('');
  const [tag, setTag] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleTweetContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    setTweetContent(content);
    setCharCount(content.length);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  const handleTweet = () => {
    setTweetContent("")
    setCharCount(0)
    setTag("")
    // Send tweet with tweetContent and tag
  };

  const tweetRemaining = 280 - charCount;

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
    <textarea
      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white resize-none focus:outline-none focus:border-blue-500"
      placeholder="What's on your mind?"
      value={tweetContent}
      onChange={handleTweetContentChange}
      maxLength={280}
      rows={3}
    ></textarea>
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center">
        <input
          className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1 text-white mr-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add tag"
          value={tag}
          onChange={handleTagChange}
        />
        <p className="text-gray-400 text-sm">{tweetRemaining}</p>
      </div>
      <button
        className="bg-blue-500 text-white rounded-full px-4 py-2 font-semibold focus:outline-none hover:bg-blue-600"
        onClick={handleTweet}
        disabled={tweetContent.length === 0 || tweetRemaining < 0}
      >
        Tweet
      </button>
    </div>
  </div>
  );
};

export default WriteTweetArea