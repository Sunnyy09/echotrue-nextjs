"use client";

const About = () => {
  return (
    <div className="w-full">
      <div className="py-2 mb-2">
        <h2 className="text-2xl font-bold font-openSans text-center">
          About Our Company
        </h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-10">
        <p className="text-gray-700 text-lg font-kanit leading-relaxed">
          Welcome to Echo True, a cutting-edge feedback-based project designed
          to provide real-time insights and improve user experiences. Our
          platform empowers users to share their thoughts, opinions, and
          suggestions effortlessly, helping organizations gather valuable
          feedback to enhance their products and services.
        </p>
        <p className="text-gray-700 text-lg font-kanit leading-relaxed mt-4">
          At Echo True, we believe in the power of real-time feedback to drive
          positive change. Our mission is to create a seamless and interactive
          experience for users, enabling them to voice their feedback and see
          the impact of their contributions in real-time. Join us in our journey
          to make feedback more meaningful and impactful.
        </p>
      </div>
    </div>
  );
};

export default About;
