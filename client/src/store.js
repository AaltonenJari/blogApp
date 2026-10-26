import { create } from 'zustand'

const useBlogStore = create((set) => ({
  notificationMessage: null,
  notificationStatus: null,

  notificationActions: {
    setNotificationMessage: (message) => set({ notificationMessage: message }),
    setNotificationStatus: (status) => set({ notificationStatus: status }),
  }
}))

export const useNotificationMessage = () => useBlogStore((state) => state.notificationMessage)
export const useNotificationStatus = () => useBlogStore((state) => state.notificationStatus)
export const useNotificationActions = () => useBlogStore((state) => state.notificationActions)