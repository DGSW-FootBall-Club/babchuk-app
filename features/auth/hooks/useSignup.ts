import { useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import { signup } from "@/entities/auth/api";

type SignupForm = {
  username: string;
  password: string;
  name: string;
  grade: string;
  room: string;
  number: string;
};

const INITIAL: SignupForm = {
  username: "",
  password: "",
  name: "",
  grade: "",
  room: "",
  number: "",
};

export function useSignup() {
  const navigation = useNavigation();
  const [values, setValues] = useState<SignupForm>(INITIAL);
  // data URL (data:image/...;base64,...) ready to send to the API, mirroring web.
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof SignupForm, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  // preview uri for <Image source={{ uri: preview }} /> — same string we submit.
  const preview = profileImage;

  const handleImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("권한 필요", "사진 접근 권한을 허용해주세요.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (result.canceled) return;
    const asset = result.assets[0];
    const mime = asset.mimeType ?? "image/jpeg";
    setProfileImage(
      asset.base64 ? `data:${mime};base64,${asset.base64}` : asset.uri,
    );
  };

  const isValid =
    values.username.trim().length >= 4 &&
    values.password.length >= 8 &&
    values.name.trim().length > 0 &&
    /^[1-3]$/.test(values.grade) &&
    /^\d+$/.test(values.room) &&
    /^\d+$/.test(values.number);

  const handleSignup = async () => {
    if (isLoading || !isValid) return;
    setIsLoading(true);
    try {
      await signup({
        username: values.username.trim(),
        password: values.password,
        name: values.name.trim(),
        grade: Number(values.grade),
        room: Number(values.room),
        number: Number(values.number),
        profileImage: profileImage ?? undefined,
      });
      Alert.alert("회원가입 완료", "로그인해주세요.", [
        { text: "확인", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      const message =
        axios.isAxiosError(e) && e.response?.data?.message
          ? String(e.response.data.message)
          : "회원가입에 실패했어요.";
      Alert.alert("회원가입 실패", message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    values,
    handleChange,
    preview,
    handleImage,
    isValid,
    isLoading,
    handleSignup,
  };
}
