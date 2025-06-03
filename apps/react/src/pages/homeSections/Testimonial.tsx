import { motion } from "framer-motion";
import { FaPlane, FaTruckMoving } from "react-icons/fa";

const people = [
  {
    id: 1,
    name: "Carla Mendoza",
    job: "Import Manager, Global Textiles Co.",
    image: "/person1.jpg",
    title: `"Always On Time"`,
    detail: ` "We've relied on them for over a year now, and they’ve never missed a deadline. Our shipments arrive exactly when expected—every single time."`,
  },
  {
    id: 2,
    name: "David Lam",
    job: "E-commerce Business Owner",
    image: "/person2.jpg",
    title: `"Reliable and Secure Shipping"`,
    detail: `"My goods arrive well-packaged and damage-free. I finally feel like I can focus on growing my business instead of worrying about logistics."`,
  },
  {
    id: 3,
    name: "Sofia Ahmed",
    job: "Operations Lead, Zenith Electronics",
    image: "/person3.jpg",
    title: `"Smooth From Start to Finish"`,
    detail: `"From pickup to final delivery, the process is seamless. The tracking system is accurate, and their team is super responsive."`,
  },
  {
    id: 4,
    name: "Jacob Turner",
    job: "Warehouse Supervisor",
    image: "/person4.jpg",
    title: `"Professional and Punctual"`,
    detail: `"They treat our cargo like it’s their own. Timely arrivals and excellent communication make them our go-to carrier."`,
  },
  {
    id: 5,
    name: "Naomi Schultz",
    job: "Procurement Officer",
    image: "/person5.jpg",
    title: `"No More Headaches!"`,
    detail: `"Shipping used to be our biggest pain point. Since switching, everything runs smoother—no delays, no excuses."`,
  },
  {
    id: 6,
    name: "Mohamed Faris",
    job: "CEO, Faris Home Goods",
    image: "/person6.jpg",
    title: `"Safe Delivery, Every Time"`,
    detail: `"We ship fragile items regularly, and they’ve never disappointed. Everything arrives intact, and that gives our customers confidence too."`,
  },
  {
    id: 7,
    name: "Rachel Lin",
    job: "Logistics Manager",
    image: "/person7.jpg",
    title: `"Trusted Partner for Our Supply Chain"`,
    detail: `"They're more than just a shipping company—they're a part of our logistics strategy now. Highly dependable."`,
  },
  {
    id: 8,
    name: "Anthony Brown",
    job: "Coffee Exporter",
    image: "/person8.jpg",
    title: `"They Understand the Value of Goods"`,
    detail: `"Our cargo is time-sensitive and valuable. They handle it with care and urgency—exactly what we need."`,
  },
  {
    id: 9,
    name: "Li Wei",
    job: "Small Business Owner",
    image: "/person9.jpg",
    title: `"Affordable and Efficient"`,
    detail: ` "I was surprised by the pricing given how smooth the service is. Great value, especially for smaller businesses like mine."`,
  },
  {
    id: 10,
    name: "Emma Johansson",
    job: "Distribution Coordinator",
    image: "/person10.jpg",
    title: `"Peace of Mind, Finally"`,
    detail: `"We’ve had our fair share of delays with other carriers, but this team is different. They deliver as promised, and we sleep easier."`,
  },
  {
    id: 11,
    name: "Miguel Santos",
    job: "Export Coordinator, AgroFresh Exports",
    image: "/person11.jpg",
    title: `"Exceptional Service Across Borders"`,
    detail: `"Shipping perishable goods overseas is no small task, but they’ve nailed it every time. Quick customs clearance and perfect condition on arrival."`,
  },
  {
    id: 12,
    name: "Linda Grace",
    job: "Art Gallery Owner",
    image: "/person12.jpg",
    title: `"Handled With True Care"`,
    detail: `"We ship delicate artwork regularly, and they’ve treated every piece with the utmost care. Their handling and professionalism are unmatched."`,
  },
];

const repeatCount = 10;
const repeatedInstance: any = [];
for (let i = 0; i < repeatCount; i++) {
  people.forEach((people, index) => {
    repeatedInstance.push({
      key: people.id,
      id: people.id,
      name: people.name,
      job: people.job,
      image: people.image,
      title: people.title,
      detail: people.detail,
    });
  });
}

export default function Testimonial() {
  return (
    <>
      <section className="mb-[5rem] flex flex-col" id="Testimonials">
        <h2 className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-bold text-gray-900 mt-[2rem] sm:mt-[3rem] text-center">
          See why our users love{" "}
          <span className="text-[#F97316]">Velocity</span>
        </h2>
        <h4 className="text-[0.875rem] sm:text-[1rem] text-[#898989] text-center px-4 sm:px-0">
          Let Velocity handle your cargo with speed and care —{" "}
          <br className="block sm:hidden" />
          book your first shipment now on WhatsApp.
        </h4>
        <a
          className="bg-black block self-center text-white py-2 px-4 sm:p-4 rounded-[1rem] mt-[1.5rem] sm:mt-[2rem] text-sm sm:text-base"
          href="https://wa.me/message/T3WNI4I4O2XZO1"
          target="_blank"
        >
          Contact Us
        </a>

        <div className="mt-[2rem] sm:mt-[4rem] relative h-[40rem] sm:h-[40rem] overflow-hidden before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-16 sm:before:h-24 before:bg-gradient-to-b before:from-gray-100 before:to-transparent before:z-10 after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-16 sm:after:h-24 after:bg-gradient-to-t after:from-gray-100 after:to-transparent after:z-10">
          <div className="animate-marquee flex flex-col gap-4 sm:gap-6">
            <div className="mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6">
              {repeatedInstance.map((person: any, index: any) => (
                <div
                  key={"first-" + index}
                  className="flex flex-col gap-6 sm:gap-8 bg-white transform rotate-y-12 skew-x-[25deg] shadow-2xl rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex gap-4 sm:gap-8">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden">
                      <img
                        src={person.image}
                        alt="pfp"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-sm sm:text-base tracking-wider">
                        {person.name} <br />
                      </span>
                      <span className="text-xs sm:text-sm tracking-wider">
                        {person.job} <br />
                      </span>
                      <span className="text-xs sm:text-sm">⭐⭐⭐⭐⭐</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <span className="font-bold text-xs sm:text-sm tracking-wider">
                      {person.title}
                    </span>
                    <p className="text-xs sm:text-sm text-gray-500 tracking-wider">
                      {person.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="h-[0.1rem]"></div>
    </>
  );
}
