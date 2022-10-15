import { useEffect } from 'react';
import { FiCheckSquare, FiX } from 'react-icons/fi';
import { Container, Form, ModalHeader } from './styles';
import { IFood } from '../../shared/interfaces/food.interface';
import { FormData } from '../ModalAddFood';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from '../Modal';
import Input from '../Input';

const editFoodFormSchema = yup.object().shape({
  name: yup.string().required('Insira o nome do prato'),
  image: yup
    .string()
    .url('Informe uma url válida para a imagem do prato')
    .required('Insira uma imagem do prato'),
  price: yup
    .number()
    .required('Informe o preço do prato')
    .min(1, 'Informe o preço do prato'),
  description: yup.string().required('Informe a descrição do prato'),
});

export interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: IFood;
  handleUpdateFood: (data: FormData) => Promise<void>;
}

const ModalEditFood = ({
  editingFood,
  handleUpdateFood,
  isOpen,
  setIsOpen,
}: ModalEditFoodProps) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editFoodFormSchema),
  });

  const handleSubmitFood: SubmitHandler<FormData> = (data) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  const handleOpenModalToggle = () => {
    setIsOpen();
    clearErrors();
    reset();
  };

  useEffect(() => {
    reset({ ...editingFood });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onCloseModal={handleOpenModalToggle}>
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitFood)}>
          <ModalHeader>
            <h1>Editar Prato</h1>
            <FiX
              role='button'
              size={28}
              onClick={handleOpenModalToggle}
              title='fechar'
            />
          </ModalHeader>
          <Input
            label='Imagem do prato *'
            placeholder='Cole o link aqui'
            error={errors.image?.message}
            {...register('image')}
          />
          <Input
            label='Nome do prato *'
            placeholder='Ex: Moda Italiana'
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label='Preço do prato *'
            placeholder='Ex: 19.90'
            type='number'
            step='any'
            defaultValue={0}
            error={errors.price?.message}
            {...register('price')}
          />

          <Input
            label='Descrição do prato *'
            placeholder='Descrição'
            error={errors.description?.message}
            {...register('description')}
          />
          <button type='submit' data-testid='edit-food-button'>
            <div className='text'>Editar Prato</div>
            <div className='icon'>
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalEditFood;
