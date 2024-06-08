import React from 'react';
import '../globals.css';

export default function Home() {
    return <>
      <div>
      <main className="container mx-auto p-6">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg">
            I'm a Developer specializing in building and designing tools to make life a bit easier. I work with
            TypeScript, React, Next.js, and Python. I'm passionate about learning new technologies and I am currently working through the 
            <a href="https://doc.rust-lang.org/beta/book/" target="_blank" rel="noopener noreferrer"><b> Rust Book</b></a>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 shadow-md shadow-hit-pink-800">
              <h3 className="text-2xl font-bold mb-2">TypeScript</h3>
              <p>Experience in developing scalable applications using TypeScript.</p>
            </div>
            <div className="bg-white p-6 shadow-md shadow-hit-pink-800">
              <h3 className="text-2xl font-bold mb-2">React</h3>
              <p>Proficient in building interactive user interfaces with React.</p>
            </div>
            <div className="bg-white p-6 shadow-md shadow-hit-pink-800">
              <h3 className="text-2xl font-bold mb-2">Next.js</h3>
              <p>Skilled in server-side rendering and static site generation using Next.js.</p>
            </div>
            <div className="bg-white p-6 shadow-md shadow-hit-pink-800">
              <h3 className="text-2xl font-bold mb-2">Python</h3>
              <p>Strong background in developing backend services and automation scripts with Python.</p>
            </div>
          </div>
        </section>

        {/* <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 shadow-md shadow-hit-pink-800">
              <h3 className="text-2xl font-bold mb-2">Project: Porfolio</h3>
              <p>A brief description of the project and the technologies used.</p>
            </div>
            <div className="bg-white p-6 shadow-md shadow-hit-pink-800">
              <h3 className="text-2xl font-bold mb-2">Project Two</h3>
              <p>A brief description of the project and the technologies used.</p>
            </div>
          </div>
        </section> */}

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-lg">
            LinkedIn:{' '}
            <a href="https://www.linkedin.com/in/aaron-fuller-32776910b/" target="_blank" className="text-blue-500">
              linkedin.com/in/aaronfllr
            </a>
          </p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center inset-y-0 bottom-0 py-4">
        <p>2024 <a href="https://github.com/aaronfllr">Aaron Fuller</a></p>
      </footer>
    </div>
    </>
}