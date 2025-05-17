import React, {useState} from "react";
import {useQuery, useMutation} from "@tanstack/react-query";
import {DeleteCategory, GetAllCategory} from "../../Api/CategoryApi.jsx";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {GetAllStudents} from "../../Api/AdminApi.jsx";

function ListCategory() {
    const [isModalOpen, setIsModalOpen] = useState(null);
    const {isError, isSuccess, isLoading, data, error, refetch} = useQuery({
        queryKey: ["list-student"], queryFn: GetAllStudents,
    });

    // const categoryMutation = useMutation({
    //     mutationKey: ["delete-category"], mutationFn: DeleteCategory, onSuccess: (data) => {
    //         toast.success(data.message || "Talaba muvaffaqiyatli o'chirildi");
    //     }, onError: (error) => {
    //         toast.error(error.message || "Xatolik yuz berdi");
    //     },
    // });

    // const handleDeleteClick = (facultyId) => {
    //     setIsModalOpen(facultyId); // Modalni ochish
    // };
    // const deleteHandler = async (categoryId) => {
    //     categoryMutation
    //         .mutateAsync(categoryId)
    //         .then(() => {
    //             refetch();
    //         })
    //         .catch((e) => console.log(e));
    // };
    // const cancelDelete = () => {
    //     setIsModalOpen(null); // Modalni bekor qilish
    // };

    return (<div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Kategoriyalar ro'yxati</h2>

        <div className="bg-white rounded-lg shadow">
            <div className="p-4">
                <table className="w-full">
                    <thead>
                    <tr className="text-left bg-gray-50">
                        <th className="p-3 text-gray-600">№</th>
                        <th className="p-3 text-gray-600"> Talaba ism familyasi</th>
                        <th className="p-3 text-gray-600">Fakultet</th>
                        <th className="p-3 text-gray-600">guruh</th>


                    </tr>
                    </thead>
                    <tbody>
                    {data?.map((student, index) => {
                        return (

                            <tr className="border-t" key={student?.id}>
                                <td className="p-3 ">{index + 1}</td>
                                <Link to={`/student-detail/${student?.id}`} className="text-blue-600">
                                    <td className="p-3 ">{student?.full_name}</td>
                                </Link>
                                <td className="p-3">{student?.faculty}</td>
                                <td className="p-3">{student?.group}</td>

                            </tr>

                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}

export default ListCategory;
