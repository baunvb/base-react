// Simulates server calls
import axios from "axios";
import {host} from "config/host";

export const logout = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};
