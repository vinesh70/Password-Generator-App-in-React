import { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from "validator";

export default function PasswordGenerator() {
    const rLength = useRef();

    const [length, setLength] = useState("");
    const [uppercase, setUppercase] = useState(false);
    const [digits, setDigits] = useState(false);
    const [special, setSpecial] = useState(false);
    const [password, setPassword] = useState("");

    const hLength = (event) => { setLength(event.target.value); };
    const hUppercase = (event) => { setUppercase(event.target.checked); };
    const hDigits = (event) => { setDigits(event.target.checked); };
    const hSpecial = (event) => { setSpecial(event.target.checked); };

    const show = (event) => {
        event.preventDefault();
        if (length === "") {
            toast.warning("You did not enter the length of the password");
            rLength.current.focus();
            return;
        }

        const btnName = event.nativeEvent.submitter.name;

        if (btnName === "sub") {
            let text = "abcdefghijklmnopqrstuvwxyz";

            if (uppercase) {
                text += text.toUpperCase();
            }
            if (digits) {
                text += "0123456789";
            }
            if (special) {
                text += "!@#$%^&*()";
            }

            let pw = "";
            let len = parseInt(length);

            for (let i = 1; i <= len; i++) {
                let r = Math.floor(Math.random() * text.length);
                pw += text[r];
            }
            setPassword(pw);
        } else if (btnName === "ctc") {
            if (password !== "") {
                navigator.clipboard.writeText(password);
                toast.success("Copied to clipboard", {
                    autoClose: 1000,
                    position: "top-center"
                });
            }
        } else if (btnName === "ps") {
            const sp = { minLength: 8, minLowerCase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
            if (validator.isStrongPassword(password, sp))
                toast.success("Password generated is Strong");
            else
                toast.warning("Password generated is Weak");
        }
    };

    return (
        <>
            <center>
                <h1>Password Generator App</h1>
                <form onSubmit={show}>
                    <label>Enter Password Length:</label> &nbsp;
                    <input type="number" min={8} max={20} value={length} ref={rLength} onChange={hLength} /> <br /> <br />

                    <input type="checkbox" onChange={hUppercase} /> Uppercase &nbsp;
                    <input type="checkbox" onChange={hDigits} /> Digits &nbsp;
                    <input type="checkbox" onChange={hSpecial} /> Special Characters &nbsp;
                    <br /> <br />

                    <input type="submit" name="sub" value="Generate Password" className="btn" /> &nbsp; <br /> <br />
                    <input type="submit" value="Copy to clipboard" name="ctc" className="btn" /> &nbsp; <br /> <br />
                    <input type="submit" value="Check Password Strength" name="ps" className="btn" /> 
                </form>
                <h2>{password}</h2>
            </center>
            <ToastContainer />
        </>
    );
}
