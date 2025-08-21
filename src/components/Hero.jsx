export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white h-[90vh] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Discover & Join Exciting Events
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Connect with communities, attend amazing events, and never miss a moment of fun.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
