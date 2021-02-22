import React, { useState } from 'react'

const UnsplachImages = ({ url, key, ImgData }) => {
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState()

    function ToggleModal(e, id) {
        e.preventDefault();
        if (ImgData.id === id) {
            setModalData(ImgData);
        }
        setModal(!modal)
    }

    return (
        <>{
            modal ? (
                <ImgModal modalData={modalData} ToggleModal={ToggleModal} />
            ) :
                (
                    <div onClick={e => ToggleModal(e, ImgData.id)} key={ImgData.id} className="container">
                        <img className="unsplash-img" src={url} alt="" />
                        <div className="details-bar">
                            <h4 className="title">{ImgData.user.name}</h4>
                        </div>
                        <div className="second-bar">
                            <div className="likes">
                                <i className="fa fa-heart fa-lg"></i>
                                <h4 className="title" >{ImgData.likes}</h4>
                                {ImgData.user.twitter_username ?
                                    (<a href={`https://www.instagram.com/${ImgData.user.twitter_username}`} onClick={e => e.stopPropagation()} target="_blank"><i className="fa fa-instagram fa-lg" ></i></a>) :
                                    null
                                }
                                {ImgData.user.instagram_username ?
                                    (<a href={`https://twitter.com/${ImgData.user.instagram_username}`} onClick={e => e.stopPropagation()} target="_blank"><i className="fa fa-twitter fa-lg"></i></a>) :
                                    null
                                }
                            </div>
                        </div >
                    </div >
                )
        }

        </>
    )
}

const ImgModal = ({ ToggleModal, modalData }) => {


    return (
        <div id="myModal" className="modal">
            <span className="close" onClick={ToggleModal}>&times;</span>
            <img className="modal-content" src={modalData.urls.regular} />
            <div id="caption">{modalData.alt_description}</div>
        </div>
    )
}

export default UnsplachImages
