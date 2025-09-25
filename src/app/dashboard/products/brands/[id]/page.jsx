'use client';
import React from "react";
import EditBrand from "./editBrand";

export default function Page({ params }) {
  // Unwrap params promise in client component
  const { id } = React.use(params);

  return <EditBrand id={id} />;
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
