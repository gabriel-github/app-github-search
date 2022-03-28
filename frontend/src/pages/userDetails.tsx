import styled from "../styles/userDetails.module.scss";

import ArrowLeftImg from "../assets/arrow-left.svg";

import { Link, useParams } from "react-router-dom";
import { useUsers } from "../context/usersContext";
import { useState } from "react";
import { CardRepo } from "../components/CardRepo";

type Repo = {
  id: number;
  html_url: string;
  name: string;
  created_at: string;
};

export const UserDetails: React.FC = () => {
  const [listRepos, setListRepos] = useState<Repo[]>([]);

  const { users } = useUsers();
  const { id } = useParams();
  const currentUser = users.find((user) => String(user.id) === id);

  function setStateWithReposOfUser() {
    if (currentUser) {
      setListRepos(currentUser.repos);
    }
  }

  function setStateWithReposStarred() {
    if (currentUser) {
      setListRepos(currentUser.starred);
    }
  }

  if (!currentUser) {
    return (
      <div className={styled.container}>
        <h1>Pagina não encontrada</h1>
      </div>
    );
  }

  return (
    <div className={styled.container}>
      <header className={styled.header}>
        <Link to="/">
          <img src={ArrowLeftImg} alt="Voltar" />
          <p>voltar</p>
        </Link>
      </header>

      <section className={styled.user_section}>
        <div className={styled.profile}>
          <img src={currentUser.image} alt="" />

          <div>
            <h2>{currentUser.name}</h2>
            <p>{currentUser.description}</p>
          </div>
        </div>

        <div className={styled.buttons}>
          <button
            onClick={setStateWithReposOfUser}
            title="repositórios do usuário"
          >
            repos
          </button>
          <button
            onClick={setStateWithReposStarred}
            title="repositórios mais visitados pelo usuário"
          >
            starred
          </button>
        </div>
      </section>

      <section className={styled.card_section}>
        {listRepos.map((repo) => (
          <CardRepo repo={repo} />
        ))}
      </section>
    </div>
  );
};
