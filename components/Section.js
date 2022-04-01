import React from 'react'
import Stories from './Stories'
function Section() {
  return (
    <main className="xl:grid-col-3 max-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl">
      <section className="col-span-2">
        {/* Stories and posts */}
        <Stories />
      </section>
    </main>
  )
}

export default Section
