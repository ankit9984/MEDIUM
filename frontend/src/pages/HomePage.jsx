import React, { useEffect } from 'react'
import HomeList from '../components/Home/HomeList'
import HomeListData from '../components/Home/HomeListData'
import { usePost } from '../context/PostContex'

function HomePage() {
  const {getAllPublicPost} = usePost();

  useEffect(() => {
    getAllPublicPost();
  },[])
  return (
    <div>
      <HomeList/>
      <HomeListData/>
    </div>
  )
}

export default HomePage
