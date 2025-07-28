import {Plus, X} from 'lucide-react'
import React, {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    CreateApplicationApi,
    downloadApplicationPdf, downloadApplicationResponsePdf,
    GetApplications,
    GetUserApplications, GetUserSocialApplicationsApi,
    UserMe
} from "../../Api/UserApi.jsx";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {FaDownload} from "react-icons/fa";
import {FaRegEdit} from "react-icons/fa";

function ListSocialApplications() {
    const [values, setValues] = useState()
    const navigate = useNavigate();

    const {data: applications} = useQuery({
        queryKey: ['social-application'],
        queryFn: GetUserSocialApplicationsApi,
    })
    const {isError, isSuccess, isLoading, data: student, error, refetch} = useQuery({
        queryKey: ['userMe'],
        queryFn: UserMe,
    })

    const fileFields = [
        {label: "1. Kitobxonlik madaniyati", max_score: "20", your_score: "reading_culture"},
        {label: "2. “5 muhim tashabbus”dagi ishtirok", max_score: "20", your_score: "five_initiatives"},
        {label: "3. Talabaning akademik o‘zlashtirishi", max_score: "10", your_score: "academic_performance "},
        {label: "4. Ichki tartib va odob-axloqga rioya etish", max_score: "5", your_score: "discipline_compliance"},
        {label: "5. Olimpiada va sport yutuqlari", max_score: "10", your_score: "competition_achievements"},
        {label: "6. Davomat va darslarga qatnashish", max_score: "5", your_score: "attendance_punctuality"},
        {label: "7. “Ma’rifat darslari”dagi ishtirok", max_score: "10", your_score: "enlightenment_lessons"},
        {label: "8. Volontyorlik va jamoat ishlari", max_score: "5", your_score: "volunteering"},
        {label: "9. Teatr, muzey va tarixiy joylarga tashrif", max_score: "5", your_score: "cultural_visits"},
        {label: "10. Sport va sog‘lom turmush", max_score: "5", your_score: "healthy_lifestyle"},
        {label: "11. Ma’naviy-ma’rifiy faoliyat", max_score: "5", your_score: "other_spiritual_activity"},
    ];

    return (
        <div className="relative">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Arizalar</h2>
                    <Link to={'/create-social-application'}>
                        <button
                            className="btn-primary flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"

                        >
                            <Plus className="h-5 w-5"/>
                            <span>Yangi ariza</span>
                        </button>
                    </Link>
                </div>

                {(!applications || applications.length === 0) ? (
                    <div className="w-full bg-white rounded-lg shadow p-6 text-center">
                        <h2 className="text-xl text-red-500 font-semibold">Hozir ariza mavjud emas</h2>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-x-auto">
                        <div className="p-4 overflow-auto">
                            {applications?.map((application, index) => (
                                <table key={index} className="w-full  mb-6 border border-gray-300 rounded">
                                    <tbody>
                                    <tr className="bg-gray-50 border-b">
                                        <th className="text-left p-3 text-gray-600"> Ariza id</th>
                                        <td className="p-3">{application.id}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">1. Kitobxonlik madaniyati <span
                                            className="text-red-600">(0-20)</span></th>
                                        <td className="p-3">{application.reading_culture}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">2. “5 muhim tashabbus”dagi
                                            ishtirok <span className="text-red-600">(0-20)</span></th>
                                        <td className="p-3">{application.five_initiatives}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">3. Talabaning akademik
                                            o‘zlashtirishi<span className="text-red-600">(0-10)</span></th>
                                        <td className="p-3">0</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">4. Ichki tartib va odob-axloqga
                                            rioya
                                            etish<span className="text-red-600">(0-5)</span></th>
                                        <td className="p-3">{application.discipline_compliance}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">5. Olimpiada va sport yutuqlari<span
                                            className="text-red-600">(0-10)</span></th>
                                        <td className="p-3">{application.competition_achievements}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">6. Davomat va darslarga
                                            qatnashish<span
                                                className="text-red-600">(0-5)</span></th>
                                        <td className="p-3">{application.competition_achievements}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">7. “Ma’rifat darslari”dagi
                                            ishtirok<span
                                                className="text-red-600">(0-10)</span></th>
                                        <td className="p-3">{application.enlightenment_lessons}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">8. Volontyorlik va jamoat
                                            ishlari<span
                                                className="text-red-600">(0-5)</span></th>
                                        <td className="p-3">{application.volunteering}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">9. Teatr, muzey va tarixiy joylarga
                                            tashrif<span
                                                className="text-red-600">(0-5)</span></th>
                                        <td className="p-3">{application.cultural_visits}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">10. Sport va sog‘lom turmush <span
                                            className="text-red-600">(0-5)</span></th>
                                        <td className="p-3">{application.healthy_lifestyle}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-gray-600">11. Ma’naviy-ma’rifiy faoliyat <span
                                            className="text-red-600">(0-5)</span></th>
                                        <td className="p-3">{application.other_spiritual_activity}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <th className="text-left p-3 text-xl text-[#3697A5]">O'zgartirish</th>
                                        <td className="p-3">
                                            <Link
                                                className=" flex items-center justify-start   pr-8"
                                                to={`/update-social-application/${application?.id}`}
                                            >
                                                <button
                                                    className="flex items-center gap-2 bg-[#3697A5] text-white py-2 px-4 rounded">O'zgartirish <FaRegEdit
                                                    className="text-2xl text-white"/></button>
                                            </Link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>


                            ))}

                        </div>
                    </div>
                )
                }


            </div>
        </div>
    )
}

export default ListSocialApplications
