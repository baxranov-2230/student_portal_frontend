import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";

const SITE_URL = import.meta.env.VITE_API_URL

// import {CreateFacultyApi} from "../../Api/FacultyApi.jsx";
import {ImFolderUpload} from "react-icons/im";
import {
    CreateSocialApi,
    detailSocialApplicationApi,
    GetUserApplications,
    GetUserSocialApplicationsApi, UpdateSocialApplicationApi
} from "../../Api/UserApi.jsx";


function UpdateSocialApplication() {
    const navigate = useNavigate();
    const {socialApplicationId} = useParams();
    const [files, setFiles] = useState({}); // file index => filename

    const [redingCultureFile, setRedingCultureFile] = useState(null);
    const [selectedRedingCulture, setSelectedRedingCulture] = useState(null);

    const [fiveInitiativesFile, setFiveInitiativesFile] = useState(null);
    const [selectedFiveInitiatives, setSelectedFiveInitiatives] = useState(null);

    const [disciplineComplianceFile, setDisciplineComplianceFile] = useState(null);
    const [selectedDisciplineCompliance, setSelectedDisciplineCompliance] = useState(null);

    const [competitionAchievementsFile, setCompetitionAchievementsFile] = useState(null);
    const [selectedCompetitionAchievements, setSelectedCompetitionAchievements] = useState(null);

    const [attendancePunctualityFile, setAttendancePunctualityFile] = useState(null);
    const [selectedAttendancePunctuality, setSelectedAttendancePunctuality] = useState(null);

    const [enlightenmentLessonsFile, setEnlightenmentLessonsFile] = useState(null);
    const [selectedEnlightenmentLessons, setSelectedEnlightenmentLessons] = useState(null);

    const [volunteeringFile, setVolunteeringFile] = useState(null);
    const [selectedVolunteering, setSelectedVolunteering] = useState(null);

    const [culturalVisitsFile, setCulturalVisitsFile] = useState(null);
    const [selectedCulturalVisits, setSelectedCulturalVisits] = useState(null);

    const [healthyLifestyleFile, setHealthyLifestyleFile] = useState(null);
    const [selectedHealthyLifestyle, setSelectedHealthyLifestyle] = useState(null);

    const [otherSpiritualActivityFile, setOtherSpiritualActivityFile] = useState(null);
    const [selectedOtherSpiritualActivity, setSelectedOtherSpiritualActivity] = useState(null);

    const {data: applications} = useQuery({
        queryKey: ['social-application'],
        queryFn: GetUserSocialApplicationsApi,
    })

    const fileFields = [
        {label: "1. Kitobxonlik madaniyati", score: "0–20", name: "reading_culture_path"},
        {label: "2. “5 muhim tashabbus”dagi ishtirok", score: "0–20", name: "five_initiatives_path"},
        {label: "4. Ichki tartib va odob-axloqga rioya etish", score: "0–5", name: "discipline_compliance_path"},
        {label: "5. Olimpiada va sport yutuqlari", score: "0–10", name: "competition_achievements_path"},
        {label: "6. Davomat va darslarga qatnashish", score: "0–5", name: "attendance_punctuality_path"},
        {label: "7. “Ma’rifat darslari”dagi ishtirok", score: "0–10", name: "enlightenment_lessons_path"},
        {label: "8. Volontyorlik va jamoat ishlari", score: "0–5", name: "volunteering_path"},
        {label: "9. Teatr, muzey va tarixiy joylarga tashrif", score: "0–5", name: "cultural_visits_path"},
        {label: "10. Sport va sog‘lom turmush", score: "0–5", name: "healthy_lifestyle_path"},
        {label: "11. Ma’naviy-ma’rifiy faoliyat", score: "0–5", name: "other_spiritual_activity_path"},
    ];

    const {data} = useQuery({
        queryKey: ["social-application-detail"],
        queryFn: () => detailSocialApplicationApi(socialApplicationId),
    });
    const socialMutation = useMutation({
        mutationKey: ["update-social-application"],
        mutationFn: socialData => UpdateSocialApplicationApi(socialApplicationId, socialData),
        onSuccess: (data) => {
            toast.success(data.message || "Ariza muvaffaqiyatli o'zgartirildi");
        },
        onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });
    // console.log(Array.isArray(gpa) ? gpa.map(i => i.gpa * 2).join(", ") : "");
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            reading_culture: null,
            five_initiatives: null,
            discipline_compliance: null,
            competition_achievements: null,
            attendance_punctuality: null,
            enlightenment_lessons: null,
            volunteering: null,
            cultural_visits: null,
            healthy_lifestyle: null,
            other_spiritual_activity: null,
        },
        onSubmit: (values) => {
            const socialData = {
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

    useEffect(() => {
        if (data?.reading_culture_path) {
            const fileName = data.reading_culture_path.split("/").pop();
            setRedingCultureFile(fileName);
        }
        if (data?.five_initiatives_path) {
            const fileName = data.five_initiatives_path.split("/").pop();
            setFiveInitiativesFile(fileName);
        }
        if (data?.discipline_compliance_path) {
            const fileName = data.discipline_compliance_path.split("/").pop();
            setDisciplineComplianceFile(fileName);
        }
        if (data?.competition_achievements_path) {
            const fileName = data.competition_achievements_path.split("/").pop();
            setCompetitionAchievementsFile(fileName);
        }
        if (data?.attendance_punctuality_path) {
            const fileName = data.attendance_punctuality_path.split("/").pop();
            setAttendancePunctualityFile(fileName);
        }
        if (data?.enlightenment_lessons_path) {
            const fileName = data.enlightenment_lessons_path.split("/").pop();
            setEnlightenmentLessonsFile(fileName);
        }
        if (data?.volunteering_path) {
            const fileName = data.volunteering_path.split("/").pop();
            setVolunteeringFile(fileName);
        }
        if (data?.cultural_visits_path) {
            const fileName = data.cultural_visits_path.split("/").pop();
            setCulturalVisitsFile(fileName);
        }
        if (data?.healthy_lifestyle_path) {
            const fileName = data.healthy_lifestyle_path.split("/").pop();
            setHealthyLifestyleFile(fileName);
        }
        if (data?.other_spiritual_activity_path) {
            const fileName = data.other_spiritual_activity_path.split("/").pop();
            setOtherSpiritualActivityFile(fileName);
        }

    }, [data]);

    const isSuccess = socialMutation.isSuccess;
    useEffect(() => {
        if (isSuccess) {
            navigate("/list-social-application");
        }
    }, [navigate, isSuccess]);


    return (
        <div className="w-full bg-white rounded-lg shadow p-6">
            <div className="flex flex-col   mb-5">
                <h2 className="text-2xl font-bold text-gray-800">Ariza o'zgartirish</h2>
                <p className="text-gray-600">Ijtimoiy faollik ko‘rsatkichi uchun fayl yuklangan bo‘lsa, pastda yashil
                    blokda aks etadi. Agar fayl yuklanmagan bo‘lsa, bu yer bo‘sh bo‘ladi. Fayllarni 20-iyul sanasiga qadar o'zgartirishingiz mumkin.
                    <span className="text-red-600">Fayl hajmi 10 MB dan oshmasligi kerak </span>
                </p>
            </div>
            <form
                onSubmit={formik.handleSubmit}
                className="grid grid-cols-1 gap-5"
            >

                {/*Reading Culture*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">
                        {/*{item.label} <span className="text-red-600">({item.score} ball)</span>*/}
                        1. Kitobxonlik madaniyati <span className="text-red-600">(0-20 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            // htmlFor={`file_input_${idx}`}
                            htmlFor="file_input"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                // id={`file_input_${idx}`}
                                id="file_input"
                                type="file"
                                name="reading_culture"
                                disabled
                                // name={item.name}
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("reading_culture", file);
                                        setSelectedRedingCulture(file.name); // ✅ nomini saqlab qo‘yamiz
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedRedingCulture && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedRedingCulture}</span>
                        </div>
                    )}
                    {redingCultureFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{redingCultureFile}</span>
                        </div>
                    )}

                </div>

                {/*Five Initiatives*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">

                        2. “5 muhim tashabbus”dagi ishtirok <span className="text-red-600">(0-20 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="five_initiatives"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                id="five_initiatives"
                                type="file"
                                disabled
                                name="five_initiatives"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("five_initiatives", file);
                                        setSelectedFiveInitiatives(file.name);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedFiveInitiatives && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedFiveInitiatives}</span>
                        </div>
                    )}
                    {fiveInitiativesFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{fiveInitiativesFile}</span>
                        </div>
                    )}

                </div>

                {/*Discipline Compliance*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">
                        4. Ichki tartib va odob-axloqga rioya etish <span className="text-red-600">(0-5 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="discipline_compliance"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                id="discipline_compliance"
                                type="file"
                                disabled
                                name="discipline_compliance"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("discipline_compliance", file);
                                        setSelectedDisciplineCompliance(file.name);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedDisciplineCompliance && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedDisciplineCompliance}</span>
                        </div>
                    )}
                    {disciplineComplianceFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{disciplineComplianceFile}</span>
                        </div>
                    )}

                </div>

                {/*Competition Achievements*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">
                        5. Olimpiada va sport yutuqlari <span className="text-red-600">(0-10 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="competition_achievements"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                id="competition_achievements"
                                type="file"
                                disabled
                                name="competition_achievements"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("competition_achievements", file);
                                        setSelectedCompetitionAchievements(file.name);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedCompetitionAchievements && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedCompetitionAchievements}</span>
                        </div>
                    )}
                    {competitionAchievementsFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{competitionAchievementsFile}</span>
                        </div>
                    )}

                </div>

                {/*Attendance Punctuality*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">
                        6. Davomat va darslarga qatnashish <span className="text-red-600">(0-5 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="attendance_punctuality"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                id="attendance_punctuality"
                                type="file"
                                disabled
                                name="attendance_punctuality"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("attendance_punctuality", file);
                                        setSelectedAttendancePunctuality(file.name);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedAttendancePunctuality && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedAttendancePunctuality}</span>
                        </div>
                    )}
                    {attendancePunctualityFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{attendancePunctualityFile}</span>
                        </div>
                    )}
                </div>

                {/*Enlightenment Lessons*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">
                        7. “Ma’rifat darslari”dagi ishtiroki <span className="text-red-600">(0-10 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="enlightenment_lessons"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                id="enlightenment_lessons"
                                type="file"
                                disabled
                                name="enlightenment_lessons"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("enlightenment_lessons", file);
                                        setSelectedEnlightenmentLessons(file.name);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedEnlightenmentLessons && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedEnlightenmentLessons}</span>
                        </div>
                    )}
                    {enlightenmentLessonsFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{enlightenmentLessonsFile}</span>
                        </div>
                    )}
                </div>

                {/*Volunteering*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">
                        8. Volontyorlik va jamoat ishlari <span className="text-red-600">(0-5 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="volunteering"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                id="volunteering"
                                type="file"
                                disabled
                                name="volunteering"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("volunteering", file);
                                        setSelectedVolunteering(file.name);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedVolunteering && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedVolunteering}</span>
                        </div>
                    )}
                    {volunteeringFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{volunteeringFile}</span>
                        </div>
                    )}
                </div>

                {/*Cultural Visits*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">
                        9. Teatr, muzey va tarixiy joylarga tashrif <span className="text-red-600">(0-5 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="cultural_visits"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                id="cultural_visits"
                                type="file"
                                disabled
                                name="cultural_visits"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("cultural_visits", file);
                                        setSelectedCulturalVisits(file.name);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedCulturalVisits && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedCulturalVisits}</span>
                        </div>
                    )}
                    {culturalVisitsFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{culturalVisitsFile}</span>
                        </div>
                    )}
                </div>

                {/*Helth Lifestyle*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">
                        10. Sport va sog‘lom turmush <span className="text-red-600">(0-5 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="healthy_lifestyle"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                id="healthy_lifestyle"
                                type="file"
                                disabled
                                name="healthy_lifestyle"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("healthy_lifestyle", file);
                                        setSelectedHealthyLifestyle(file.name);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedHealthyLifestyle && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedHealthyLifestyle}</span>
                        </div>
                    )}
                    {healthyLifestyleFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{healthyLifestyleFile}</span>
                        </div>
                    )}
                </div>

                {/*Other Spirtual Activities*/}
                <div className="w-full">
                    <p className="mb-2 text-md text-black font-semibold">
                        11. Ma’naviy-ma’rifiy faoliyat <span className="text-red-600">(0-5 ball)</span>
                    </p>

                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="other_spiritual_activity"
                            className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-xl text-blue-500"><ImFolderUpload/></span>
                                <p className="text-sm text-gray-500 font-semibold">Faylni yuklang</p>
                            </div>
                            <input
                                id="other_spiritual_activity"
                                type="file"
                                disabled
                                name="other_spiritual_activity"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    if (file) {
                                        formik.setFieldValue("other_spiritual_activity", file);
                                        setSelectedOtherSpiritualActivity(file.name);
                                    }
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedOtherSpiritualActivity && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Hozir yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{selectedOtherSpiritualActivity}</span>
                        </div>
                    )}
                    {otherSpiritualActivityFile && (
                        <div className="mt-2 text-sm text-gray-700 bg-green-100 border border-green-300 rounded p-2">
                            Avval yuklangan faylingiz:{" "}
                            <span className="font-medium text-blue-600">{otherSpiritualActivityFile}</span>
                        </div>
                    )}
                </div>


                <button
                    type="submit"
                    className="focus:outline-none w-full text-white bg-[#3697A5] hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    O'zgartirish
                </button>
            </form>
        </div>
    );
}

export default UpdateSocialApplication;
