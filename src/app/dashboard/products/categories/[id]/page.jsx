'use client';
import React from "react";
import EditCategory from "./editCategoy";

export default function Page({ params }) {
  const { id } = React.use(params);

  return <EditCategory id={id} />;
}
