import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
function useGlobal() {
  return useContext(UserContext);
}

export default useGlobal;
