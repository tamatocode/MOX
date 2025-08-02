"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Phone, Mail, Send } from "lucide-react";
// import useSendEmail from "../../hooks/sendMail";
import { toast } from "react-toastify";
import _ from "lodash";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // const { sendEmail, loading, error, response } = useSendEmail();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isInputValid = () => {
      const missingValue = [];
      if(!formData.name) missingValue.push("Name");
      if(!formData.email) missingValue.push("Email");
      if(!formData.phone) missingValue.push("Phone");
      if(!formData.message) missingValue.push("Message");
      if(_.isEmpty(missingValue)) return true;
      toast.warn(`Please fill in the following fields: ${missingValue.join(", ")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    const isFormDataValid = isInputValid();
    if (!isFormDataValid) return;
    try {
      await sendEmail({
        from: 'onboarding@resend.dev',
        to: 'contact@recurx.xyz',   // Replace with your recipient email
        subject: `Contact Form Submission from ${formData.name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        `,
      });
      setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
    } catch (err) {
      console.error('Error sending email:', err);
    }
  };

  return (
    <div className="text-white relative font-manrope">
      {/* Contact Header */}
      <section className="relative z-10 pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap lg:justify-between ">
            {/* Left column - Contact info */}
            <motion.div
              className="w-full px-4 lg:w-1/2 xl:w-6/12 pt-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <motion.div
                  className="mb-9 text-base leading-relaxed text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="mb-9 text-base leading-relaxed text-gray-300">
                    Looking to get in touch? We'd love to hear from you! Whether you have questions about our services,
                    want to <span className="text-blue-600">discuss partnership opportunities</span>, or need support, our team is here to help.
                  </p>
                </motion.div>

                {/* Contact Info Items */}
                <div className="space-y-8">

                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="mr-6 flex h-14 w-14 items-center justify-center overflow-hidden rounded bg-blue-600/10 text-blue-600">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="mb-1 text-xl font-bold text-white">Email Address</h4>
                      <p className="text-base text-gray-400">{"contact@recurx.xyz"}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right column - Contact form */}
            <motion.div
              className="w-full px-4 lg:w-18/12 xl:w-6/12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-lg p-8 shadow-xl">
                <form onSubmit={handleSubmit}>
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-700 bg-gray-900 bg-opacity-50 px-4 py-3 text-base text-white outline-none focus:border-blue-600 transition"
                    />
                  </motion.div>
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-700 bg-gray-900 bg-opacity-50 px-4 py-3 text-base text-white outline-none focus:border-blue-600 transition"
                    />
                  </motion.div>
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <input
                      type="text"
                      placeholder="Your Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-700 bg-gray-900 bg-opacity-50 px-4 py-3 text-base text-white outline-none focus:border-blue-600 transition"
                    />
                  </motion.div>
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <textarea
                      rows="6"
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full resize-none rounded border border-gray-700 bg-gray-900 bg-opacity-50 px-4 py-3 text-base text-white outline-none focus:border-blue-600 transition"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <button
                      type="submit"
                      // disabled={loading}
                      className="w-full group rounded border border-blue-600 bg-blue-600 p-3 text-white transition hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {/* <span>{loading ? 'Sending...' : 'Send Message'}</span> */}
                      <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </form>
                {/* Decorative elements */}
                <motion.div
                  className="absolute -right-4 -top-4 z-[-1]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <svg
                    width={100}
                    height={100}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                      fill="#3B82F6"
                    />
                  </svg>
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 z-[-1]"
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 0.6, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <svg
                    width={100}
                    height={100}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="50"
                      fill="#3B82F6"
                      fillOpacity="0.2"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;