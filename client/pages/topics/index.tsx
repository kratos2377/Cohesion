import TweetCard from '@/components/TweetCard';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const Topics = () => {
  const [hover, setHover] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter()

  const tags = ["Tag1", "Tag2", "Tag3"];
  let ar: number[] = [ ]
  const handleTagClick = (text: string) => {
    text = text.toLocaleLowerCase()
    router.push(`/topics/${text}`)
    setSearchText(text);
  }

  return (
    <div>
  
      <div className="text-2xl text-white m-5 mx-10">
        Topics
      </div>

     
<div className='mx-10 my-3'>
<form>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" 
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
</div>
<div className="mx-10 my-3 flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
         <button
         className={`border border-pink-500 rounded-full py-1 px-2 text-white bg-transparent ${
           hover ? "hover:bg-pink-500" : ""
         }`}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         onClick={() => handleTagClick(tag)}
       >
        {"# " + tag.toLocaleLowerCase()}
       </button>
      ))}
    </div>

    <div>
        {ar.map( (ele) =>  <TweetCard tag={"test"} author={'admasida7sd67aufbiuadshf89ad6fa76dtsfasdyufgylasdf7'} content={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum, leo eu tincidunt euismod, nibh metus tristique metus, at scelerisque dolor magna et dui. Pellentesque tristique leo id neque lobortis, vel lobortis nisi efficitur. Sed id dui tincidunt, hendrerit nisl eu, aliquet massa. Donec molestie rutrum justo. Proin nulla neque, gravida scelerisque quam at, imperdiet dignissim arcu. Cras facilisis urna ut ante commodo, eget auctor arcu iaculis. Proin libero elit, luctus sit amet sapien ut, fringilla rhoncus elite\

Ut tempus faucibus lacus vitae cursus. Nam hendrerit, risus vel tempor pulvinar, orci diam pulvinar diam, blandit semper turpis augue nec eros. Sed dignissim mi a dui semper, at scelerisque est tristique. Morbi orci metus, tempus quis consequat sit amet, dictum ut metus. Nam mattis sit amet dui eget facilisis. Cras et sagittis sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non leo eu odio pharetra semper sit amet eget justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur molestie massa non mauris vestibulum gravida.\

Nam nec eros venenatis, tincidunt tellus vitae, elementum est. Duis mollis eros ac ligula maximus, quis ornare risus tincidunt. Mauris at eros lorem. Donec et risus mi. Fusce eget augue dictum, ultricies felis id, scelerisque sapien. Pellentesque ornare non velit eget mattis. Morbi nec sapien rutrum, euismod est ut, feugiat ligula. Vivamus pretium lacus risus, et convallis dui eleifend ut. Nulla in nibh lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec finibus mauris nec quam vulputate, eget maximus urna ultricies. Curabitur eu turpis rhoncus, fermentum nunc a, pellentesque metus.\

Phasellus sagittis non lectus ut aliquet. Praesent facilisis nisl et odio pellentesque, in accumsan nunc malesuada. Quisque dapibus volutpat risus in finibus. Vivamus pretium ac leo eu mattis. Curabitur nibh ipsum, pretium nec magna quis, luctus volutpat mi. Donec nunc arcu, feugiat a vulputate quis, facilisis quis nunc. Morbi consectetur urna a facilisis consequat. Vivamus eget placerat sem.\

Vivamus tincidunt dolor at turpis mattis cursus. Aliquam erat volutpat. Phasellus a magna ante. Quisque sed nibh vulputate, volutpat tortor id, ultrices turpis. Sed eu nisi interdum, aliquet elit quis, sagittis metus. Vivamus ornare enim ut volutpat luctus. Suspendisse potenti. Morbi porta lorem vel mi scelerisque, vitae egestas erat maximus. Maecenas varius, tellus ac mollis pharetra, felis metus venenatis sapien, et placerat diam lectus a nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In eleifend, orci nec vestibulum auctor, erat enim volutpat urna, quis eleifend elit nibh vel nibh. In id elit in lectus tristique aliquam ac condimentum orci. Aliquam tincidunt velit et congue pellentesque. Donec sodales fringilla euismod`} commentCount={23} likeCount={12} /> )}
      </div>
 
    </div>
  )
}

export default Topics