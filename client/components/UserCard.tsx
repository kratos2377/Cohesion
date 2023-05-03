import { useRouter } from "next/router";
import React from "react";

interface UserCardProps {
  pictureUrl: string;
  publicAddress: string;
  totalPosts: number;
}

const UserCard: React.FC<UserCardProps> = ({
  pictureUrl,
  publicAddress,
  totalPosts,
}) => {
  const router = useRouter()

  const redirectToUserProfile = () => {
    router.push(`/users/${publicAddress}`)
  }
  return (

<div className="m-10 bg-gray-800 shadow-md rounded-md p-4">
      <table className="w-full text-left">
      <thead>
          <tr>
            <th className="font-bold text-gray-500">User</th>
            <th className="font-bold text-gray-500">Total Posts</th>
            <th className="font-bold text-gray-500"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex items-center space-x-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src={pictureUrl}
                  alt="User profile"
                />
                <div>
                  <button onClick={redirectToUserProfile}>
                  <div className="font-semibold">{publicAddress}</div>
                  </button>
                  <div className="text-gray-400 text-sm">Solana public address</div>
                </div>
              </div>
            </td>
            <td className="">{totalPosts}</td>
            <td className="text-right">
              <button className="text-white hover:text-pink-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a2 2 0 11-4 0 2 2 0 014 0zm-7 0a2 2 0 11-4 0 2 2 0 014 0zm9 0a2 2 0 11-4 0 2 2 0 014 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  );
};

export default UserCard;
