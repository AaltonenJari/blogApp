import { create } from 'zustand'
import blogService from './services/blogs'

const useUserStore = create((set) => ({
  user: [],
  setUser: (user) => set({ user }),

  actions: {
    getSignedInUser: async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        set({ user })
        blogService.setToken(user.token)
      }
    }
  }
}))

export const setUser = (user) => {
  useUserStore.setState({ user })
}
export const useUser = () => useUserStore((state) => state.user)
export const useSetUser = () => useUserStore((state) => state.setUser)
export const useUserActions = () => useUserStore((state) => state.actions)

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
    },
    update: async (id, updatedBlog) => {
      try {
        const returnedBlog = await blogService.update(id, updatedBlog)
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id !== id ? blog : returnedBlog
          ),
        }))
        return returnedBlog
      } catch (error) {
        throw new Error(`Error updating blog: ${error.response.data.error}`)
      }
    },
    delete: async (id) => {
      try {
        await blogService.remove(id)
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
        }))
      } catch (error) {
        throw new Error(`Error deleting blog: ${error.response.data.error}`)
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