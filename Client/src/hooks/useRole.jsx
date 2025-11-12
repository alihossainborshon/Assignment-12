import { useContext } from "react";
import { useAxiosSecure } from "./useAxiosSecure";
import { AuthContext } from "./../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      if (!user?.email) return "user"; 
      const { data } = await axiosSecure(`/users/role/${user.email}`);
      return data.role;
    },
    enabled: !!user?.email, 
  });

  return [role, isLoading];
};
