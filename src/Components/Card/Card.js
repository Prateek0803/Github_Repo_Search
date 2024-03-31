import React from "react";
import "./styles.css";
import moment from "moment";

const Card = ({ data }) => {
  const {
    watchers_count,
    name,
    forks_count,
    description,
    stargazers_count,
    owner,
    created_at,
    updated_at,
    language,
  } = data;
  const { avatar_url } = owner;
  return (
    <div className="card">
      <div className="card-header">
        <img src={avatar_url} alt="avatar" className="avatar" />
        <div className="repo-info">
          <p className="repo-name">{name}</p>
          <p className="repo-stars">{stargazers_count} stars</p>
        </div>
      </div>
      <div className="card-body">
        <p className="repo-description">{description}</p>
        <div className="repo-details">
          <p>Language: {language}</p>
          <p>Watchers: {watchers_count}</p>
          <p>Forks: {forks_count}</p>
          <p>Created At: {moment(created_at).format("LLL")}</p>
          <p>Updated At: {moment(updated_at).format("LLL")}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
