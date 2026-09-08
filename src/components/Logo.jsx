import sphereIcon from '../assets/sphere-icon.png'

export default function Logo({ variant = 'light', className = '' }) {
  const isDark = variant === 'dark'

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 select-none ${className}`}>
      {/* Original Blue Dots Sphere (Unchanged) */}
      <img
        src={sphereIcon}
        alt="Explore With RTS"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain shrink-0 drop-shadow-xs"
      />

      {/* Brand Text Block */}
      <div className="flex flex-col justify-center text-left min-w-0">
        {/* Main Brand Title */}
        <span
          className={`font-black tracking-wider leading-none whitespace-nowrap text-[13px] xs:text-[14px] sm:text-base md:text-[17px] lg:text-lg xl:text-xl font-heading ${
            isDark ? 'text-white' : 'text-darkNavy'
          }`}
        >
          EXPLORE WITH RTS
        </span>

        {/* Underline Divider */}
        <div
          className={`h-[1.5px] sm:h-[2px] w-full my-0.5 sm:my-1 rounded-full ${
            isDark
              ? 'bg-gradient-to-r from-sky-400 via-blue-400 to-transparent'
              : 'bg-gradient-to-r from-blue-600 via-sky-500 to-transparent'
          }`}
        />

        {/* Small Font Subtitle */}
        <span
          className={`text-[6.5px] xs:text-[7.5px] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] font-bold tracking-widest leading-none uppercase whitespace-nowrap ${
            isDark ? 'text-white/75' : 'text-slate-600'
          }`}
        >
          POWERED BY REWAN TECH SOLUTION
        </span>
      </div>
    </div>
  )
}
