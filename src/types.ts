export type EasyProviderProps = {
  children: React.ReactNode;
};

export type AppActions =
  | {
      type: "logout";
    }
  | {
      type: "login";
      payload: User;
    }
  | {
      type: "handlePage";
      payload: Page;
    }
  | {
      type: "updateUser";
      payload: {
        user: User;
      };
    }
  | {
      type: "handleLoading";
      payload: {
        value: boolean;
      };
    }
  | {
      type: "follow";
      payload: {
        user: User | null;
      };
    }
  | {
      type: "unfollow";
      payload: {
        user: User | null;
      };
    };

export type User = {
  _id?: string;
  username: string;
  name?: string;
  lastname?: string;
  email?: string;
  socialNetworks?: SocialNetwork[];
  avatar?: string;
  banner?: string;
  description?: string;
  followers: string[];
  follows: string[];
};

export type SocialNetwork = {
  icon?: string;
  url: string;
  name: string;
};

export type Page = {
  page: string | null;
};

export type Post = {
  _id: string;
  image?: string;
  description?: string;
  likes?: string[];
  shareds?: string[];
  user: User;
  comments?: Comment[];
  totalComments?: number;
};

export type Comment = {
  user: User;
  content: {
    image: string | undefined;
    text: string | undefined;
  };
  likes: [];
};
