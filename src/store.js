import create from 'zustand'

export const useStore = create((set) => ({
    userName: '',
    setUserName: (name) => ({ userName: name }),
    email: '',
    setEmail: (e) => ({ email : e }),
    user: null,
    updateUser: (user) => set({ user:  user}),
    mailTo: 0,
    setMailTo: (number) => set((state) => ({ mailTo: state.mailTo + number })),
    notiTo: 0,
    setNotiTo: (number) => set((state) => ({ notiTo: state.notiTo + number})),
    folderUrl: '',
    updateFolderUrl: (url) => set({folderUrl : url}),
    id: '',
    updateId: (id) => set({id : id})
}))