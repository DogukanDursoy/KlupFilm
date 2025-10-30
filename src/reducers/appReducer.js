export const initialState = {
  isLoading: false,
  isError: false,
  shows: [], // API'den gelen ham veritabanı
  watchlist: [],
  query: 'friends', // 1. Akış: Varsayılan sorgu
  filters: {
    genre: '',
    language: '',
    minRating: 0,
  },
  pagination: {
    currentPage: 1,
    pageSize: 6, // 5. Akış: Her sayfada 6 dizi
  },
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        shows: action.payload,
        pagination: { ...state.pagination, currentPage: 1 }, // Yeni aramada başa dön
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
        pagination: { ...state.pagination, currentPage: 1 }, // Filtre değişince başa dön
      };
    case 'ADD_WATCHLIST':
      // Eğer listede zaten varsa ekleme
      if (state.watchlist.find((item) => item.show.id === action.payload.show.id)) {
        return state;
      }
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      };
    case 'REMOVE_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (item) => item.show.id !== action.payload
        ),
      };
    case 'CLEAR_WATCHLIST':
      return {
        ...state,
        watchlist: [],
      };
    case 'SET_PAGE':
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.payload },
      };
    // İsteğe bağlı: Sayfa boyutunu dinamik değiştirmek için
    case 'SET_PAGE_SIZE':
      return {
        ...state,
        pagination: { ...state.pagination, pageSize: action.payload, currentPage: 1 },
      };
    default:
      throw new Error(`Geçersiz eylem türü: ${action.type}`);
  }
};