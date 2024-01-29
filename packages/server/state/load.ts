export async function loadState() {
  // store.getState
  const initialState = {
    user: {
      user: null,
      isLoggedIn: null,
      error: null,
    },
    leaderboard: {
      records: [],
      isLoading: true,
      error: null,
    },
  }

  return initialState
}
