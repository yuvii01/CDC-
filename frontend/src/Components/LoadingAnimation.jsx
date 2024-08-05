// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// function LoadingAnimation() {
//   const animationContainer = useRef(null);
//   const logoRef = useRef(null);

//   useEffect(() => {
//     const timeline = gsap.timeline({
//       onComplete: () => {
//         // Hide the animation container once the animation is complete
//         animationContainer.current.style.display = "none";
//       },
//     });

//     // Center the logo with a fade-in effect
//     timeline
//       .fromTo(
//         logoRef.current,
//         { opacity: 0, scale: 0.5 },
//         { opacity: 1, scale: 1, duration: 0.5, ease: "power1.out" }
//       )
//       .to(
//         animationContainer.current,
//         {
//           scale: 0,
//           borderRadius:'100%',
//           duration: 1,
//           ease: "power2.inOut",
//         },
//         "+=1"
//       );
//   }, []);

//   return (
//     <div
//       ref={animationContainer}
//       className="fixed inset-0 flex items-center justify-center bg-[#272829] z-50"
//     >
//       <img
//         ref={logoRef}
//         src="images\logo.png" // Replace with your logo path
//         alt="Logo"
//         className="w-40 h-40 p-5 bg-[#61677A] rounded-full"
//       />
//     </div>
//   );
// }

// export default LoadingAnimation;
