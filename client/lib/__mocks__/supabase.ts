export const supabase = {
  auth: {
    getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
    signIn: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChange: vi.fn(() => {
      return {
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      };
    }),
  },
};