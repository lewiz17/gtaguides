export function Cityscape() {
  return (
    <svg className="cityscape-svg" viewBox="0 0 720 560" role="img" aria-labelledby="cityscape-title cityscape-desc">
      <title id="cityscape-title">Paisaje nocturno de una ciudad costera</title>
      <desc id="cityscape-desc">Ilustración original con sol de atardecer, palmeras, edificios, agua y una carretera iluminada en tonos coral, rosa y turquesa.</desc>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#281346" />
          <stop offset="0.48" stopColor="#dc497f" />
          <stop offset="0.8" stopColor="#ff9b58" />
          <stop offset="1" stopColor="#ffcd7e" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1de2ce" stopOpacity=".8" />
          <stop offset="1" stopColor="#132536" stopOpacity=".98" />
        </linearGradient>
        <linearGradient id="road" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fa608f" />
          <stop offset=".5" stopColor="#ffb35f" />
          <stop offset="1" stopColor="#54e6d2" />
        </linearGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="13" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="sceneClip"><rect x="12" y="12" width="696" height="536" rx="30" /></clipPath>
      </defs>
      <g clipPath="url(#sceneClip)">
        <rect x="12" y="12" width="696" height="536" fill="url(#sky)" />
        <circle cx="380" cy="225" r="125" fill="#ffb46d" opacity=".9" filter="url(#glow)" />
        <circle cx="380" cy="225" r="105" fill="#ffdb89" />
        <path d="M275 214h210M275 232h210M275 250h210M275 268h210M300 285h160" stroke="#e65483" strokeWidth="9" opacity=".75" />
        <path d="M12 330 12 267 74 267 74 245 111 245 111 302 148 302 148 222 184 222 184 292 228 292 228 255 258 255 258 325 313 325 313 285 348 285 348 330Z" fill="#21182b" />
        <path d="M403 328 403 279 438 279 438 302 469 302 469 236 500 236 500 286 530 286 530 216 567 216 567 280 602 280 602 248 635 248 635 310 708 310 708 352Z" fill="#21182b" />
        <path d="M12 342h696v54H12z" fill="url(#water)" />
        <path d="M28 354c88 10 101-8 172 3s104 11 164-1 117 5 187-1 111 1 147-4M47 379c62 8 108-5 170 2s119 9 175-1 89 7 144 0 115 0 154-4" fill="none" stroke="#a9fff0" strokeWidth="3" opacity=".65" />
        <path d="M12 414 282 385h166l260 31v134H12Z" fill="#11131d" />
        <path d="M352 389 309 548h105l-45-159Z" fill="#271b2f" />
        <path d="M355 414 347 442h18l-6-28Zm-18 57-11 31h49l-12-31Z" fill="#f9f4ce" opacity=".9" />
        <path d="M16 458h277M430 458h270M12 490h281M422 490h286" stroke="url(#road)" strokeWidth="4" opacity=".95" />
        <path d="M145 389 169 548M579 390 548 548" stroke="#22dbcd" strokeWidth="4" opacity=".9" />
        <g fill="none" stroke="#10101c" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
          <path d="M103 375 118 186M117 195Q72 154 53 173M118 194Q142 138 177 144M116 192Q90 127 80 124M118 190Q157 184 184 204" />
          <path d="M612 385 592 200M594 211Q554 173 535 189M594 210Q624 154 660 164M594 208Q569 147 558 142M595 207Q633 200 663 219" />
        </g>
        <g fill="#f4e8c0" opacity=".95">
          <rect x="33" y="280" width="8" height="18" rx="2"/><rect x="91" y="261" width="7" height="19" rx="2"/><rect x="161" y="244" width="6" height="18" rx="2"/>
          <rect x="483" y="258" width="7" height="18" rx="2"/><rect x="548" y="238" width="7" height="18" rx="2"/><rect x="620" y="269" width="7" height="18" rx="2"/>
        </g>
        <circle cx="206" cy="166" r="3" fill="#fff1c9" /><circle cx="493" cy="142" r="3" fill="#fff1c9" /><circle cx="286" cy="121" r="2" fill="#fff1c9" />
        <rect x="12" y="12" width="696" height="536" fill="none" stroke="#ffffff" strokeOpacity=".12" strokeWidth="2" />
      </g>
    </svg>
  );
}
