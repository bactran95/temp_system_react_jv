export interface LoginFormI {
  email: string;
  password: string;
}

export interface LoginErrorI {
  data: {
    message: string;
  };
}

export interface LoginSuccessI {
  data: {
    accessToken: string;
  };
}
