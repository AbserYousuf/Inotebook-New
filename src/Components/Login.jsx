import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import data from "../Context/notescontext";
import Alert from "@mui/material/Alert";

export default function Login() {
  const { getnotes, setIsLoggedIn } = useContext(data);
  const navigate = useNavigate();

  const [details, setdetails] = useState({
    identifier: "",
    password: "",
  });

  const [message, setmsg] = useState("");
  const [error, seterror] = useState(false);
  const [alert, setshowAlert] = useState(false);
  const [pass, setpass] = useState(false);
  const [loading, setloading] = useState(false);

  const handlechange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  const LoginUser = async () => {
    if (!details.identifier || !details.password) {
      setmsg("Please fill all fields");
      seterror(true);
      setshowAlert(true);
      return;
    }

    try {
      setloading(true);

      const isEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.identifier);

      let payload = { password: details.password };
      if (isEmail) payload.email = details.identifier;
      else payload.username = details.identifier;

      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();

      if (!json.success) {
        setmsg(json.error || json.errors?.[0] || "Login failed");
        seterror(true);
      } else {
        setmsg("Login Successful");
        seterror(false);
        localStorage.setItem("loginTime", Date.now());
        localStorage.setItem("authtoken", json.authtoken);
        setIsLoggedIn(true);
        getnotes();

        setTimeout(() => navigate("/note"), 900);
      }

      setshowAlert(true);
      setTimeout(() => setshowAlert(false), 3500);
    } catch (err) {
      setmsg("Server error. Try again.");
      seterror(true);
      setshowAlert(true);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white relative overflow-hidden">

      {/* Animated Background Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl -top-40 -left-40"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl bottom-0 right-0"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, type: "spring" }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl"
      >
        <motion.form
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="space-y-6"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold">
              Welcome Back
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Login to continue to Inotebook
            </p>
          </motion.div>

          {/* Alert */}
          <AnimatePresence>
            {alert && (
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
              >
                <Alert severity={error ? "error" : "success"}>
                  {message}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email/Username */}
          <motion.input
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
            type="text"
            name="identifier"
            placeholder="Email or Username"
            value={details.identifier}
            onChange={handlechange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            style={{"margin-bottom":"0.5em"}}
          />

          {/* Password */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0 },
            }}
            className="relative"
          >
            <input
              type={pass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={details.password}
              onChange={handlechange}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setpass(!pass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition"
            >
              {pass ? "🙈" : "👁"}
            </button>
          </motion.div>

          {/* Forgot */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="text-right text-sm"
          >
            <Link
              to="/forgot-password"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Button */}
          <motion.button
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="button"
            onClick={LoginUser}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30"
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="text-center text-sm text-gray-400"
          >
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 font-medium hover:text-indigo-300"
            >
              Create Account
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}