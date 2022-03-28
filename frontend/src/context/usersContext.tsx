import { createContext, ReactNode, useContext, useState } from "react";

type Starred = {
  id: number;
  html_url: string;
  name: string;
  created_at: string;
};

type Repo = {
  id: number;
  html_url: string;
  name: string;
  created_at: string;
};

type IUser = {
  id: number;
  name: string;
  description: string;
  image: string;
  repos: Repo[];
  starred: Starred[];
};

interface IUsersContextData {
  users: IUser[];
  addNewUser: (user: IUser) => void;
}

interface IUsersProvider {
  children: ReactNode;
}

const UsersContext = createContext({} as IUsersContextData);

export function UsersProvider({ children }: IUsersProvider) {
  const [users, setUsers] = useState<IUser[]>(() => {
    const storagedUsers = localStorage.getItem("@users");

    if (storagedUsers) {
      return JSON.parse(storagedUsers);
    }

    return [];
  });

  function addNewUser(newUser: IUser) {
    const userAlreadyExists = users.find((user) => user.id === newUser.id);

    if (userAlreadyExists) {
      alert("Usuário ja esta na lista");
      return;
    }

    const updateUsers = [...users, newUser];
    setUsers([...updateUsers]);

    localStorage.setItem("@users", JSON.stringify(updateUsers));
  }

  console.log(users);

  return (
    <UsersContext.Provider
      value={{
        users,
        addNewUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
