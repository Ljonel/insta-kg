import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
function Section() {
  return (
    <main className="xl:grid-col-3 mx-auto grid grid-cols-1 md:max-w-2xl md:grid-cols-2 xl:max-w-6xl">
      <section className="col-span-2">
        {/* Stories and posts */}
        <Stories />
        <Posts />
      </section>
    </main>
  )
}

export default Section
