import styled from "../styles/home.module.scss";

import LogoImg from "../assets/logo.svg";

import { Link } from "react-router-dom";
import { api } from "../services/api";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useUsers } from "../context/usersContext";
import { CardUser } from "../components/CardUser";

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

export const Home: React.FC = () => {
  const [token, setToken] = useState(() => {
    const tokenStorage = localStorage.getItem("@authtoken");

    if (tokenStorage) {
      return JSON.parse(tokenStorage);
    }

    return undefined;
  });
  const userSearch = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const { addNewUser, users } = useUsers();

  const scopes = ["repo", "read:user", "public_repo"];
  const authenticateUrl = `https://github.com/login/oauth/authorize?scope=${encodeURI(
    scopes.join(" ")
  )}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;

  function formatRepos(repos: Repo[]) {
    return repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      created_at: new Intl.DateTimeFormat("pt-BR").format(
        new Date(repo.created_at)
      ),
    }));
  }

  async function getUserData(userName: string) {
    const { data: user } = await api.get(`/${userName}`);
    const { data: repos } = await api.get<Repo[]>(`/${userName}/repos`);
    const { data: starred } = await api.get<Starred[]>(`/${userName}/starred`);

    const reposFormatted: Repo[] = formatRepos(repos);
    const starredFormatted: Starred[] = formatRepos(starred);

    const newUser: IUser = {
      id: user.id,
      name: user.name,
      description: user.bio,
      image: user.avatar_url,
      repos: reposFormatted,
      starred: starredFormatted,
    };

    return newUser;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!token) {
      alert("É necessário fazer login");
      return;
    }

    if (!userSearch.current) {
      return;
    }

    if (userSearch.current.value.trim().length <= 0) {
      alert("digite algum usuário");
      return;
    }

    setLoading(true);

    try {
      const newUser = await getUserData(userSearch.current.value);

      addNewUser(newUser);
    } catch (error) {
      alert("Erro ao encontrar usuário");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const URL_PARAMS = new URLSearchParams(window.location.search);
    const TOKEN = URL_PARAMS.get("token");

    if (TOKEN) {
      setToken(TOKEN);
      localStorage.setItem("@authtoken", JSON.stringify(TOKEN));
    }
  }, []);

  return (
    <div className={styled.container}>
      <header className={styled.header}>
        <div>
          <img src={LogoImg} alt="Logo da aplicação" />

          <Link to="/">github_search</Link>
        </div>

        <a href={authenticateUrl} className={styled.sign_in_button}>
          {token ? "logado" : "Login com github"}
        </a>
      </header>

      <section className={styled.search_section}>
        <h1 className={styled.title}>
          Busque usuários <br />
          do Github.
        </h1>

        <form className={styled.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Digite aqui" ref={userSearch} />
          <button type="submit" title="buscar por usuário">
            {loading ? "buscando..." : "Pesquisar"}
          </button>
        </form>
      </section>

      <section className={styled.card_section}>
        {users.map((user) => (
          <CardUser user={user} />
        ))}
      </section>
    </div>
  );
};
