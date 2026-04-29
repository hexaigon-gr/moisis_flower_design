import Image from "next/image";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Image
            src="/images/mini_logo.png"
            alt="MΩISIS Flower Design"
            width={56}
            height={56}
            className="size-14 animate-pulse"
            priority
          />
        </div>
        <div className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-gold animate-bounce [animation-delay:0ms]" />
          <span className="size-1.5 rounded-full bg-gold animate-bounce [animation-delay:150ms]" />
          <span className="size-1.5 rounded-full bg-gold animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
