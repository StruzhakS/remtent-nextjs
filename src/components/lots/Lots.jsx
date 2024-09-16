import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import s from "./Lots.module.css";
import { useTranslation } from "next-i18next";
import SearchTents from "@/components/searchTents/SearchTents";
import UsedTentsCategories from "@/components/usedTents/UsedTentsCategories";
import { searchCategory } from "@/constants/searchCategory";
import UsedTents from "@/components/usedTents/UsedTents";
import { useMediaQuery } from "react-responsive";
import { i18n } from "next-i18next";

const Lots = ({ isPage }) => {
  const { t } = useTranslation();
  const usedTentsRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [usedTents, setUsedTents] = useState([]);
  const [filteredTents, setFilteredTents] = useState([]);
  const handleCategorySelect = category => {
    setSelectedCategory(category);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  const handleSubmit = async search => {
    setSearchQuery(search);
  };

  useEffect(() => {
    const fetchUsedTents = async () => {
      try {
        const response = await axios.get("https://remtent.com/api/posts/", {
          // params: { lang: i18n.language },
        });
        setUsedTents(response.data);
        filterTents(response.data, selectedCategory, searchQuery);
      } catch (error) {
        console.error("Error fetching used tents:", error);
      }
    };

    fetchUsedTents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

  const filterTents = useMemo(
    () =>
      (tents, category, searchQuery = "") => {
        let filtered = tents;
        if (category) {
          filtered = filtered.filter(tent => tent.category === category);
        }
        if (searchQuery) {
          filtered = filtered.filter(tent =>
            tent.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setFilteredTents(filtered);
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCategory, searchQuery]
  );

  return (
    <section className={s.section} ref={usedTentsRef} id="used-tents">
      {!isPage && (
        <h2 className={s.title}>
          {t("Used tents")}: <br />
          <span className={s.styledTitle}>{t("Lots")}</span>
        </h2>
      )}
      <SearchTents t={t} handleSubmit={handleSubmit} />
      {isMobileState && !isPage && (
        <div className={s.categoryTitle}>
          <h3 className={s.subtitle}>{t("Category")}</h3>
        </div>
      )}
      <div style={{ position: "relative" }}>
        <UsedTentsCategories category={searchCategory} onCategorySelect={handleCategorySelect} />
      </div>
      <UsedTents
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        isPage={isPage}
        filteredTents={filteredTents}
      />
    </section>
  );
};

export default Lots;
