import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export function NotFound() {
  const [notFoundAnimation, setNotFoundAnimation] = useState(null);
  useEffect(() => {
    fetch("/404-animation.json")
      .then((res) => res.json())
      .then((data) => setNotFoundAnimation(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-orange-100">
      <div className="w-full max-w-md mx-auto flex flex-col gap-5 ">
        <Lottie
          animationData={notFoundAnimation}
          loop={true}
          className="w-64 h-64 md:w-100 md:h-100 mx-auto "
        />
        {/* <div className="flex justify-center">
          <span className="flex self-center text-3xl font-black">
            Not Found
          </span>
        </div> */}
      </div>
    </div>
  );
}
