import { useEffect, useRef } from "react";
import { Animated } from "react-native";

type SlideInProps = {
  delay?: number;
  children: React.ReactNode;
};

export function SlideIn({ delay = 0, children }: SlideInProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 500,
      delay: delay * 1000,
      useNativeDriver: true,
    }).start();
  }, [progress, delay]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <Animated.View style={{ opacity: progress, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

export default SlideIn;
