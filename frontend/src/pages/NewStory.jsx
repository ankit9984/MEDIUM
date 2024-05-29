import React from 'react'
import RichTextEditor from '../components/RichTextEditory'
import {useLocation} from 'react-router-dom'

function NewStory() {
  const location = useLocation();
  const post = location.state?.post;
  return (
    <div>
      <RichTextEditor post={post}/>
    </div>
  )
}

export default NewStory
