// arguments
export interface LoginArgs {
  email: string;
  password: string;
}

export interface RegisterArgs {
  name: string;
  email: string;
  profile: string;
  password: string;
}

export interface UpdateArgs {
  id: number;
  ogEmail: string;
  name: string;
  email: string;
  profile: string;
  password: string;
  isNewPassword: boolean;
}

export interface CreateRoomArgs {
  title: string;
  description: string;
  isPrivate: boolean;
  picture: string;
}

// types
export interface User {
  id: number;
  email: string;
  name: string;
  profile: string;
  password?: string;
}
