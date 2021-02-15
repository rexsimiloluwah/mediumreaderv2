import React, {useState} from 'react';
import { fuzzySearch } from 'react-select-search/dist/cjs';
import Logo from '../../assets/images/logo.svg';
import AudioPlayer from '../../components/AudioPlayer';
import FormSelect from '../../components/FormSelect';
import Languages from '../../utils/JSON/langs.json';
import {axiosBase} from '../../utils/axiosBase';
import {toast} from 'react-toastify';
import Loader from 'react-loader-spinner';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import style from './index.module.scss';

export default function Main(){

    const [language, setLanguage] = useState("en"); // English is set as the default language
    const [loading, setLoading]  = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [response, setResponse] = useState(null);
    const [modalPopped, setModalPopped] = useState(false);

    const handleSelectLanguage = (e) => {
        setLanguage(e);
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    if(!modalPopped){
        setTimeout(function(){
            setIsOpen(true);
            setModalPopped(true)
        }, 120000)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            url : e.target.url.value
        }
        setResponse(null);
        toast.info("🥺 This might take a while...");
        setLoading(true);

        axiosBase.post(`/audio?lang=${language}`, data)
            .then(response => {
                console.log(response.data);
                const {data} = response.data;
                setResponse(data);
                setLoading(false);
                toast.success("😎 Get a chilled drink and listen to your article.")
            })
            .catch(err => {
                setLoading(false);
                toast.dismiss();
                console.log(err.response.data);
                const {error} = err.response.data;
                toast.error(error);
            })
    }

    return(
        <>
        <PopUp isOpen = {isOpen} handleToggle={handleToggle}/>
        <section className={style.main}>
            <img src={Logo} alt="Logo" className={style.logo} />
            <p>LISTEN to your Favourite Blog posts and Articles online, Enhance retention and productivity.</p>
            <div className={style.container}>

                <FormSelect 
                    options = {Languages.map(lang => ({name: lang.flag+" "+lang.language, value: lang.slug}))}
                    search
                    name = "language"
                    filterOptions = {fuzzySearch}
                    placeholder = "Select your Language."
                    onChange = {handleSelectLanguage}
                />

                <form className={style["form--listen"]} onSubmit = {handleSubmit}>
                    <input type="text" name="url" placeholder="Paste link to Article" required />
                    <button type="submit">Listen <i className="bx bx-headphone"></i></button>
                </form>

                {
                    loading ? 
                    <Loader 
                        type="Audio"
                        color="#C774E4"
                        height="60"
                        width="200"
                    /> : ""
                }

                {
                    response ?
                    <>
                    <div className={style.player}>
                        <div>
                            <AudioPlayer src = {response.audioFileUrl}/>
                        </div>
                    </div> 

                    
                    <span className={style["text--link"]} >
                        <a href={response.audioFileUrl}><i className="bx bxs-cloud-download"> Download MP3</i></a>
                    </span>
                    </>
                    : 
                    ""
                }
            </div>
        </section>

        <div className={style["credits"]}>
            <p>Built with💗 by <a style= {{color:"#000"}} target="blank" href="https://simiokunowo.netlify.app">Similoluwa Okunowo</a></p>
        </div>
        </>
    )
}

const PopUp = ({isOpen, handleToggle}) => {
    return(
        <Modal
            isOpen= {isOpen}
            toggleModal={handleToggle}
          >
            <span style={{fontSize: "30px"}}>🥺</span>
            <h3>Was Mediumreader useful ?</h3>
            <div className={style["share__container"]}>
                <a href="https://twitter.com/intent/tweet?text=🎧%20LISTEN%20to%20your%20favourite%20blogposts%20https://mediumreader.herokuapp.com" target="blank">
                    <Button className="twitter">Share on Twitter <i className="bx bxl-twitter"></i></Button>
                </a>
                <a href="https://github.com/rexsimiloluwah/mediumreaderv2" target="blank">
                    <Button className="github">Star on Github <i className="bx bxl-github"></i></Button>
                </a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScsFEyONgsCKnOo8Oyr5AJpyExdTgqGrrrVejR1QuywHUvJbA/viewform?usp=sf_link" target="blank">
                    <Button className="feedback">Submit Feedback <i className="bx bx-mail-send"></i></Button>
                </a>
            </div>
      </Modal>
    )
}