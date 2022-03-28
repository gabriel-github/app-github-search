import { Link } from "react-router-dom";
import ArrowRightImg from "../../assets/arrow-right.svg";

import styled from "./styles.module.scss";

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

interface IUserProps {
  user: IUser;
}

export function CardUser({ user }: IUserProps) {
  return (
    <Link
      key={user.id}
      to={`/${user.id}`}
      className={styled.link}
      title="ver detalhes do usuário"
    >
      <div className={styled.user_info}>
        <img src={user.image} alt="imagem do usuario" />

        <div>
          <p className={styled.name}>{user.name}</p>
          <p className={styled.description}>{user.description}</p>
        </div>
      </div>

      <img src={ArrowRightImg} alt="detalhes do usuário" />
    </Link>
  );
}
