import { useWorkspace } from "@/utils/useWorkspace"


export const fetchCommentForPosts = async (tweetKey: string) => {

    const { program } = useWorkspace()
    console.log("Tweet key is: " , tweetKey)
    const comments = await program.account.comment.all( [{
      memcmp: {
        offset: 8 + 32, // Discriminator + USER_LENGTH.
        bytes:  tweetKey,
      },
    } ]
  )

  return comments
}