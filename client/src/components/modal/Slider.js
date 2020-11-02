/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Slider = props => {
    const { image } = props;
    const [translate, setTranslate] = useState(0);
    const [style1, setStyle1] = useState({ border: 2, color: '#019E7F' });
    const [style2, setStyle2] = useState({ border: 1, color: '#e6e6e6' });
    const [style3, setStyle3] = useState({ border: 1, color: '#e6e6e6' });

    const sliderHandler = val => {
        setTranslate(val);
        switch (val) {
            case 0:
                setStyle1({ border: 2, color: '#019E7F' });
                setStyle2({ border: 1, color: '#e6e6e6' });
                setStyle3({ border: 1, color: '#e6e6e6' });
                break;
            case -320:
                setStyle1({ border: 1, color: '#e6e6e6' });
                setStyle2({ border: 2, color: '#019E7F' });
                setStyle3({ border: 1, color: '#e6e6e6' });
                break;
            case -640:
                setStyle1({ border: 1, color: '#e6e6e6' });
                setStyle2({ border: 1, color: '#e6e6e6' });
                setStyle3({ border: 2, color: '#019E7F' });
                break;
            default:
                return val;
        }
        return null;
    };

    return (
        <div className="modal-body-image">
            <div className="modal-body-image-1">
                <div
                    style={{
                        transform: `translateX(${translate}px)`,
                        transition: 'all 0.5s',
                    }}
                    className="modal-body-image-slider"
                >
                    <img
                        src={
                            process.env.PUBLIC_URL + `images/products/${image}`
                        }
                        alt="img"
                        className="modal-body-img-1"
                    />
                    <img
                        src={
                            process.env.PUBLIC_URL + `images/products/${image}`
                        }
                        alt="img"
                        className="modal-body-img-1"
                    />
                    <img
                        src={
                            process.env.PUBLIC_URL + `images/products/${image}`
                        }
                        alt="img"
                        className="modal-body-img-1"
                    />
                </div>
            </div>

            <div className="modal-body-image-2">
                <div
                    style={{
                        border: `${style1.border}px solid ${style1.color}`,
                    }}
                    onClick={() => sliderHandler(0)}
                >
                    <img
                        src={
                            process.env.PUBLIC_URL + `images/products/${image}`
                        }
                        alt="img"
                        className="modal-body-img-2"
                    />
                </div>
                <div
                    style={{
                        border: `${style2.border}px solid ${style2.color}`,
                    }}
                    onClick={() => sliderHandler(-320)}
                >
                    <img
                        src={
                            process.env.PUBLIC_URL + `images/products/${image}`
                        }
                        alt="img"
                        className="modal-body-img-2"
                    />
                </div>
                <div
                    style={{
                        border: `${style3.border}px solid ${style3.color}`,
                    }}
                    onClick={() => sliderHandler(-640)}
                >
                    <img
                        src={
                            process.env.PUBLIC_URL + `images/products/${image}`
                        }
                        alt="img"
                        className="modal-body-img-2"
                    />
                </div>
            </div>
        </div>
    );
};

Slider.propTypes = {
    image: PropTypes.string.isRequired,
};

export default Slider;
