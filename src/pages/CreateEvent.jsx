import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Upload,
  Users,
  Share2,
  FileText,
  CheckCircle,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";

// Firebase imports
import { ref, push } from "firebase/database";
import { db, auth } from "../firebase";

export default function CreateEvent() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    type: "",
    location: "",
    invitees: "",
    template: "",
    media: null,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, media: e.target.files[0] });
  };

  // ✅ Save Event to Firebase
  const handleCreateEvent = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to create an event.");
      return;
    }

    setLoading(true);

    try {
      const eventRef = ref(db, "events");

      await push(eventRef, {
        ...formData,
        date: formData.date.toISOString(),
        createdBy: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      });

      setLoading(false);
      alert("🎉 Event created successfully!");
      navigate("/dashboard/events"); // redirect to My Events
    } catch (error) {
      console.error("Error creating event:", error);
      setLoading(false);
      alert("Failed to create event. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center p-6">
      {/* Progress Indicator */}
      <div className="flex space-x-4 mb-6">
        {[
          "Details",
          "Location",
          "Date/Time",
          "Media",
          "Invites",
          "Share",
          "Review",
        ].map((label, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              step === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        {/* Step 1: Event Details */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-500" /> Event Details
            </h2>
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <textarea
              placeholder="Event Description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
             <select
              placeholder="Event Type"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            >
              <option>Public</option>
              <option>Private</option>
              <option>RSVP-Only</option>
            </select>
            <button
              onClick={nextStep}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-indigo-500" /> Event Location
            </h2>
            <input
              type="text"
              placeholder="Search or enter location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="bg-gray-100 p-4 rounded-lg mb-4 text-gray-600">
              📍 Map Preview Placeholder
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-500" /> Date & Time
            </h2>
            <DatePicker
              selected={formData.date}
              onChange={(date) => handleChange("date", date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Media Upload */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Upload className="w-6 h-6 text-indigo-500" /> Upload Media
            </h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            {formData.media && (
              <p className="text-sm text-gray-600">
                Uploaded: {formData.media.name}
              </p>
            )}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Invitation Templates */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-500" /> Invitation Template
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Classic */}
              <div
                onClick={() => handleChange("template", "Classic")}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData.template === "Classic"
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >
                <p className="font-semibold">Classic Template</p>
                <div className="h-20 rounded mt-2 flex items-center justify-center bg-yellow-100 text-yellow-700 font-medium">
                  "You're Invited!"
                </div>
              </div>

              {/* Modern */}
              <div
                onClick={() => handleChange("template", "Modern")}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData.template === "Modern"
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >
                <p className="font-semibold">Modern Template</p>
                <div className="h-20 rounded mt-2 flex items-center justify-center bg-blue-100 text-blue-700 font-medium">
                  "Join Our Event ✨"
                </div>
              </div>

              {/* Fun */}
              <div
                onClick={() => handleChange("template", "Fun")}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData.template === "Fun"
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >
                <p className="font-semibold">Fun Template</p>
                <div className="h-20 rounded mt-2 flex items-center justify-center bg-pink-100 text-pink-700 font-medium">
                  "Party Time 🎉"
                </div>
              </div>

              {/* Minimal */}
              <div
                onClick={() => handleChange("template", "Minimal")}
                className={`p-4 border rounded-lg cursor-pointer ${
                  formData.template === "Minimal"
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >
                <p className="font-semibold">Minimal Template</p>
                <div className="h-20 rounded mt-2 flex items-center justify-center bg-gray-100 text-gray-700 font-medium">
                  "Event Invite"
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Share Options */}
        {step === 6 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Share2 className="w-6 h-6 text-indigo-500" /> Sharing Options
            </h2>
            <input
              type="text"
              placeholder="Add invitee emails (comma separated)"
              value={formData.invitees}
              onChange={(e) => handleChange("invitees", e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <p className="text-gray-500 mb-2">
              🔗 Share on: WhatsApp, Twitter, LinkedIn
            </p>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Review & Confirm */}
        {step === 7 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" /> Review Your
              Event
            </h2>
            <div className="space-y-4">
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <p>
                <strong>Date:</strong> {formData.date.toString()}
              </p>
              <p>
                <strong>Location:</strong> {formData.location}
              </p>
              <p>
                <strong>Template:</strong> {formData.template}
              </p>
              <p>
                <strong>Invitees:</strong> {formData.invitees}
              </p>
              {formData.media && (
                <p>
                  <strong>Media:</strong> {formData.media.name}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                ← Back
              </button>
              <button
                onClick={handleCreateEvent}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? "Creating..." : "✅ Create Event"}
              </button>
            </div>
          </div>
        )}

        {/* Back to Dashboard Button */}
        <div className="text-center mt-6">
          <Link
            to="/dashboard"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
