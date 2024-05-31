"use client";

import Image from "next/image";

const TopicCard = () => {

  return (
    <div className='topic_card'>
      <div className='flex justify-between items-start gap-1'>
        <div className='flex-1 flex justify-start items-center gap-8 cursor-pointer'>
          <Image
            loader={({ src }) => src}
            unoptimized={true}
            src="https://picsum.photos/seed/picsum/200"
            alt='scenery_image'
            width={40}
            height={40}
            className='rounded-full object-contain w-40'
          />

          <div className='flex flex-col'>
            <h2 className='font-satoshi font-semibold text-gray-900'>
              #Sceneries
            </h2>
            <p className='font-inter font-semibold text-sm text-gray-800'>
              10,691,114 posts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;