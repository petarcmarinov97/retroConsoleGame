const arrowButtonStyle = {
    "border": "1px solid #000",
    "borderColor": "transparent",
    "boxShadow": "0px 0px 2px 1px rgb(255 255 255 / 60%) inset",
    "visibility": "unset",
}

const dropButtonStyle = {
    "border": "1px solid #000",
    "borderColor": "transparent",
    "boxShadow": "0px 0px 2px 1px rgb(255 255 255 / 60%) inset",
    "visibility": "unset",
    "height": "80px",
    "width": "80px"
}

const pauseButtonStyle = {
    "border": "0.5px solid black",
    "background": "rgb(29 201 22)",
    "boxShadow": "rgb(174 221 29) 0px 0px 2px 2px inset",
    "visibility": "unset"
}

const soundButtonStyle = {
    "border": "0.5px solid black",
    "boxShadow": "rgb(148 237 4) 0px 0px 2px 2px inset",
    "background": "#98c317",
    "visibility": "unset",
}

const resetButtonStyle = {
    "border": "0.5px solid black",
    "boxShadow": "rgb(253 52 52) 0px 0px 2px 2px inset",
    "background": "#d70003",
    "visibility": "unset",
}

const arrowButtonSize = "large";

const optionalButtonSize = "small";

const buttonShape = "circle";

const pauseButtonText = "Pause(P)";
const soundButtonText = "Sound(S)";
const resetButtonText = "Reset(R)";
const dropButtonText = "Drop(SPACE)";

export const arrowButtonCfg = [
    {
        "--i": 0,
        style: arrowButtonStyle,
        size: arrowButtonSize,
        shape: buttonShape,
        btnkey: 37
    },
    {
        "--i": 1,
        style: arrowButtonStyle,
        size: arrowButtonSize,
        shape: buttonShape,
        label: true,
        btnkey: 38
    },
    {
        "--i": 2,
        style: arrowButtonStyle,
        size: arrowButtonSize,
        shape: buttonShape,
        btnkey: 39
    },
    {
        "--i": 3,
        style: arrowButtonStyle,
        size: arrowButtonSize,
        shape: buttonShape,
        btnkey: 40
    }
]

export const functionalButtonCfg = [
    {
        style: pauseButtonStyle,
        size: optionalButtonSize,
        shape: buttonShape,
        text: pauseButtonText,
        btnkey: "80"
    },
    {
        style: soundButtonStyle,
        size: optionalButtonSize,
        shape: buttonShape,
        text: soundButtonText,
        btnkey: "83"
    },
    {
        style: resetButtonStyle,
        size: optionalButtonSize,
        shape: buttonShape,
        text: resetButtonText,
        btnkey: "82"
    },
    {
        style: dropButtonStyle,
        shape: buttonShape,
        text: dropButtonText,
        btnkey: "32"
    }
]