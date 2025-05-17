import React from "react";
import {Camera} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {detailStudent} from "../../Api/AdminApi.jsx";
import {useParams} from "react-router-dom";


function Profile() {
    const {studentId} = useParams();
    // const userId = localStorage.getItem("userId");
    const {data} = useQuery({
        queryKey: ["student-detail" - studentId],
        queryFn: () => detailStudent(studentId),
    });
    // console.log(data)


    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Profil</h2>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-400">
                <img src={data?.image_path} alt=""/>
              </span>
                        </div>
                        <button className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow-lg">
                            <Camera className="h-4 w-4 text-gray-600"/>
                        </button>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            {/*{studentInfo.personal.fullName}*/}
                            {data?.full_name}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Fakultet</p>
                                <p className="font-medium">{data?.faculty}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Yo'nalish</p>
                                <p className="font-medium">{data?.specialty}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Guruh</p>
                                <p className="font-medium">{data?.group}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Kurs</p>
                                <p className="font-medium">
                                    {data?.level}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t">
                    <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Shaxsiy ma'lumotlar
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Tug'ilgan sana</p>
                                <p className="font-medium">{data?.birth_date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Passport</p>
                                <p className="font-medium">{data?.passport_number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Telefon</p>
                                <p className="font-medium">{data?.phone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium"></p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-500">Manzil</p>
                                <p className="font-medium">{data?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t">
                    <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            O'qish ma'lumotlari
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">O'qish turi</p>
                                <p className="font-medium">{data?.educationType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Holati</p>
                                <span
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {data?.studentStatus}
                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t">
                    <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Baholar
                        </h4>
                        <table className="w-full">
                            <thead>
                            <tr className="text-left bg-gray-50">
                                <th className="p-3 text-gray-600">N</th>
                                <th className="p-3 text-gray-600"> Fan nomi</th>
                                <th className="p-3 text-gray-600"> Baho</th>
                                <th className="p-3 text-gray-600"> Semestr</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.subjects?.map((device, index) => {
                                console.log(device)

                                if (device.subjec_code === 11) {
                                    return (
                                        <tr className="border-t">
                                            <td className="p-3 ">{index + 1}</td>
                                            <td className="p-3 ">{device?.subject}</td>
                                            <td className="p-3 ">{device?.gade}</td>
                                            <td className="p-3 ">1</td>
                                        </tr>
                                    );
                                } else if (device.subjec_code === 12) {
                                    return (
                                        <tr className="border-t">
                                            <td className="p-3 ">{index + 1}</td>
                                            <td className="p-3 ">{device?.subject}</td>
                                            <td className="p-3 ">{device?.gade}</td>
                                            <td className="p-3 ">2</td>
                                        </tr>
                                    );
                                } else if (device.subjec_code === 13) {
                                    return (
                                        <tr className="border-t">
                                            <td className="p-3 ">{index + 1}</td>
                                            <td className="p-3 ">{device?.subject}</td>
                                            <td className="p-3 ">{device?.gade}</td>
                                            <td className="p-3 ">3</td>
                                        </tr>
                                    );
                                } else if (device.subjec_code === 14) {
                                    return (
                                        <tr className="border-t">
                                            <td className="p-3 ">{index + 1}</td>
                                            <td className="p-3 ">{device?.subject}</td>
                                            <td className="p-3 ">{device?.gade}</td>
                                            <td className="p-3 ">4</td>
                                        </tr>
                                    );
                                } else if (device.subjec_code === 15) {
                                    return (
                                        <tr className="border-t">
                                            <td className="p-3 ">{index + 1}</td>
                                            <td className="p-3 ">{device?.subject}</td>
                                            <td className="p-3 ">{device?.gade}</td>
                                            <td className="p-3 ">5</td>
                                        </tr>
                                    );
                                } else if (device.subjec_code === 16) {
                                    return (
                                        <tr className="border-t">
                                            <td className="p-3 ">{index + 1}</td>
                                            <td className="p-3 ">{device?.subject}</td>
                                            <td className="p-3 ">{device?.gade}</td>
                                            <td className="p-3 ">6</td>
                                        </tr>
                                    );
                                } else if (device.subjec_code === 17) {
                                    return (
                                        <tr className="border-t">
                                            <td className="p-3 ">{index + 1}</td>
                                            <td className="p-3 ">{device?.subject}</td>
                                            <td className="p-3 ">{device?.gade}</td>
                                            <td className="p-3 ">7</td>
                                        </tr>
                                    );
                                } else if (device.subjec_code === 18) {
                                    return (
                                        <tr className="border-t">
                                            <td className="p-3 ">{index + 1}</td>
                                            <td className="p-3 ">{device?.subject}</td>
                                            <td className="p-3 ">{device?.gade}</td>
                                            <td className="p-3 ">8</td>
                                        </tr>
                                    );
                                }
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Profile;
