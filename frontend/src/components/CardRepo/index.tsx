import styled from "./styles.module.scss";
import ArrowRightImg from "../../assets/arrow-right.svg";

type Repo = {
  id: number;
  html_url: string;
  name: string;
  created_at: string;
};

interface RepoProps {
  repo: Repo;
}

export function CardRepo({ repo }: RepoProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className={styled.link}
      title="ir para repositório"
      key={repo.id}
    >
      <div>
        <p className={styled.name}>{repo.name}</p>
        <p className={styled.description}>{repo.created_at}</p>
      </div>

      <img src={ArrowRightImg} alt="ir para repositório no github" />
    </a>
  );
}
