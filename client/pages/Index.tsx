import { useEffect, useState } from "react";

export default function Index() {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Get or set the countdown end time (2 hours from first visit)
    const getEndTime = () => {
      const stored = localStorage.getItem('countdownEndTime');
      if (stored) {
        return parseInt(stored);
      } else {
        const endTime = Date.now() + (2 * 60 * 60 * 1000); // 2 hours from now
        localStorage.setItem('countdownEndTime', endTime.toString());
        return endTime;
      }
    };

    const endTime = getEndTime();

    const updateCountdown = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      setTimeRemaining(remaining);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(timeRemaining);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        {/* Large background logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F29ed8878a13b43b993895f824319f4e5%2Fa13d22cf0d5f45e59f3a348939507d1c?format=webp&width=800"
            alt="Background Logo"
            className="w-96 h-96 object-contain opacity-30"
          />
        </div>
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F29ed8878a13b43b993895f824319f4e5%2Fa13d22cf0d5f45e59f3a348939507d1c?format=webp&width=800"
              alt="Nepal Telecom Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 tracking-wide">
          NEB Result Coming Soon !!!
        </h1>

        {/* Countdown Timer */}
        <div className="mb-16">
          <div className="flex justify-center items-center space-x-4 md:space-x-8 mb-4">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {hours}
                </div>
              </div>
              <div className="text-sm md:text-base mt-2 text-white">Hours</div>
            </div>

            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white pb-8">:</div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {minutes}
                </div>
              </div>
              <div className="text-sm md:text-base mt-2 text-white">Minutes</div>
            </div>

            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white pb-8">:</div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {seconds}
                </div>
              </div>
              <div className="text-sm md:text-base mt-2 text-white">Seconds</div>
            </div>
          </div>
          
          {timeRemaining === 0 && (
            <div className="text-xl md:text-2xl font-semibold text-yellow-400 animate-pulse">
              Time's Up! Results Should Be Available Now!
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-sm md:text-base text-white/70">
          © 2025 Nepal Telecom. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
