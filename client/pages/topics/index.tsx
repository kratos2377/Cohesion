import Loading from '@/components/Loading';
import tagMap from '@/utils/createTagAndUserMap';
import { useRouter } from 'next/router';
import React, { useState , useEffect } from 'react'

const Topics = () => {
  const [loading , setLoading] = useState(false)
  const [hover, setHover] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter()
  const [tags , setTags] = useState<Map<string, number>>()
  let ar: number[] = [ ]
  const handleTagClick = (text: string) => {
    text = text.toLocaleLowerCase()
    router.push(`/topics/${text}`)
    setSearchText(text);
  }


  const fetchTagsFromProgram = () => {
    setTags(tagMap)
  }


  useEffect(() => {
   fetchTagsFromProgram()
  }, [] )

  return (
    <div>
  
      <div className="text-2xl text-white m-5 mx-10">
        Topics
      </div>

     
    <div>
    {
      loading ? <div className='mt-8'>
        <Loading />
      </div> :  <>   <div className='mx-10 my-3'>
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
 
      { tags != null && Array.from(tags.entries()).map(([tag , count] , index) => (
         <button
         className={`border border-pink-500 rounded-full py-1 px-2 text-white bg-transparent ${
           hover ? "hover:bg-pink-500" : ""
         }`}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         onClick={() => handleTagClick(tag)}
       >
        {"# " + tag.toLocaleLowerCase() + " " + count/2}
       </button>
      ))}
    </div> </>
    }
    </div>
 
    </div>
  )
}

export default Topics