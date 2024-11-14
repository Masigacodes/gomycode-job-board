import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <main
      role="main"
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-gray-900"
    >
      <header className="text-center max-w-3xl mb-16" aria-labelledby="about-heading">
        <h1 id="about-heading" className="text-4xl md:text-5xl font-bold leading-snug text-gray-800">
          About Our Accessible Job Board
        </h1>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-600">
          Our platform is designed to connect people with disabilities to
          inclusive job opportunities. We believe in creating a barrier-free
          hiring experience where everyone can thrive.
        </p>
      </header>

      <section
        aria-labelledby="mission-heading"
        className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-4xl mb-16"
      >
        <div className="flex-1 text-center md:text-left" role="contentinfo">
          <h2 id="mission-heading" className="text-3xl font-semibold leading-snug text-gray-800">
            Our Mission
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            We’re committed to bridging the employment gap for people with
            disabilities by providing accessible tools, resources, and a
            supportive platform that promotes equal opportunities.
          </p>
        </div>
        <div className="flex-1 flex justify-center" role="img" aria-labelledby="mission-image">
          <Image
            src="/images/Working4.jpg"
            alt="People collaborating inclusively"
            width={320}
            height={240}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section
        aria-labelledby="values-heading"
        className="max-w-4xl mb-16"
      >
        <h2 id="values-heading" className="text-3xl font-semibold text-center leading-snug text-gray-800">
          Our Core Values
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-lg leading-relaxed text-gray-600">
          <li><strong className="text-gray-800">Inclusion:</strong> Everyone deserves equal opportunities.</li>
          <li><strong className="text-gray-800">Empowerment:</strong> Building confidence and independence.</li>
          <li><strong className="text-gray-800">Transparency:</strong> Honest, open communication is key.</li>
          <li><strong className="text-gray-800">Advocacy:</strong> Breaking down barriers together.</li>
        </ul>
      </section>

      <section
        aria-labelledby="contact-heading"
        className="text-center max-w-4xl mb-16"
      >
        <h2 id="contact-heading" className="text-3xl font-semibold leading-snug text-gray-800">
          Contact Us
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          Have questions or want to partner with us? Email us at
          <a
            href="mailto:ashleymasiga17@gmail.com"
            className="text-blue-600 underline ml-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            ashleymasiga17@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
