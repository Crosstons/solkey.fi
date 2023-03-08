import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClusters } from './backend/basic';

let ListTitles = [];

function List() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const raw_data = await getClusters();
      for (const i in raw_data){
            const found = ListTitles.find(el => el.Address === raw_data[i]["Address"]);
            console.log(found);
            if(!found){
                ListTitles.push(raw_data[i]);   
            }
    }
    setLoading(false);
    console.log(ListTitles);
    })();
  }, []);

  return (
    <div>
        <section class="text-gray-600 body-font">
  <div class="container px-auto py-10 mx-auto">
    <div class="flex flex-wrap -m-4">
      {
        ListTitles.map((cluster) => (
      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-white bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative shadow-[0_4px_9px_-4px_#f3e8ff] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(243,232,255,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
          <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{cluster["Type"]}</h2>
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{cluster["Name"]}</h1>
          <p class="leading-relaxed mb-3">{cluster["Address"].slice(0,10)}...</p>
          <Link class="text-purple-500 inline-flex items-center" to={`/clusters/${cluster["Address"]}/`}>Learn More
            <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
        ))
      }
    </div>
  </div>
</section>
    </div>
  )
}

export default List