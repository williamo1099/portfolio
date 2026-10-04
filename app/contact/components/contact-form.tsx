"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

import ContactFormField from "./contact-form-field";
import ContactFormSubmitButton from "./contact-form-submit-button";
import ContactFormMessage from "./contact-form-message";

import { sendMail } from "@/services/mail-service";

export default function ContactForm() {
  // Form data.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Sending states.
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  // Sending to EmailJS.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set sending status.
    setIsSending(true);
    setSuccess(false);
    setFailed(false);

    try {
      const sent = await sendMail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (!sent) throw new Error("Message was not sent.");

      setSuccess(true);
    } catch (error) {
      setFailed(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-5/6 lg:w-1/2">
      {/* Name */}
      <ContactFormField
        labelName="Name"
        inputName="name"
        inputType="text"
        placeholder="What should I call you?"
        value={formData.name}
        handleChange={handleChange}
        index={0}
      />

      {/* E-mail */}
      <ContactFormField
        labelName="E-mail"
        inputName="email"
        inputType="email"
        placeholder="Where can I reach you?"
        value={formData.email}
        handleChange={handleChange}
        index={1}
      />

      {/* Message */}
      <ContactFormField
        labelName="Message"
        inputName="message"
        fieldType="textarea"
        placeholder="How can I help you?"
        value={formData.message}
        handleChange={handleChange}
        index={2}
      />

      {/* Submission button */}
      <ContactFormSubmitButton isSending={isSending} />

      {/* Message */}
      <ContactFormMessage success={success} failed={failed} />
    </form>
  );
}
