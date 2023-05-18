import { useWorkspace } from "@/utils/useWorkspace"

export const fetchTags = async () => {
    const {program} = useWorkspace()
    const tags = await program.account.tags.all()


    console.log("All tags recieved are: " , tags)
    return tags
}