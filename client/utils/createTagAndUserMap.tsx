import { TweetType } from "@/types/TweetTypes";
import { PublicKey } from "@solana/web3.js";
// Not the best way to do it but i wont change the solana code now.
//Lesson -> Consider all cases and decide the arch. beforehand

export let tagMap = new Map<string, number>();
export let userPostMap = new Map<string  , number>();

export const initializeTagsMap = (tweets: TweetType[]) => {
    tagMap = new Map<string, number>();
    userPostMap = new Map<string  , number>();
    tweets.map((tweet) => {
        let num: number = 0;
        let postNum: number = 0;
        if(tagMap.has(tweet.account.tag)) {
            num = tagMap.get(tweet.account.tag)!;
        }
        
        if(userPostMap.has(tweet.account.user.toString())) {
            postNum = userPostMap.get(tweet.account.user.toString())!;   
        }
        tagMap.set(tweet.account.tag , num + 1)
        userPostMap.set(tweet.account.user.toString() , postNum + 1);

      
    })


    console.log(userPostMap)
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

