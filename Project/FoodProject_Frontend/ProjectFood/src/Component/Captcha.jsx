import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import "./Captcha.css";

// Characters used to generate the captcha (confusing chars like 0/O, 1/I removed)
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCaptchaText(length = 6) {
    let text = "";
    for (let i = 0; i < length; i++) {
        text += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return text;
}

/**
 * Fully client-side captcha widget (no external library / API needed).
 * Parent components should call `ref.current.validate()` before submitting
 * a form to check whether the user typed the code shown in the image.
 * Call `ref.current.refresh()` to regenerate the code (e.g. after a failed submit).
 */
const Captcha = forwardRef(function Captcha({ onChange }, ref) {

    const canvasRef = useRef(null);
    const [captchaText, setCaptchaText] = useState("");
    const [userInput, setUserInput] = useState("");

    const drawCaptcha = (text) => {

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // background
        ctx.fillStyle = "#f3f6f9";
        ctx.fillRect(0, 0, width, height);

        // noise lines
        for (let i = 0; i < 6; i++) {
            ctx.strokeStyle = `rgba(${Math.random() * 150},${Math.random() * 150},${Math.random() * 150},0.5)`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * width, Math.random() * height);
            ctx.lineTo(Math.random() * width, Math.random() * height);
            ctx.lineWidth = 1 + Math.random();
            ctx.stroke();
        }

        // noise dots
        for (let i = 0; i < 35; i++) {
            ctx.fillStyle = `rgba(${Math.random() * 180},${Math.random() * 180},${Math.random() * 180},0.6)`;
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, 1.2, 0, Math.PI * 2);
            ctx.fill();
        }

        // captcha characters (slightly rotated, jittered)
        const spacing = width / (text.length + 1);

        for (let i = 0; i < text.length; i++) {

            const x = spacing * (i + 1);
            const y = height / 2 + (Math.random() * 10 - 5);
            const angle = ((Math.random() * 40) - 20) * Math.PI / 180;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.font = `bold ${22 + Math.random() * 6}px Arial`;
            ctx.fillStyle = `rgb(${30 + Math.random() * 60},${30 + Math.random() * 60},${90 + Math.random() * 80})`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }
    };

    const refreshCaptcha = () => {
        const text = generateCaptchaText();
        setCaptchaText(text);
        setUserInput("");
        if (onChange) onChange("");
        drawCaptcha(text);
    };

    useEffect(() => {
        refreshCaptcha();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
        validate: () => userInput.trim().toUpperCase() === captchaText.toUpperCase(),
        refresh: refreshCaptcha
    }));

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <div className="captcha-wrapper">

            <div className="captcha-box">

                <canvas
                    ref={canvasRef}
                    width="160"
                    height="50"
                    className="captcha-canvas"
                ></canvas>

                <button
                    type="button"
                    className="captcha-refresh-btn"
                    onClick={refreshCaptcha}
                    title="Get a new code"
                >
                    ⟳
                </button>

            </div>

            <input
                type="text"
                className="captcha-input"
                placeholder="Enter the code shown above"
                value={userInput}
                onChange={handleInputChange}
                autoComplete="off"
                required
            />

        </div>
    );
});

export default Captcha;
