import React from 'react'
import Feed from '@components/Feed'
import TopicCard from '@components/TopicCard'

const Home = () => {
  return (
    <section className='w-full flex-start flex-col'>
      <TopicCard />
      <Feed />
    </section>
  )
}

export default Home;