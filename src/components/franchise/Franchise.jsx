import React, { useState } from "react";
import s from "./Franchise.module.css";
import { useTranslation } from "next-i18next";
import axios from "axios";

const Franchise = () => {
  const { t } = useTranslation();
  const [franchiseForm, setFranchiseForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [message, setMessage] = useState(""); // Стан для повідомлень
  const [messageClass, setMessageClass] = useState(""); // Стан для класу повідомлень

  const handleChange = e => {
    const { name, value } = e.target;
    setFranchiseForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("http://remtent.com/api/franchise-request/", franchiseForm);
      console.log("Дані відправлено", response.data);
      setMessage(t("successMessage"));
      setMessageClass(s.successMessage);
    } catch (error) {
      console.error("Помилка відправки даних", error);
      setMessage(t("errorMessage"));
      setMessageClass(s.errorMessage);
    }
  };

  return (
    <section className={s.section}>
      <h2 className={s.title}>
        {t("FranchiseTitle")} <span>{t("workWithUs")}</span>
      </h2>
      <p>{t("franchiseDescription")}</p>
      {message && <p className={`${s.message} ${messageClass}`}>{message}</p>}
      <form className={s.franchiseForm} onSubmit={handleSubmit}>
        <label htmlFor="name">
          {t("Name")}
          <input
            className={s.franchiseInput}
            type="text"
            onChange={handleChange}
            name="name"
            value={franchiseForm.name}
            required
            placeholder={t("inputName")}
          />
        </label>
        <label htmlFor="phone">
          {t("Phone")}
          <input
            className={s.franchiseInput}
            type="tel"
            name="phone"
            pattern="^\d{3}\d{3}\d{2}\d{2}$"
            onChange={handleChange}
            value={franchiseForm.phone}
            required
            placeholder={"0501589860"}
          />
        </label>
        <label htmlFor="email">
          {t("Email")}
          <input
            className={s.franchiseInput}
            type="email"
            onChange={handleChange}
            name="email"
            value={franchiseForm.email}
            required
            placeholder={t("inputEmail")}
          />
        </label>
        <button type="submit">{t("Send")}</button>
      </form>
      <h1
        style={{
          backgroundColor: "rgba(2, 129, 94, 1)",
          color: "white",
          textAlign: "center",
          padding: "20px",
          margin: "15px 0 0 0",
          borderRadius: "7px",
          fontSize: "20px",
          lineHeight: "1.5",
        }}
      >
        {t("uniqueOpportunity")}
      </h1>

      <h2
        style={{
          color: "rgb(0,0,0)",
          margin: "20px 0 10px",
          padding: "0 20px",
          fontSize: "20px",
        }}
      >
        {t("franchiseBenefits")}
      </h2>

      <ul
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        {[
          {
            title: t("customerAttraction"),
            text: t("customerAttractionDesc"),
          },
          {
            title: t("equipmentProvision"),
            text: t("equipmentProvisionDesc"),
          },
          {
            title: t("supportTraining"),
            text: t("supportTrainingDesc"),
            nestedList: [
              {
                title: t("theoreticalClasses"),
                text: t("theoreticalClassesDesc"),
              },
              { title: t("practicalClasses"), text: t("practicalClassesDesc") },
              {
                title: t("accommodationMeals"),
                text: t("accommodationMealsDesc"),
              },
            ],
          },
        ].map((item, index) => (
          <li
            key={index}
            style={{
              margin: "5px 0",
              fontSize: "16px",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "4px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <strong style={{ color: "rgba(2, 129, 94, 1)" }}>{item.title}</strong> {item.text}
            {item.nestedList && (
              <ul
                style={{
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >
                {item.nestedList.map((nestedItem, nestedIndex) => (
                  <li
                    key={nestedIndex}
                    style={{
                      margin: "5px 0",
                      fontSize: "16px",
                      backgroundColor: "#fff",
                      padding: "10px",
                      borderRadius: "4px",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <strong style={{ color: "rgba(2, 129, 94, 1)" }}>{nestedItem.title}</strong>{" "}
                    {nestedItem.text}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <h2
        style={{
          color: "rgb(0,0,0)",
          margin: "20px 0 10px",
          padding: "0 20px",
          fontSize: "20px",
        }}
      >
        {t("howToApply")}
      </h2>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        {[
          { title: t("fillForm"), text: t("fillFormDesc") },
          { title: t("reviewApplication"), text: t("reviewApplicationDesc") },
          { title: t("signContract"), text: t("signContractDesc") },
        ].map((item, index) => (
          <p
            key={index}
            style={{
              margin: "5px 0",
              fontSize: "16px",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "4px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <strong style={{ color: "rgba(2, 129, 94, 1)" }}>{item.title}</strong> {item.text}
          </p>
        ))}
      </div>

      <h2
        style={{
          color: "rgb(0,0,0)",
          margin: "20px 0 10px",
          padding: "0 20px",
          fontSize: "20px",
        }}
      >
        {t("contactForApplication")}
      </h2>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        {[
          { label: t("email"), value: "alex243660alex@gmail.com" },
          { label: t("phone"), value: "+380501589860" },
          { label: t("address"), value: t("addressDesc") },
        ].map((contact, index) => (
          <p
            key={index}
            style={{
              margin: "5px 0",
              fontSize: "16px",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "4px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <strong style={{ color: "rgba(2, 129, 94, 1)" }}>{contact.label}</strong>{" "}
            {contact.value}
          </p>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "rgba(2, 129, 94, 1)",
          color: "white",
          width: "100%",
          bottom: "0",
          borderRadius: "5px",
          fontSize: "20px",
        }}
      >
        {t("waitingForYourApplication")}
      </div>
    </section>
  );
};

export default Franchise;
