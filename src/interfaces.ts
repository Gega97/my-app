import { Post, User } from "./types";

export interface IAppState {
  isLogged: boolean;
  user: User | null;
  page: string | null;
  loading: boolean;
  homePost: Post[];
}

export interface IGlobarProps {
  isMobile: boolean;
}

export interface IAppContext {
  state: IAppState;
  login: (user: User, token: string) => void;
  logout: () => void;
  handlePage: (page: string | null) => void;
  updateUser: (user: User) => void;
  handleLoading: (value: boolean) => void;
  handleFollow: (username: string) => void;
  handleUnfollow: (username: string) => void;
}
export interface ILoginProps {
  login: (username: string, password: string) => void;
  goToSignUp: () => void;
}

export interface ISignupProps {
  goToLogin: () => void;
  onRegistry: (
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}

export interface IPageProps {
  state: IAppState;
  logout: () => void;
  isMobile: boolean;
}

export interface IPostDetailProps {
  state: IAppState;
  isMobile: boolean;
  post: Post | undefined;
  handleFollow: () => void;
  handleUnfollow: () => void;
  addLike: (_id: string, idUser: string | undefined) => void;
  removeLike: (_id: string, idUser: string | undefined) => void;
  getMoreComments: () => void;
  isShowMoreComments: boolean;
  text: string;
  handleText: (currentText: string) => void;
  addComment: (isPost: boolean, image: string, text: string) => void;
}

export interface IHomeProps {
  state: IAppState;
  isMobile: boolean;
  posts: Post[];
  addLike: (_id: string, idUser: string | undefined) => void;
  removeLike: (_id: string, idUser: string | undefined) => void;
  selectedPost: Post | undefined;
  handleSelectedPost: (post: Post) => void;
  addComment: (isPost: boolean, image: string, text: string) => void;
  text: string;
  handleText: (currentText: string) => void;
  onNavigate: (id: string, isPost: boolean) => void;
  getMoreComments: () => void;
  isShowMoreComments: boolean;
  isLoadingPost: boolean;
}

export interface IPostItemProps {
  post: Post;
  onNavigate: (id: string, isPost: boolean) => void;
  state: IAppState;
  addLike: (_id: string, idUser: string | undefined) => void;
  removeLike: (_id: string, idUser: string | undefined) => void;
  selectedPost: Post | undefined;
  handleSelectedPost: (post: Post) => void;
  addComment: (isPost: boolean, image: string, text: string) => void;
  text: string;
  handleText: (currentText: string) => void;
  getMoreComments: () => void;
  isShowMoreComments: boolean;
  page: string;
}

export interface IPostProps {
  state: IAppState;
  isMobile: boolean;
  onCreatePost: () => void;
  file: any;
  setFile: (file: any) => void;
  description: string;
  handleDescription: (value: string) => void;
}

export interface IProfileProps {
  onNavigate: (id: string, isPost: boolean) => void;

  state: IAppState;
  logout: () => void;
  isMobile: boolean;
  isEditProfile: boolean;
  onEditProfile: (isEdit: boolean) => void;
  updateUser: (
    username: string,
    email: string,
    name: string,
    lastname: string,
    description: string,
    file: any
  ) => Promise<void>;
  isGuess: boolean;
  isGuessUser: User | null;
  handleFollow: (username: string) => void;
  handleUnfollow: (username: string) => void;
  posts: Post[];
  addLike: (_id: string, idUser: string | undefined) => void;
  removeLike: (_id: string, idUser: string | undefined) => void;
  selectedPost: Post | undefined;
  handleSelectedPost: (post: Post) => void;
  text: string;
  handleText: (currentText: string) => void;
  getMoreComments: () => void;
  isShowMoreComments: boolean;
  addComment: (isPost: boolean, image: string, text: string) => void;
}

export interface IAppBar {
  state: IAppState;
  isMobile: boolean;
}

export interface IAppBarPost {
  state: IAppState;
  isMobile: boolean;
  onCreatePost: () => void;
  page: string;
}

export interface IUserForm {
  state: IAppState;
  isMobile: boolean;
  onCancel: () => void;
  onSave: (
    username: string,
    email: string,
    name: string,
    lastname: string,
    description: string,
    file: any
  ) => void;
}

export interface IPostForm {
  state: IAppState;
  isMobile: boolean;
  image: string;
  file: any;
  setFile: (file: any) => void;
  description: string;
  handleDescription: (value: string) => void;
}

export interface ILoginForm {
  onLogin: (username: string, password: string) => void;
  goToSignUp: () => void;
}

export interface ISignupForm {
  goToLogin: () => void;
  onRegistry: (
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}

export interface IFeedProps {
  state: IAppState;
  isMobile: boolean;
  goToProfile: (username: string) => void;
  handleFollow: (username: string) => void;
  handleUnfollow: (username: string) => void;
  posts: Post[] | undefined;
  onNavigate: (id: string, isPost: boolean) => void;
}

export interface IUserList {
  isMobile: boolean;
  goToProfile: (username: string) => void;
  handleFollow: (username: string) => void;
  handleUnfollow: (username: string) => void;
  user: User;
  isFollow: boolean;
}
