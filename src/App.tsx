// import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import { useState } from "react";

const env = import.meta.env;

function App() {
  const [formValues, setFormValues] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const updateFormValues = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    emailjs
      .sendForm(env.VITE_EMAIL_SERVICE_ID, env.VITE_EMAIL_TEMPLATE_ID, form, {
        publicKey: env.VITE_EMAIL_API_KEY,
      })
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
        },
        (error) => {
          console.log("Error sending email:", error.text);
        }
      );
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={sendEmail}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={formValues.email}
            onChange={updateFormValues}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Sujet</label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formValues.subject}
            onChange={updateFormValues}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows={10}
            cols={50}
            required
            value={formValues.message}
            onChange={updateFormValues}
          ></textarea>
        </div>
        <button className="form-submit-btn" type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default App;
