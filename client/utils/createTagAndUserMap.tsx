import { TweetType } from "@/types/TweetTypes";
// Not the best way to do it but i wont change the solana code now.
//Lesson -> Consider all cases and decide the arch. beforehand

let tagMap = new Map<string, number>();
let userPostMap = new Map<string , number>();

export const initializeTagsMap = (tweets: TweetType[]) => {
    tweets.map((tweet) => {
        let num: number = 0;
        let postNum: number = 0;
        if(tagMap.has(tweet.account.tag)) {
            num = tagMap.get(tweet.account.tag)!;
        }
        
        if(userPostMap.has(tweet.account.user)) {
            postNum = userPostMap.get(tweet.account.user)!;   
        }
        tagMap.set(tweet.account.tag , num + 1)
        userPostMap.set(tweet.account.user , postNum + 1);

      
    })
}


export const addTagToMap = (tag: string , user: string | undefined) => {
    let num: number = 0;
    let postNum: number = 0;
    if(tagMap.has(tag)) {
        num = tagMap.get(tag)!;
    }
    
    if(user != undefined && userPostMap.has(user)) {
        postNum = userPostMap.get(user)!;   
    }
    tagMap.set(tag , num + 1)
   if(user != undefined) {
    userPostMap.set(user , postNum + 1);
   }
}

export default tagMap;