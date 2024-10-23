"use client";
const MealsError = (props) => {
  console.log("PROPS : ", props);
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to create meal. Check your inputs and try again.</p>
    </main>
  );
};

export default MealsError;
