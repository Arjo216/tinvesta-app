// src/components/LottieAnimation.tsx
import { useEffect, useRef } from "react";
import animation from "./lottie-animation.animation";
import S from "./lottie-animation.styles";

export const LottieAnimation = (): jSX.Element => {
  const animationContainerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // dynamic import: runs only in the browser (not during SSR)
      const lottieModule = await import("lottie-web");
      // some bundlers put the default export differently
      const lottie = (lottieModule as any).default ?? lottieModule;

      if (cancelled) return;
      if (animationContainerRef.current) {
        animRef.current = lottie.loadAnimation({
          animationData: animation,
          container: animationContainerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
        });
      }
    })();

    return () => {
      cancelled = true;
      try {
        if (animRef.current) animRef.current.destroy();
      } catch (e) {
        /* silent */
      }
    };
  }, []);

  return <S.StyledWrapper ref={animationContainerRef} />;
};

export default LottieAnimation;
