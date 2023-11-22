import { contest } from '@/src/mocks/contestants';
import { CategoryAdmin } from '../CategoryAdmin';

export const ContestAdmin: React.FC = () => {
  const categoriesList = contest.map((cat) => {
    return <CategoryAdmin key={cat.id} currentCategory={cat.title} contestants={cat.contestants} />;
  });

  return <>{categoriesList}</>;
};
