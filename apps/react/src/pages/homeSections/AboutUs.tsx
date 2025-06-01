import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="py-20 flex flex-col md:flex-row items-center gap-12">
      {/* Image Section */}
      <motion.div
        className="md:w-1/2 w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/nexuscourierperson.jpeg"
          alt="About Us"
          className="shadow-lg w-full h-full object-cover"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="md:w-1/2 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h4 className="text-blue-500 uppercase tracking-widest text-sm font-bold">
          About Us
          <span className="inline-block w-12 h-[2px] bg-blue-500 ml-2"></span>
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Delivering Excellence in Logistics
        </h2>
        <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
          At Nexus Courier, we believe logistics is more than just transporting
          packages—it's about trust, efficiency, and innovation. As a leading
          courier service provider, we specialize in seamless, end-to-end
          shipping solutions designed for businesses and individuals alike. Our
          goal is to simplify the delivery process while ensuring maximum
          reliability and customer satisfaction.
          <br /> <br />
          With cutting-edge technology, real-time tracking, and a highly skilled
          team, we guarantee safe and timely deliveries, whether across the city
          or across borders. Our logistics network is designed to handle
          shipments of all sizes, from documents and small parcels to large
          freight, with unmatched speed and security. Every package entrusted to
          us is treated with the utmost care, ensuring it arrives at its
          destination in perfect condition.
          <br /> <br />
          From small businesses to large enterprises, we empower our clients
          with dependable courier services that help them grow and thrive in an
          increasingly connected world. At Nexus Courier, we don’t just move
          packages—we move businesses, relationships, and opportunities forward
          with speed, precision, and excellence.
        </p>
      </motion.div>
    </section>
  );
}
