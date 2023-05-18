import { TweetType } from "@/types/TweetTypes";


let tagMap = new Map<string, number>();

export const initializeTagsMap = (tweets: TweetType[]) => {
    tweets.map((tweet) => {
        let num: number = 0;
        if(tagMap.has(tweet.tag)) {
            num = tagMap.get(tweet.tag)!;
        }
    
        tagMap.set(tweet.tag , num + 1)
    })
}


export const addToMap = (tag: string) => {
    let num: number = 0;
    if(tagMap.has(tag)) {
        num = tagMap.get(tag)!;
    }

    tagMap.set(tag , num + 1)
}

export default tagMap;