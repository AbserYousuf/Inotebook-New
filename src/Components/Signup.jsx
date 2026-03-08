import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [user, setUser] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();

    const grabdetails = {
      Email: user.email.trim(),
      Username: user.username.trim(),
      Name: user.name.trim(),
      Password: user.password.trim(),
    };

    if (Object.values(grabdetails).some((field) => !field)) {
      setAlert({ type: "info", message: "Please fill out all fields" });
      return;
    }

    try {
      setLoading(true);
      const backendUrl = import.meta.env.VITE_APP_API_URL;
      const response = await fetch(`${backendUrl}/api/auth/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grabdetails),
      });

      const json = await response.json();

      if (!json.success) {
        setAlert({
          type: "error",
          message:
            json.message || json.msg || json.error || "Signup failed",
        });
        return;
      }

      setAlert({
        type: "success",
        message: "Account created successfully!",
      });

      setTimeout(() => navigate("/login"), 1200);

    } catch (error) {
      setAlert({ type: "error", message: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 3500);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white relative overflow-hidden">

      {/* Background Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 50, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl -top-40 -left-40"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], rotate: [0, -50, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl bottom-0 right-0"
      />

      {/* Alert */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-xl shadow-lg text-sm">
              <span
                className={`font-medium ${
                  alert.type === "success"
                    ? "text-green-400"
                    : alert.type === "info"
                    ? "text-blue-400"
                    : "text-red-400"
                }`}
              >
                {alert.message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 80, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, type: "spring" }}
        whileHover={{ scale: 1.02 }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl"
      >
        <motion.form
          onSubmit={signup}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
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
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-gray-400 mt-2 text-sm">
              Start your journey with Inotebook
            </p>
          </motion.div>

          {["name", "username", "email"].map((field, i) => (
            <motion.input
              key={field}
              variants={{
                hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
                visible: { opacity: 1, x: 0 },
              }}
              type="text"
              name={field}
              value={user[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            />
          ))}

          {/* Password */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
            className="relative"
          >
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400"
            >
              {showPass ? "🙈" : "👁"}
            </button>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>

          <motion.p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 font-medium hover:text-indigo-300"
            >
              Sign In
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}
