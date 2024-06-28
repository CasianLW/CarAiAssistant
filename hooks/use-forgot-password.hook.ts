import { useState } from "react";
import { apiForgotPassword, apiResetPassword } from "@/utils/api";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "@/app/_layout";

interface ForgotPasswordError {
  email?: string;
  newPassword?: string;
  message?: string;
}

const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState<ForgotPasswordError>({});
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigation =
    useNavigation<StackNavigationProp<AuthStackParamList, "SignIn">>();

  const validateEmail = () => {
    let isValid = true;
    const newErrors: ForgotPasswordError = {};

    if (!email) {
      newErrors.email = "L'email est obligatoire";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "L'email n'est pas valide";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateNewPassword = () => {
    if (newPassword.length < 6) {
      setErrors((prev) => ({
        ...prev,
        newPassword: "Le mot de passe doit contenir au moins 6 caractères",
      }));
      return false;
    }
    return true;
  };

  const handleForgotPassword = async () => {
    if (!validateEmail()) return;
    setIsProcessing(true);
    try {
      await apiForgotPassword({ email });
      setIsResetModalVisible(true);
      setErrors({}); // Clear errors on success
    } catch (error) {
      // console.error("Forgot password error", error);
      setErrors({ message: "Email non trouvé, veuillez réessayer." });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePasswordResetConfirm = async () => {
    if (!validateNewPassword()) return;
    setIsProcessing(true);
    try {
      await apiResetPassword({
        email,
        code,
        newPassword,
        confirmPassword: newPassword,
      });
      setIsResetModalVisible(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigation.navigate("SignIn");
      }, 3000); // Wait for 3 seconds before navigating
      setErrors({}); // Clear errors on success
    } catch (error) {
      // console.error("Password reset confirmation error", error);
      setErrors({
        message:
          "Erreur lors de la réinitialisation. Assurez-vous que le code et le nouveau mot de passe sont corrects.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    errors,
    setErrors,
    isResetModalVisible,
    setIsResetModalVisible,
    handleForgotPassword,
    handlePasswordResetConfirm,
    isProcessing,
    showSuccessMessage,
  };
};

export default useForgotPassword;
