import { FiCheckSquare, FiX } from 'react-icons/fi';
import { Container, Form, ModalHeader } from './styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '../Modal';
import Input from '../Input';
import { useForm, SubmitHandler } from 'react-hook-form';

const addFoodFormSchema = yup.object().shape({
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

export interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: FormData) => Promise<void>;
}

export type FormData = {
  name: string;
  image: string;
  price: string;
  description: string;
};

const ModalAddFood = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}: ModalAddFoodProps) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(addFoodFormSchema),
  });

  const handleSubmitFood: SubmitHandler<FormData> = (data) => {
    handleAddFood(data);
    setIsOpen();
  };

  const handleOpenModalToggle = () => {
    setIsOpen();
    clearErrors();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onCloseModal={handleOpenModalToggle}>
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitFood)}>
          <ModalHeader>
            <h1>Novo Prato</h1>
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
          <button type='submit' data-testid='add-food-button'>
            <p className='text'>Adicionar Prato</p>
            <div className='icon'>
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalAddFood;
