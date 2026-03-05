import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
export default function About() {
  const navigate = useNavigate()
  return (
    <div className="bg-gray-950 text-white overflow-hidden">

      {/* HEADER SECTION */}
    
<section className="relative px-6 lg:px-8 py-32 text-center">
  <motion.h1
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
    className="text-5xl sm:text-6xl font-bold tracking-tight"
  >
    About <span className="text-indigo-500">Inotebook</span>
  </motion.h1>

  <motion.p
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
    className="mt-8 text-lg text-gray-400 max-w-3xl mx-auto"
  >
    Inotebook is designed for thinkers, creators, and builders.
    A secure, minimal and powerful note-taking experience that helps
    you capture ideas and turn them into structured knowledge.
  </motion.p>

  {/* LOGIN BUTTON */}
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
    className="mt-12"
  >
    <button
      onClick={() => navigate("/login")}
      className="px-8 py-3 text-lg font-medium rounded-full 
                 bg-indigo-600 hover:bg-indigo-500 
                 transition duration-300 
                 shadow-lg shadow-indigo-500/20 
                 hover:shadow-indigo-500/40 
                 hover:scale-105 active:scale-95"
    >
      Login to Get Started
    </button>
  </motion.div>
</section>

      {/* OUR STORY */}
      <section className="px-6 lg:px-8 py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl font-semibold mb-6">
              Our Mission
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We believe ideas deserve clarity and protection.
              Inotebook was built to provide a distraction-free space
              where thoughts can be captured instantly and organized effortlessly.
              With strong security and seamless access, your knowledge
              stays yours — always.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-10 rounded-2xl backdrop-blur-xl border border-white/10"
          >
            <h3 className="text-xl font-medium mb-4">Why Inotebook?</h3>
            <ul className="space-y-4 text-gray-300">
              <li>✔ Secure & encrypted storage</li>
              <li>✔ Minimal and distraction-free UI</li>
              <li>✔ Fast and responsive experience</li>
              <li>✔ Designed for productivity</li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 lg:px-8 py-32">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-4xl font-semibold"
          >
            What Makes It Different
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Security First",
              text: "Your data is encrypted and protected with authentication layers.",
            },
            {
              title: "Clean Experience",
              text: "No clutter. No distractions. Just your thoughts and productivity.",
            },
            {
              title: "Accessible Anywhere",
              text: "Access your notes anytime, anywhere, on any device.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:border-indigo-500 transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="px-6 lg:px-8 py-32 bg-gray-900 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="text-4xl font-semibold mb-8"
        >
          Our Vision
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          We aim to build a modern digital notebook that blends simplicity
          with power. A platform where creativity flows freely, ideas evolve,
          and knowledge becomes structured without friction.
        </motion.p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Inotebook. All rights reserved.
      </footer>

    </div>
  );
}