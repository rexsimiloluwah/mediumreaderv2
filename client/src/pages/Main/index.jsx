import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fuzzySearch } from "react-select-search/dist/cjs";
import Logo from "../../assets/images/logo.svg";
import AudioPlayer from "../../components/AudioPlayer";
import FormSelect from "../../components/FormSelect";
import Languages from "../../utils/JSON/langs.json";
import { axiosBase } from "../../utils/axiosBase";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import SaveArticleModal from "../../components/SaveArticleModal";
import Button from "../../components/Button";
import Nav from "../../components/Nav";
import style from "./index.module.scss";
import {saveArticle} from "../../redux/actions/articleActions";

export default function Main() {
  const [language, setLanguage] = useState("en"); // English is set as the default language
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [audioFileUrl, setAudioFileUrl] = useState(null);
  const [saveArticleOpen, setSaveArticleOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    if(localStorage.getItem("articleData")){
        setResponse(JSON.parse(localStorage.getItem("articleData")));
    }
  }, [setResponse])

  const handleSelectLanguage = (e) => {
    setLanguage(e);
    //console.log(language);
  };

  const handleSaveArticleToggle = () => {
    setSaveArticleOpen(!saveArticleOpen);
  };

  const handleSaveArticle = (data) => {
    console.log("Handling save article action");
    dispatch(saveArticle({
      ...data,
      audioFileUrl: response.audioFileUrl || JSON.parse(localStorage.getItem("articleData")).audioFileUrl,
      blogUrl: response.blogUrl || JSON.parse(localStorage.getItem("articleData")).blogUrl
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      url: e.target.url.value,
    };
    setResponse(null);
    setAudioFileUrl(null);
    toast.info("🥺 This might take a while...");
    setLoading(true);

    axiosBase
      .post(`/audio?lang=${language}`, data)
      .then((response) => {
        console.log(response.data);
        const { data } = response.data;
        setResponse(data)
        setAudioFileUrl(data.audioFileUrl);
        localStorage.setItem("articleData", JSON.stringify(data));
        setLoading(false);
        toast.success("😎 Get a chilled drink and listen to your article.");
      })
      .catch((err) => {
        setLoading(false);
        toast.dismiss();
        console.log(err.response.data);
        const { error } = err.response.data;
        toast.error(error);
      });
  };

  return (
    <>
      <SaveArticleModal 
        isOpen={saveArticleOpen}
        handleToggle={handleSaveArticleToggle}
        handleSaveArticle={handleSaveArticle}
      />

      <Nav />
      <section>
        <div className={style["main"]}>
          <img src={Logo} alt="Logo" className={style.logo} />
          <p>
            LISTEN to your Favourite Blog posts and Articles online, Enhance
            retention and productivity.
          </p>
          <div className={style.container}>
            <FormSelect
              options={Languages.map((lang) => ({
                name: lang.flag + " " + lang.language,
                value: lang.slug,
              }))}
              search
              name="language"
              filterOptions={fuzzySearch}
              placeholder="Select your Language."
              onChange={handleSelectLanguage}
            />

            <form className={style["form--listen"]} onSubmit={handleSubmit}>
              <input
                type="text"
                name="url"
                placeholder="Paste link to Article"
                required
              />
              <button type="submit">
                Listen <i className="bx bx-headphone"></i>
              </button>
            </form>

            {loading ? (
              <Loader type="Audio" color="#C774E4" height="60" width="200" />
            ) : (
              ""
            )}

            {(audioFileUrl) ? (
              <>
                
                <div className={style.player}>
                  <div>
                    <AudioPlayer src={audioFileUrl} />
                  </div>
                </div>

                <div className={style["article-actions__container"]}>
                  <a href={audioFileUrl}>
                    <button><i className="bx bx-download"></i> Download MP3</button>
                  </a>
                  <a><button onClick={handleSaveArticleToggle}><i className="bx bx-bookmark"></i> Save to Library</button></a>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>

      <div className={style["credits"]}>
        <p>
          Built with💗 by{" "}
          <a
            style={{ color: "#000" }}
            target="blank"
            href="https://simiokunowo.netlify.app"
          >
            Similoluwa Okunowo
          </a>
        </p>
      </div>
    </>
  );
}

