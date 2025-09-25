"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Percent, Tag, Gift } from "lucide-react";

export default function PromotionEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    // TODO: Replace with real API call
    const fakePromotion = {
      id,
      title: "Hurry In! Offers Picked Fresh",
      description: "Fresh & Fabulous! 🍓🍇🍉🥑🍋🍊🥒🌶",
      subtitle: "",
      subDescription: "",
      type: "Products",
      image: "/sample.jpg",
      startDate: "27.08.25",
      endDate: "29.08.25",
    };
    setPromotion(fakePromotion);
  }, [id]);

  const handleCancel = () => {
    router.push("/promotion/promotionss");
  };

  const handleChange = (e) => {
    setPromotion({ ...promotion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving...", promotion);
  };

  if (!promotion) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Form aur layout code aapka dusra wala yaha as it is daal do */}
    </div>
  );
}
