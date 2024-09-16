import React, { useState } from "react";
import s from "./SearchTents.module.css";
import search_lupa from "@/images/lupa.svg";
import Image from "next/image";

const SearchTents = ({ t, handleSubmit }) => {
  const [search, setSearch] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(search);
      }}
      className={s.searchContainer}
    >
      <input
        type="text"
        className={s.searchInput}
        placeholder={t("What you looking for?")}
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <button type="submit" className={s.searchButton}>
        {t("Search")}
        <Image
          className={s.searchImage}
          src={search_lupa}
          alt="search"
          width={"auto"}
          height={"auto"}
          priority
        />
      </button>
    </form>
  );
};

export default SearchTents;
