import React from 'react'
import SplashImg from '../logo/logo.png';
import { Link } from 'react-router-dom';

function Splash() {
  return (
    <div>
          <section class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
    <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={SplashImg}/>
    <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
      <h1 class="title-font sm:text-4xl text-6xl mb-4 font-medium text-purple-900">Solkey.fi</h1>
      <p class="mb-8 leading-relaxed">A Token Aggregation Platform For Solana That Offers Flash Loans, Cluster Token Marketplace & NFT Insurance In The Sleekest User Experience Possible</p>
      <div class="flex w-full justify-center items-end">
        <Link to='/home/' class="inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">Lessgo</Link>
      </div>

    </div>
  </div>
</section>
    </div>
  )
}

export default Splash