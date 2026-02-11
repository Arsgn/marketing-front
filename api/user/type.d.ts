declare namespace AUTH {
  interface User {
    id: number;
    supabaseId: string;
    email: string;
    name: string | null;
    avatar: string | null;
    agreed: boolean | null;
    createdAt: string;
    updatedAt: string;
  }

  interface Session {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    user: {
      id: string;
      email: string;
    };
  }

  interface SignUpReq {
    email: string;
    password: string;
    name?: string;
    avatar?: string;
  }

  interface SignUpRes {
    success: boolean;
    data: {
      user: User;
      session: Session;
    };
  }

  interface SignInReq {
    email: string;
    password: string;
  }

  interface SignInRes {
    success: boolean;
    data: {
      user: User;
      session: Session;
    };
  }

  interface RefreshTokenReq {
    refreshToken: string;
  }

  interface RefreshTokenRes {
    success: boolean;
    data: {
      session: Session;
    };
  }

  interface GetUserRes {
    success: boolean;
    data: User;
  }

  interface UpdateUserReq {
    name?: string;
    avatar?: string;
    agreed?: boolean;
  }

  interface UpdateUserRes {
    success: boolean;
    data: User;
  }

  interface SignOutRes {
    success: boolean;
    message: string;
  }
}
