import { useEffect, useState } from "react";
import api from "../../services/api";
import { IFood } from "../../shared/interfaces/food.interface";
import { FormData } from "../../components/ModalAddFood";
import DashboardLayout from "../../layouts/Dashboard";

const DashboardPage = () => {
    const [foods, setFoods] = useState<IFood[]>([]);
    const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] =
        useState<boolean>(false);
    const [isEditFoodModalOpen, setIsEditFoodModalOpen] =
        useState<boolean>(false);

    useEffect(() => {
        const getFoods = async () => {
            const response = await api.get<IFood[]>("/foods");
            const responseFoods = response?.data || [];

            setFoods(responseFoods);
        };
        getFoods();
    }, []);

    const handleAddFood = async (food: FormData) => {
        const response = await api.post("/foods", {
            ...food,
            available: true,
        });

        setFoods([...foods, response.data]);
    };

    const handleUpdateFood = async (food: FormData) => {
        const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
            ...editingFood,
            ...food,
        });

        const foodsUpdated = foods.map((food) =>
            food.id !== foodUpdated.data.id ? food : foodUpdated.data
        );

        setFoods(foodsUpdated);
    };

    const handleDeleteFood = async (id: Number) => {
        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter((food) => food.id !== id);

        setFoods(foodsFiltered);
    };

    const toggleAddFoodModalOpen = () => {
        setIsAddFoodModalOpen((bool) => !bool);
    };

    const toggleEditFoodModalOpen = () => {
        setIsEditFoodModalOpen((bool) => !bool);
    };

    const handleEditFood = (food: IFood) => {
        setEditingFood(food);
        setIsEditFoodModalOpen(true);
    };

    return (
        <DashboardLayout
            addFoodModalIsOpen={isAddFoodModalOpen}
            editFoodModalIsOpen={isEditFoodModalOpen}
            editingFood={editingFood}
            foods={foods}
            onEditFood={handleEditFood}
            onAddFood={handleAddFood}
            onDeleteFood={handleDeleteFood}
            onUpdateFood={handleUpdateFood}
            toggleAddFoodModal={toggleAddFoodModalOpen}
            toggleEditFoodModal={toggleEditFoodModalOpen}
        />
    );
};

export default DashboardPage;
