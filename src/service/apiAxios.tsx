import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
const api = axios.create({
  baseURL: "http://3.145.218.238:3333/",
  //baseURL: "http://192.168.0.151:3333/",
});

api.interceptors.request.use(async (config: any) => {
  try {
    const token = await AsyncStorage.getItem("@token");

    //config.headers.token = token;

    if (token) {
      config.headers.token = token;
    }

    return config;
  } catch (err) {
    //alert(err);
  }
});

export default api;
