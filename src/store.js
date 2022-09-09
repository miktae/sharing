import create from 'zustand'

export const useStore = create((set) => ({
    username: '',
    updateUser: (name) => set({ username: name }),
    mailTo: 0,
    setMailTo: (number) => set((state) => ({ mailTo: state.mailTo + number })),
    notiTo: 0,
    setNotiTo: (number) => set((state) => ({ notiTo: state.notiTo + number})),
    folderUrl: '',
    updateFolderUrl: (url) => set({folderUrl : url}),
    id: '',
    updateId: (id) => set({id : id})
}))