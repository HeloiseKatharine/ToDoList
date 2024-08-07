// export interface User {
//   username: string;
//   email: string;
// }

// export interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   login: (username: string, email: string) => Promise<void>;
//   logout: () => void;
// }

export interface User {
  username: string;
  password: string;
  id: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface RegisterContextType {
  loading: boolean;
  errorRegister: string | null;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  logout: () => void;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
}
