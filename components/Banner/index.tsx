import { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppText } from "@/components/AppText";
import type { RootStackParamList } from "@/app/App";

const bannerImage = require("@/assets/icons/banner.png");
const schoolImage = require("@/assets/icons/school-building.png");

type BannerSlide = {
  /** Title text. Use "\n" for line breaks. */
  title: string;
  onPress?: () => void;
  background: React.ReactNode;
};

type BannerProps = {
  /** Auto-advance interval in ms. Set 0 to disable. */
  autoPlayMs?: number;
};

/**
 * Fills the slide with a photo at a chosen focal point/zoom — RN's
 * resizeMode="cover" can only center, so we size + offset the image manually.
 * `zoom` > 1 crops in further. `focusX`/`focusY`: 0 = left/top, 1 = right/bottom.
 * Both focus values are clamped to [0,1] so the image never scrolls past the
 * frame (which would clip it and show blank).
 */
const PhotoCover = ({
  source,
  width,
  height,
  zoom = 1,
  focusX = 0.5,
  focusY = 0.5,
}: {
  source: ImageSourcePropType;
  width: number;
  height: number;
  zoom?: number;
  focusX?: number;
  focusY?: number;
}) => {
  const meta = Image.resolveAssetSource(source);
  if (!width || !meta?.width) return null;

  const displayWidth = width * zoom;
  const displayHeight = Math.max(
    height,
    displayWidth * (meta.height / meta.width),
  );
  const left = -(displayWidth - width) * Math.min(Math.max(focusX, 0), 1);
  const top = -(displayHeight - height) * Math.min(Math.max(focusY, 0), 1);

  return (
    <Image
      source={source}
      resizeMode="cover"
      style={{
        position: "absolute",
        left,
        top,
        width: displayWidth,
        height: displayHeight,
      }}
    />
  );
};

export const Banner = ({ autoPlayMs = 20000 }: BannerProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [width, setWidth] = useState(0);
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const height = 120;

  // Slides are static content, so they live here (not passed from screens).
  const slides: BannerSlide[] = [
    {
      title: "대소고 FC\n공식 플랫폼에 오신 것을 환영해요!",
      onPress: () => navigation.navigate("Magazine"),
      background: (
        <PhotoCover
          source={bannerImage}
          width={width}
          height={height}
          focusY={0.7}
        />
      ),
    },
    {
      title: "밥 먹고 축구 할사람?\n지금 바로 참여해요!",
      onPress: () => navigation.navigate("Tabs", { screen: "Schedule" }),
      background: (
        <PhotoCover
          source={schoolImage}
          width={width}
          height={height}
          zoom={1.5}
          focusY={0.45}
        />
      ),
    },
  ];

  useEffect(() => {
    if (!width || autoPlayMs <= 0 || slides.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [width, autoPlayMs, slides.length]);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!width) return;
    setCurrent(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const goTo = (index: number) => {
    setCurrent(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  return (
    <View className="px-4 pt-2">
      <View
        className="overflow-hidden rounded-2xl"
        style={{ height }}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        {width > 0 && (
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
          >
            {slides.map((slide, index) => (
              <Pressable
                key={index}
                onPress={slide.onPress}
                style={{ width, height }}
              >
                <View
                  style={StyleSheet.absoluteFill}
                  className="overflow-hidden"
                >
                  {slide.background}
                </View>
                <View style={StyleSheet.absoluteFill} className="bg-black/40" />
                <View className="justify-end flex-1 p-4">
                  <AppText size="lg" weight="bold" className="text-white">
                    {slide.title}
                  </AppText>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}

        <View className="absolute flex-row gap-2 bottom-4 right-4">
          {slides.map((_, index) => (
            <Pressable key={index} onPress={() => goTo(index)} hitSlop={8}>
              <View
                className={`h-2 rounded-full ${
                  current === index ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Banner;
