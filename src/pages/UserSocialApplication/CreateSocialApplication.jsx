import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

// import {CreateFacultyApi} from "../../Api/FacultyApi.jsx";
import {ImFolderUpload} from "react-icons/im";
import {CreateSocialApi, GetUserApplications} from "../../Api/UserApi.jsx";


function CreateSocialApplication() {
    const navigate = useNavigate();
    const [files, setFiles] = useState({}); // file index => filename

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            setFiles((prev) => ({...prev, [index]: file.name}));
        }
    };
    const fileFields = [
        {label: "1. Kitobxonlik madaniyati", score: "0–20", name: "reading_culture"},
        {label: "2. “5 muhim tashabbus”dagi ishtirok", score: "0–20", name: "five_initiatives"},
        // { label: "3. Talabaning akademik o‘zlashtirishi", score: "0–10", name: "academic_performance " },
        {label: "4. Ichki tartib va odob-axloqga rioya etish", score: "0–5", name: "discipline_compliance"},
        {label: "5. Olimpiada va sport yutuqlari", score: "0–10", name: "competition_achievements"},
        {label: "6. Davomat va darslarga qatnashish", score: "0–5", name: "attendance_punctuality"},
        {label: "7. “Ma’rifat darslari”dagi ishtirok", score: "0–10", name: "enlightenment_lessons"},
        {label: "8. Volontyorlik va jamoat ishlari", score: "0–5", name: "volunteering"},
        {label: "9. Teatr, muzey va tarixiy joylarga tashrif", score: "0–5", name: "cultural_visits"},
        {label: "10. Sport va sog‘lom turmush", score: "0–5", name: "healthy_lifestyle"},
        {label: "11. Ma’naviy-ma’rifiy faoliyat", score: "0–5", name: "other_spiritual_activity"},
    ];
    const {data: gpa} = useQuery({
        queryKey: ['gpa'],
        queryFn: GetUserApplications,
    })
    const socialMutation = useMutation({
        mutationKey: ["create-social-application"],
        mutationFn: CreateSocialApi,
        onSuccess: (data) => {
            toast.success(data.message || "Ariza muvaffaqiyatli yaratildi");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });
    // console.log(Array.isArray(gpa) ? gpa.map(i => i.gpa * 2).join(", ") : "");
    const formik = useFormik({
        initialValues: {
            academic_performance: Array.isArray(gpa) ? gpa.map(i => i.gpa * 2).join(", ") : "",
            reading_culture: "",
            five_initiatives: "",
            discipline_compliance: "",
            competition_achievements: "",
            attendance_punctuality: "",
            enlightenment_lessons: "",
            volunteering: "",
            cultural_visits: "",
            healthy_lifestyle: "",
            other_spiritual_activity: "",
        },
        // validationSchema: Yup.object({
        //     name_uz: Yup.string().required("!!! To'ldirish shart"),
        //     name_ru: Yup.string().required("!!! To'ldirish shart"),
        //     name_en: Yup.string().required("!!! To'ldirish shart"),
        //     // faculty_icon: Yup.string().required("!!! To'ldirish shart"),
        // }),
        onSubmit: (values) => {
            console.log(values);
            const socialData = {
                academic_performance: Array.isArray(gpa) ? gpa.map(i => i.gpa * 2).join(", ") : "",
                reading_culture: values.reading_culture || null,
                five_initiatives: values.five_initiatives || null,
                discipline_compliance: values.discipline_compliance || null,
                competition_achievements: values.competition_achievements || null,
                attendance_punctuality: values.attendance_punctuality || null,
                enlightenment_lessons: values.enlightenment_lessons || null,
                volunteering: values.volunteering || null,
                cultural_visits: values.cultural_visits || null,
                healthy_lifestyle: values.healthy_lifestyle || null,
                other_spiritual_activity: values.other_spiritual_activity || null,
            };


            socialMutation.mutate(socialData);
        },
    });
    const isSuccess = socialMutation.isSuccess;
    useEffect(() => {
        if (isSuccess) {
            navigate("/list-social-application");
        }
    }, [navigate, isSuccess]);

    if (!gpa || gpa.length === 0) {
        return (
            <div className="w-full bg-white rounded-lg shadow p-6 text-center">
                <h2 className="text-xl text-red-500 font-semibold">Hozir ariza mavjud emas</h2>
            </div>
        );
    }
    return (
        <div className="w-full bg-white rounded-lg shadow p-6">
            <div className="flex flex-col   mb-5">
                <h2 className="text-2xl font-bold text-gray-800 ">Ariza yuborish</h2>
                <h1 className="my-3 text-green-500 text-lg">Ijtimoiy faollik ko‘rsatkichi baliga ega bo‘lish uchun
                    asoslovchi hujjatlarni yuklash (ixtiyoriy)</h1>

                <p className="text-gray-500">Har bir ijtimoiy faollik ko‘rsatkichi uchun bitta fayl yuklashingiz mumkin,
                    shu sababli fayllar soni ko'p bo'lsa, zip fayl shaklida yuklang.
                     </p>
            </div>


            <form
                onSubmit={formik.handleSubmit}
                className="grid grid-cols-1 gap-5"
            >
                <div>
                    <label>3. Talabaning akademik o‘zlashtirishi <span
                        className="text-red-600">(0-10 ball)</span></label>
                    <input type="text"
                           name="academic_performance"
                           {...formik.getFieldProps("academic_performance")}
                           disabled
                           value={Array.isArray(gpa) ? gpa.map(i => i.gpa).join(", ") : ""}
                        // value="5"
                           className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    />
                </div>
                {fileFields.map((item, idx) => (
                    <div className="w-full" key={idx}>
                        <p className="mb-2 text-md text-black font-semibold">
                            {/*{item.label} <span className="text-red-600">({item.score} ball)</span>*/}
                            {item.label} <span className="text-red-600">({item.score})</span>
                        </p>

                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor={`file_input_${idx}`}
                                // htmlFor={`file_input`}
                                className="flex flex-col items-center justify-center w-full h-14 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                    <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                                </div>
                                <input
                                    id={`file_input_${idx}`}
                                    // id={`file_input`}
                                    type="file"
                                    name={item.name}
                                    disabled
                                    // name="reading_culture"
                                    onChange={(event) => {
                                        formik.setFieldValue(`${item.name}`, event.currentTarget.files[0]);
                                        handleFileChange(event, idx);
                                    }}
                                    // onChange={(e) => handleFileChange(e, idx)}
                                    className="hidden"

                                />
                            </label>
                        </div>

                        {files[idx] && (
                            <div
                                className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                                Yuklangan fayl: <span className="font-medium text-blue-600">{files[idx]}</span>
                            </div>
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    className="focus:outline-none w-full text-white bg-[#3697A5] hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Qo‘shish
                </button>
            </form>

        </div>
    );
}

export default CreateSocialApplication;
