export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-50 text-center">
  <h2 className="text-4xl font-bold mb-6 text-indigo-700">About Eventify</h2>
  <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
    Eventify is a platform where you can create, manage, and share your own events seamlessly. 
    Whether it’s a small meetup or a large gathering, you can customize invitations, track RSVPs, 
    upload media, and share your events with friends or the public.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Event Creation</h3>
      <p>Set event details, location, and media easily using our wizard.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">RSVP Management</h3>
      <p>Track attendees and send automated reminders for better engagement.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Social Sharing</h3>
      <p>Share your events on social media and increase visibility and attendance.</p>
    </div>
  </div>
</section>

  );
}
