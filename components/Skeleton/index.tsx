import { useEffect, useRef } from "react";
import { Animated, type DimensionValue, type ViewStyle } from "react-native";

type SkeletonProps = {
  width?: DimensionValue; // 숫자(px) 또는 "100%" 같은 비율
  height?: number;
  radius?: number;
  style?: ViewStyle;
};

// 로딩 중 보여줄 회색 placeholder 박스. 천천히 깜빡이며(pulse) 로딩 느낌을 준다.
// ActivityIndicator 대신 실제 콘텐츠 모양으로 조합해서 쓰면 더 자연스럽다.
export function Skeleton({
  width = "100%",
  height = 16,
  radius = 8,
  style,
}: SkeletonProps) {
  // 0.4 ↔ 1.0 사이로 opacity를 반복 → 은은하게 깜빡임
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: "#e5e8eb", // line/회색
          opacity,
        },
        style,
      ]}
    />
  );
}

export default Skeleton;
