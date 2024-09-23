"use client";
import Layout from "@/components/layout/article";
import { Widget } from "@typeform/embed-react";
import React from "react";

export default function ContactPage() {
  return (
    <Layout title="Contact">
      <div className="container max-w-[60ch] mx-auto px-4">
        <h3 className="underline text-[20px] underline-offset-4 decoration-[#525252] mt-[3px] mb-[4px] text-3xl font-bold">
          Contact Me
        </h3>
        <p>
          Please contact me directly at{" "}
          <a className="underline" href="mailto:priyanshuverma@outlook.in">
            priyanshu29@duck.com
          </a>{" "}
          or through this form.
        </p>
        <Widget id="cmOmloEL" className="h-[500px] mt-4" hideHeaders />
      </div>
    </Layout>
  );
}
