import { useWorkspace } from "@/utils/useWorkspace"


export const fetchCommentForPosts = async (tweetKey: string) => {

    const { program } = useWorkspace()
    const comments = await program.account.comment.all( [{
      memcmp: {
        offset: 8 + 32, // Discriminator + USER_LENGTH.
        bytes:  tweetKey,
      },
    } ]
  )

  return comments
}