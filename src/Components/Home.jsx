import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 18 }
    }
  };

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="bg-gray-950 text-white overflow-hidden">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    
    {/* Logo */}
    <h1 className="text-xl font-bold tracking-wide">iNotebook</h1>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center space-x-6 text-sm">
      <a href="#features" className="hover:text-indigo-400 transition">
        Features
      </a>
      <a href="#about" className="hover:text-indigo-400 transition">
        About
      </a>
      <Link to="/about" className="hover:text-indigo-400 transition">
        About iNotebook
      </Link>
      <Link
        to="/login"
        className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-white"
      >
        Login
      </Link>
    </div>

    {/* Mobile Hamburger */}
    <button
      className="md:hidden flex flex-col space-y-1"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="w-6 h-0.5 bg-white"></span>
      <span className="w-6 h-0.5 bg-white"></span>
      <span className="w-6 h-0.5 bg-white"></span>
    </button>
  </div>

  {/* Mobile Dropdown Menu */}
  {isOpen && (
    <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-white/10 px-6 py-6 space-y-4 text-sm">
      <a
        href="#features"
        onClick={() => setIsOpen(false)}
        className="block hover:text-indigo-400"
      >
        Features
      </a>
      <a
        href="#about"
        onClick={() => setIsOpen(false)}
        className="block hover:text-indigo-400"
      >
        About
      </a>
      <Link
        to="/about"
        onClick={() => setIsOpen(false)}
        className="block hover:text-indigo-400"
      >
        About iNotebook
      </Link>
      <Link
        to="/login"
        onClick={() => setIsOpen(false)}
        className="block bg-indigo-600 px-4 py-2 rounded-lg text-center text-white"
      >
        Login
      </Link>
    </div>
  )}
</header>

      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-32 px-6 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-bold leading-tight"
          >
            From Thought to <span className="text-indigo-400">iNotebook</span> Instantly
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg text-gray-400"
          >
            Capture ideas, organize knowledge, and stay productive with a clean,
            distraction-free experience.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
              style={{color:"white"}}
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-32 px-6 bg-gray-900">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12"
        >
          {[
            {
              title: "Secure Storage",
              desc: "Encrypted and protected notes so your ideas stay safe."
            },
            {
              title: "Smart Organization",
              desc: "Categorize, search, and structure your knowledge."
            },
            {
              title: "Access Anywhere",
              desc: "Your notes available anytime, on any device."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-32 px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Why iNotebook?</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            iNotebook is built for thinkers, creators, and professionals who
            need clarity. With a minimal interface and intelligent organization,
            it transforms scattered thoughts into structured insight.
          </p>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-gray-400 text-sm">
          <div>
            <h3 className="text-white font-semibold mb-4">iNotebook</h3>
            <p>Turn your thoughts into structured knowledge effortlessly.</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-indigo-400">Features</a></li>
              <li><a href="#about" className="hover:text-indigo-400">About</a></li>
              <li><a href="/login" className="hover:text-indigo-400">Login</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p>support@inotebook.com</p>
            <p className="mt-4 text-gray-600">© 2026 iNotebook. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}