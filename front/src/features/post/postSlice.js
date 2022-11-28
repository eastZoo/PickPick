import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backUrl } from "../../config/config";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = backUrl; // aws back서버에 ip주소로 변경
const initialState = {
  loading: false,
  posts: [{
    id: "1",
    userId: 1,
    title: "이게 충신이 맞아?",
    subtitle: "이게 충신이 맞아?",
    broadcaster: "우왁굳의 게임방송",
    thumbnail: "https://img.youtube.com/vi/1exrXkxFrao/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "1exrXkxFrao"
  },
  {
    id: "2",
    userId: 1,
    title: "개 뜬끔없이 듀얼하는 상황극(VR챗 상황극 콘테스트)",
    subtitle: "매일 저녁 9시 업로드 (올릴거 있을 때만)",
    broadcaster: "우왁굳의 게임방송",
    thumbnail: "https://img.youtube.com/vi/_zG3kpAn_MM/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-2.jpg",
    url: "_zG3kpAn_MM"
  },
  {
    id: "3",
    userId: 2,
    title: "이세돌 숙소 살림 다 갖다파는 주르르",
    subtitle: "#이세돌 #주르르 #VRC",
    broadcaster: "주르르 JURURU",
    thumbnail: "https://img.youtube.com/vi/oZPaBHyUhY0/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-3.jpg",
    url: "oZPaBHyUhY0"
  },
  {
    id: "4",
    userId: 3,
    title: "이네야~ ^a^",
    subtitle: "ㅡ3ㅡ 이상적인~~~ 오네쨩다몽!",
    broadcaster: "고세구 GOSEGU",
    thumbnail: "https://img.youtube.com/vi/Luff9esx0TM/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-4.jpg",
    url: "Luff9esx0TM"
  },
  {
    id: "5",
    userId: 4,
    title: "이런걸로 웃으면 안돼!",
    subtitle: "이런걸로 웃으면 안돼!웃참 챌린지",
    broadcaster: "아이네 INE",
    thumbnail: "https://img.youtube.com/vi/vHTNARbI6Cg/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-5.jpg",
    url: "vHTNARbI6Cg"
  },
  {
    id: "6",
    userId: 4,
    title: "더빙의 시작",
    subtitle: "팬아트 속 둘기 목소리 더빙 모음 더빙의 시작",
    broadcaster: "아이네 INE",
    thumbnail: "https://img.youtube.com/vi/iMklu1tpIYc/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-6.jpg",
    url: "iMklu1tpIYc"
  },
  {
    id: "7",
    userId: 5,
    title: "버거 싶은 밤 라디오 2화 : 사과",
    subtitle: "이번엔 메일로 대본을 보내주셔서 제 글과 약간 섞어서 진행해 보았어요 도와주신 양설님 다시 한번 감사합니다! 메일로는 사연을 받고 있지않습니다! 오직 생방송에서 채팅과 왁물원게시판 댓글로만 받고 있으니까 참고 부탁드려요! 오늘도 푹 주무시길 바랍니다🤍",
    broadcaster: "징버거 JINGBURGER",
    thumbnail: "https://img.youtube.com/vi/HOphA-rPxTc/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-7.jpg",
    url: "HOphA-rPxTc"
  },
  {
    id: "8",
    userId: 6,
    title: "뭐 왜 또",
    subtitle: "뭐 왜 또 키보드",
    broadcaster: "릴파 lilpa",
    thumbnail: "https://img.youtube.com/vi/5XSuX8Wnv60/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "5XSuX8Wnv60"
  },
  {
    id: "9",
    userId: 4,
    title: "왜 나한테만 그러는데 - 팬게임",
    subtitle: "왜 나한테만 그러는데 - 팬게임(이세계! 미해결 사건 파일)",
    broadcaster: "아이네 INE",
    thumbnail: "https://img.youtube.com/vi/Me_MqT6txFM/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "Me_MqT6txFM"
  },
  {
    id: "10",
    userId: 4,
    title: "여름이었다 - 깃털라디오 3화",
    subtitle: "여름이었다 - 깃털라디오 3화",
    broadcaster: "아이네 INE",
    thumbnail: "https://img.youtube.com/vi/8hSzCyfdjVI/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "8hSzCyfdjVI"
  },
  {
    id: "11",
    userId: 4,
    title: "대가리 맞는 훈수충 특",
    subtitle: "대가리 맞는 훈수충 특",
    broadcaster: "아이네 INE",
    thumbnail: "https://img.youtube.com/vi/uGqm6_jClUU/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "uGqm6_jClUU"
  },
  {
    id: "12",
    userId: 3,
    title: "???: 왁충아 ㅋㅋ",
    subtitle: "왁충아 고세구!",
    broadcaster: "고세구 GOSEGU",
    thumbnail: "https://img.youtube.com/vi/2MmuVgusBj8/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "2MmuVgusBj8"
  },
  {
    id: "13",
    userId: 1,
    title: "시청자들의 집을 훔쳐보면서 주제넘게 평가하기 - 보여줘 왁즈",
    subtitle: "시청자들의 집을 훔쳐보면서 주제넘게 평가하기 - 보여줘 왁즈",
    broadcaster: "우왁굳의 게임방송",
    thumbnail: "https://img.youtube.com/vi/ynzXIOSEzZs/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "ynzXIOSEzZs"
  },
  {
    id: "14",
    userId: 3,
    title: "아이언도 사람이야",
    subtitle: "세구의 다이아 날은... 온다...",
    broadcaster: "고세구 GOSEGU",
    thumbnail: "https://img.youtube.com/vi/xtrOnlilmGQ/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "xtrOnlilmGQ"
  },
  {
    id: "15",
    userId: 1,
    title: "시청자들의 연봉을 알아보았습니다",
    subtitle: "시청자들의 연봉을 알아보았습니다",
    broadcaster: "우왁굳의 게임방송",
    thumbnail: "https://img.youtube.com/vi/3cKGMsMUvxI/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "3cKGMsMUvxI"
  },
  {
    id: "16",
    userId: 1,
    title: "살다살다 '이 동물'이 침대위에 있는 건 처음 봅니다 - 왁물원 5화",
    subtitle: "살다살다 '이 동물'이 침대위에 있는 건 처음 봅니다 - 왁물원 5화",
    broadcaster: "우왁굳의 게임방송",
    thumbnail: "https://img.youtube.com/vi/xL1w2mxNA5o/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "xL1w2mxNA5o"
  },
  {
    id: "17",
    userId: 1,
    title: "아내 몰래 XX 사다가 걸렸습니다 - 왁굳의 노가리",
    subtitle: "아내 몰래 XX 사다가 걸렸습니다 - 왁굳의 노가리",
    broadcaster: "우왁굳의 게임방송",
    thumbnail: "https://img.youtube.com/vi/OwuNA_LnDEI/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "OwuNA_LnDEI"
  },
  {
    id: "18",
    userId: 1,
    title: "물건 모른채로 판매하기 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    subtitle: "물건 모른채로 판매하기 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    broadcaster: "우왁굳의 게임방송",
    thumbnail: "https://img.youtube.com/vi/A7JiNM1bUm4/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "A7JiNM1bUm4"
  },
  {
    id: "19",
    userId: 4,
    title: "사긴 샀지만...",
    subtitle: "사긴 샀지만...맥북... 정작 되는게 없어",
    broadcaster: "아이네 INE",
    thumbnail: "https://img.youtube.com/vi/kBGZNtR0FAs/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "kBGZNtR0FAs"
  },
  {
    id: "20",
    userId: 6,
    title: "화해했습니다~",
    subtitle: "화해했습니다~릴파아이네",
    broadcaster: "릴파 lilpa",
    thumbnail: "https://img.youtube.com/vi/fXUh_SoadGM/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "fXUh_SoadGM"
  },
  {
    id: "21",
    userId: 6,
    title: "대 악질 시대 - VR챗 상황극",
    subtitle: "대 악질 시대 - VR챗 상황극",
    broadcaster: "아이네 INE",
    thumbnail: "https://img.youtube.com/vi/NIAAXiVwuqs/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "NIAAXiVwuqs"
  },
  {
    id: "22",
    userId: 6,
    title: "119를 왜 부르냐고ㅋㅋㅋㅋㅋ",
    subtitle: "앗 뜨거! 119에 전화해!!119를 왜 부르냐고ㅋㅋㅋㅋㅋ",
    broadcaster: "아이네 INE",
    thumbnail: "https://img.youtube.com/vi/U8IOYMFuWc0/hqdefault.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg",
    url: "U8IOYMFuWc0"
  }],
  error: '',
  current: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

// 카카오 로그인시 토큰 로직
export const kakaoLogin = createAsyncThunk("GET/LOGIN", async (code) => {
  await axios
    .get(`/login?code=${code}`)
    .then((res) => {
      console.log(res); // 토큰이 넘어올 것임
      const ACCESS_TOKEN = res.data;
      localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

    }).catch((error) =>
      console.log(error)
    );
});

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  return axios.get('/posts').then((res) => res.data);
});

export const addPost = createAsyncThunk("post/addNewPost", async (data) => {
  // post뒤에 .then 안붙혀서 데이터가 넘어오지 않았음 메모 ( 실수방지메모 )
  const response = await axios.post('/post', { post: data }).then((res) => res.data)
  return response
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    //state는 initialState 현재값에 접근하는 변수이다.
    current: (state, action) => {
      state.current = action.payload;
      console.log(state.current);
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.loading = true
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false
      state.posts = action.payload
      state.error = ''
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false
      state.posts = []
      state.error = action.error.message
    },
    // 공유 글 추가
    [addPost.pending]: (state) => {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    [addPost.fulfilled]: (state, action) => {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.posts.unshift(action.payload)
      console.log(action.data);
    },
    [addPost.rejected]: (state, action) => {
      state.addPostLoading = false;
      state.addPostError = action.error;
      state.error = action.error.message
    },
  },
});

export const selectAllPosts = (state) => state.post.posts
// export const { addPost } = postSlice.actions;

export default postSlice.reducer;









