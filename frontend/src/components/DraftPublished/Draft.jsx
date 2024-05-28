import React, { useEffect } from 'react'
import { usePost } from '../../context/PostContex'

function Draft() {
  const {drafts ,fetchDrafts, loading, error} = usePost();

  // useEffect(() => {
  //   fetchDrafts();
  // },[fetchDrafts])
  return (
    <div>
      {loading && <p>Loading drafts....</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {drafts.map(draft => (
            <li key={draft._id}>
              <h4>{draft.title}</h4>
              <h3>{draft.content}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Draft
