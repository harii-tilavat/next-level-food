import MealsItemPage from "@/app/meals/[slug]/page";
import classes from './meal-grid.module.css';
const MealsGrid = ({ meals = [] }) => {
  return (
    <ul>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealsItemPage {...meal } />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
