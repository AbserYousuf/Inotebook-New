import { useEffect } from "react";
import { X } from "lucide-react";

export default function NoteViewer({ note, onClose }) {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Background Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
      />

      {/* Main Content */}
      <div className="relative z-10 w-[95%] md:w-[70%] lg:w-[55%] max-h-[85vh] bg-white rounded-2xl shadow-2xl animate-scaleIn flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 pr-4 break-words">
            {note.title}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto text-gray-700 leading-relaxed whitespace-pre-wrap">
          {note.description}
        </div>

      </div>

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) }
          to { opacity: 1; transform: scale(1) }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease forwards;
        }
        `}
      </style>

    </div>
  );
}