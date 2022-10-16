import Header from "../../components/Header";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { Container, FoodsContainer } from "./styles";
import { IFood } from "../../shared/interfaces/food.interface";
import { FormData } from "../../components/ModalAddFood";

export interface DashboardProps {
    foods: IFood[];
    editingFood: IFood;
    onEditFood: (food: IFood) => void;
    onAddFood: (food: FormData) => Promise<void>;
    onUpdateFood: (food: FormData) => Promise<void>;
    onDeleteFood: (id: number) => Promise<void>;
    addFoodModalIsOpen: boolean;
    editFoodModalIsOpen: boolean;
    toggleAddFoodModal: () => void;
    toggleEditFoodModal: () => void;
}

const DashboardLayout = ({
    addFoodModalIsOpen,
    editFoodModalIsOpen,
    editingFood,
    foods,
    onAddFood,
    onDeleteFood,
    onUpdateFood,
    onEditFood,
    toggleAddFoodModal,
    toggleEditFoodModal,
}: DashboardProps) => {
    const isModalsOpen = addFoodModalIsOpen || editFoodModalIsOpen;

    return (
        <Container
            style={
                isModalsOpen
                    ? {
                          position: "fixed",
                          overflow: "hidden",
                      }
                    : {}
            }
        >
            <Header openModal={toggleAddFoodModal} />
            <ModalAddFood
                isOpen={addFoodModalIsOpen}
                setIsOpen={toggleAddFoodModal}
                handleAddFood={onAddFood}
            />
            <ModalEditFood
                isOpen={editFoodModalIsOpen}
                setIsOpen={toggleEditFoodModal}
                editingFood={editingFood}
                handleUpdateFood={onUpdateFood}
            />

            <FoodsContainer data-testid="foods-list">
                {foods &&
                    foods.map((food) => (
                        <Food
                            key={food.id}
                            food={food}
                            handleDelete={onDeleteFood}
                            handleEditFood={onEditFood}
                        />
                    ))}
            </FoodsContainer>
        </Container>
    );
};

export default DashboardLayout;
