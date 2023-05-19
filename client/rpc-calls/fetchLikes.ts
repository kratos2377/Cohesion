import { useWorkspace } from "@/utils/useWorkspace"


export const fetchLikes = async () => {
    const {wallet , program} = useWorkspace()
    const votes = await program.account.voting.all( [{
      memcmp: {
        offset: 8, // Discriminator.
        bytes: wallet.publicKey,
      },
    } ]
  )

  return votes;
}