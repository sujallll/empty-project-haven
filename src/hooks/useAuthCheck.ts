import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return {
    toast,
    navigate
  };
};