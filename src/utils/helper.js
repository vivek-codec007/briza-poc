import axiosInstance, { customIstance } from "../services/axiosinstance"

export const determineInstance = (type) => {
    switch (type) {
      case 'briza':
        return axiosInstance
      case 'custom':
        return customIstance
      default:
        return axiosInstance
    }
  }
  