import React from "react";

export function PaperTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.9] dark:hidden mix-blend-multiply dark:mix-blend-soft-light z-0"
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#fafafa" />
      </svg>
    </div>
  );
}

// export function PaperTextureSlow() {
//   return (
//     <div
//       className="absolute inset-0 pointer-events-none opacity-[0.9] mix-blend-multiply dark:mix-blend-soft-light z-0"
//       aria-hidden="true"
//     >
//       <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//         <filter id="paper-texture-filter">
//           <feTurbulence
//             type="fractalNoise"
//             baseFrequency="0.8"
//             numOctaves="4"
//             stitchTiles="stitch"
//           />
//           <feColorMatrix type="saturate" values="0" />
//           <feComponentTransfer>
//             <feFuncR type="linear" slope="2" intercept="-0.5" />
//             <feFuncG type="linear" slope="2" intercept="-0.5" />
//             <feFuncB type="linear" slope="2" intercept="-0.5" />
//           </feComponentTransfer>
//           <feBlend in="SourceGraphic" mode="multiply" />
//         </filter>
//         <rect width="100%" height="100%" filter="url(#paper-texture-filter)" fill="transparent" />
//       </svg>
//     </div>
//   );
// }
