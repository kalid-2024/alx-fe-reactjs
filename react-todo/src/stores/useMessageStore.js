import { create } from 'zustand';

const useMessageStore = create((set) => ({
  message: '',
  messageType: '', // 'success' or 'error'
  setMessage: (message, type = 'success') => set({ message, messageType: type }),
  clearMessage: () => set({ message: '', messageType: '' }),
}));

export default useMessageStore;