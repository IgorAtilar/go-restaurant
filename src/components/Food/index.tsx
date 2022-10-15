import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Container } from './styles';
import { IFood } from '../../shared/interfaces/food.interface';
import api from '../../services/api';

export interface FoodProps {
  food: IFood;
  handleDelete: (id: Number) => Promise<void>;
  handleEditFood: (data: IFood) => void;
}

const Food = ({ food, handleDelete, handleEditFood }: FoodProps) => {
  const { available } = food;

  const [isAvailable, setIsAvailable] = useState(available);

  const toggleAvailable = async () => {
    console.log('toggleAvailable');
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  };

  const setEditingFood = () => {
    handleEditFood(food);
  };

  return (
    <Container data-available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className='body'>
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className='price'>
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className='footer'>
        <div className='icon-container'>
          <button
            type='button'
            className='icon'
            onClick={setEditingFood}
            title='editar'
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type='button'
            className='icon'
            onClick={() => handleDelete(food.id)}
            title='excluir'
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className='availability-container'>
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className='switch'>
            <input
              id={`available-switch-${food.id}`}
              type='checkbox'
              checked={isAvailable}
              onChange={toggleAvailable}
            />
            <span className='slider' />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
