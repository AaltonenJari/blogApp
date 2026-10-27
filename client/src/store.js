import { create } from 'zustand'
import blogService from './services/blogs'

const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),

  actions: {
    initialize: async () => {
      try {
        const blogs = await blogService.getAll()
        set({ blogs })
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    },
    add: async (blogObject) => {
      try {
        const returnedBlog = await blogService.create(blogObject)
        set((state) => ({ blogs: state.blogs.concat(returnedBlog) }))
        return returnedBlog
      } catch (error) {
        throw new Error(`Error creating blog: ${error.response.data.error}`)
      }
    }
  },

  notificationMessage: null,
  notificationStatus: null,

  notificationActions: {
    setNotificationMessage: (message) => set({ notificationMessage: message }),
    setNotificationStatus: (status) => set({ notificationStatus: status }),
  }
}))

export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useSetBlogs = () => useBlogStore((state) => state.setBlogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)

export const useNotificationMessage = () => useBlogStore((state) => state.notificationMessage)
export const useNotificationStatus = () => useBlogStore((state) => state.notificationStatus)
export const useNotificationActions = () => useBlogStore((state) => state.notificationActions)