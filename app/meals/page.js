import Link from "next/link";
import React from "react";

const MealsPage = () => {
  return (
    <main>
      <h1>MealsPage works!</h1>
      <p>
        <Link href={"/meals/1"}>Meal 1</Link>
      </p>
      <p>
        <Link href={"/meals/2"}>Meal 2</Link>
      </p>
      <p>
        <Link href={"/meals/3"}>Meal 3</Link>
      </p>
    </main>
  );
};

export default MealsPage;
