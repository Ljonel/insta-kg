import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
import SmallProfile from './SmallProfile'
import Suggestions from './Suggestions'
function Section() {
  return (
    <main className="mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3">
      <section className="col-span-2">
        {/* Stories and posts */}
        <Stories />
        <Posts />
      </section>

      <section className="hidden md:col-span-1 xl:inline-grid">
        <div className="fixed top-10">
          <SmallProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  )
}

export default Section
