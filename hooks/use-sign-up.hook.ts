import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/slices/auth-slice";
import { apiRegister, apiLogin } from "@/utils/api";
import { DecodedToken, LoginPayload, RegisterPayload } from "@/interfaces/auth";
// import { decode } from "react-native-pure-jwt";
import JWT from "expo-jwt";
interface SignUpErrors {
  email?: string;
  username?: string;
  password?: string;
}
const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const validate = () => {
    let isValid = true;
    let validationErrors: SignUpErrors = {};

    if (!email) {
      validationErrors.email = "L'email est obligatoire";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "L'email n'est pas valide";
      isValid = false;
    }

    if (!username) {
      validationErrors.username = "Le surnom est obligatoire";
      isValid = false;
    } else if (username.length < 3 || username.length > 20) {
      validationErrors.username =
        "Le surnom doit être compris entre 3 et 20 caractères";
      isValid = false;
    }

    if (!password) {
      validationErrors.password = "Le mot de passe est obligatoire";
      isValid = false;
    } else if (password.length < 6) {
      validationErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setIsProcessing(true);

    try {
      const registerPayload: RegisterPayload = { username, email, password };
      const response = await apiRegister(registerPayload);
      const { access_token } = response.data;

      if (access_token) {
        const decodedToken = JWT.decode(
          access_token,
          process.env.JWT_SECRET || ""
        );
        const userData: DecodedToken = {
          email: decodedToken.email,
          userId: decodedToken.userId,
          username: decodedToken.username,
          roles: decodedToken.roles,
          isBanned: decodedToken.isBanned,
          isPremium: decodedToken.isPremium,
        };
        dispatch(setUser(userData));
      } else {
        setIsMessageModalOpen(true);
      }
    } catch (error) {
      console.error("Sign up error", error);
      setIsMessageModalOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmSignUp = async () => {
    try {
      // This function is kept for future use when confirmation is implemented
      // Currently, it does nothing
      console.log("Confirmation step (currently unused)");
    } catch (error) {
      console.error("Error confirming sign up:", error);
    } finally {
      setIsConfirmModalVisible(false);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    isConfirmModalVisible,
    setIsConfirmModalVisible,
    confirmationCode,
    setConfirmationCode,
    handleSignUp,
    handleConfirmSignUp,
    isMessageModalOpen,
    setIsMessageModalOpen,
    errors,
    isProcessing,
    setIsProcessing,
  };
};

export default useSignUp;
