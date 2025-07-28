const API_URL = import.meta.env.VITE_API_URL
import axiosInstance from './axiosinstance'

export const UserMe = async () => {
    const userData = await axiosInstance.get(`${API_URL}/user/me`)
    return userData.data
}
export const CreateApplicationApi = async (applicationData) => {
    try {
        const response = await axiosInstance.post(
            `${API_URL}/user/application/create`,
            {
                full_name: applicationData.full_name,
                student_id_number: applicationData.student_id_number,
                gpa: applicationData.gpa,
                faculty: applicationData.faculty,
                group: applicationData.group,
                id: applicationData.id,
                image_path: applicationData.image_path,
            },
        );
        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};

export const CreateSocialApi = async (socialData) => {
    try {

        const formData = new FormData();
        formData.append("academic_performance", socialData.academic_performance);
        if (socialData.reading_culture) {
            formData.append('reading_culture', socialData.reading_culture);
        }
        if (socialData.five_initiatives) {
            formData.append('five_initiatives', socialData.five_initiatives);
        }
        if (socialData.discipline_compliance) {
            formData.append('discipline_compliance', socialData.discipline_compliance);
        }
        if (socialData.competition_achievements) {
            formData.append('competition_achievements', socialData.competition_achievements);
        }
        if (socialData.attendance_punctuality) {
            formData.append('attendance_punctuality', socialData.attendance_punctuality);
        }
        if (socialData.enlightenment_lessons) {
            formData.append('enlightenment_lessons', socialData.enlightenment_lessons);
        }
        if (socialData.volunteering) {
            formData.append('volunteering', socialData.volunteering);
        }
        if (socialData.cultural_visits) {
            formData.append('cultural_visits', socialData.cultural_visits);
        }
        if (socialData.healthy_lifestyle) {
            formData.append('healthy_lifestyle', socialData.healthy_lifestyle);
        }
        if (socialData.other_spiritual_activity) {
            formData.append('other_spiritual_activity', socialData.other_spiritual_activity);
        }
        console.log(formData)
        const response = await axiosInstance.post(
            `${API_URL}/user/student_activity_scores/create`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Fayl yuborish uchun zarur sarlavha
                },
            }
        );
        // console.log("Serverdan kelgan javob:", response.data)
        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};
export const GetUserSocialApplicationsApi = async () => {
    const application = await axiosInstance.get(`${API_URL}/user/student_activity_scores/get_all`)
    return application.data
}
export const GetApplications = async ({limit = 25, offset = 0, min_gpa, max_gpa}) => {
    const params = new URLSearchParams();
    params.append("limit", limit);
    params.append("offset", offset);
    if (min_gpa !== undefined) {
        params.append("min_gpa", min_gpa);
    }
    if (max_gpa !== undefined) {
        params.append("max_gpa", max_gpa);
    }

    const application = await axiosInstance.get(
        `${API_URL}/admin/applications/get_all?${params.toString()}`
    );
    return application.data;
};

export const detailSocialApplicationApi = async (socialApplicationId) => {
    const social = await axiosInstance.get(`${API_URL}/user/student_activity_scores/get_by_id/${socialApplicationId}`, {});
    return social.data;
};
export const UpdateSocialApplicationApi = async (socialApplicationId, socialData) => {
    try {
        const formData = new FormData();
        if (socialData.reading_culture) {
            formData.append('reading_culture', socialData.reading_culture);
        }
        if (socialData.five_initiatives) {
            formData.append('five_initiatives', socialData.five_initiatives);
        }
        if (socialData.discipline_compliance) {
            formData.append('discipline_compliance', socialData.discipline_compliance);
        }
        if (socialData.competition_achievements) {
            formData.append('competition_achievements', socialData.competition_achievements);
        }
        if (socialData.attendance_punctuality) {
            formData.append('attendance_punctuality', socialData.attendance_punctuality);
        }
        if (socialData.enlightenment_lessons) {
            formData.append('enlightenment_lessons', socialData.enlightenment_lessons);
        }
        if (socialData.volunteering) {
            formData.append('volunteering', socialData.volunteering);
        }
        if (socialData.cultural_visits) {
            formData.append('cultural_visits', socialData.cultural_visits);
        }
        if (socialData.healthy_lifestyle) {
            formData.append('healthy_lifestyle', socialData.healthy_lifestyle);
        }
        if (socialData.other_spiritual_activity) {
            formData.append('other_spiritual_activity', socialData.other_spiritual_activity);
        }



        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await axiosInstance.put(
            `${API_URL}/user/student_activity_scores/update/${socialApplicationId}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Fayl jo‘natish uchun kerakli sarlavha
                },
            }
        );
        console.log("Serverdan kelgan javob:", response.data);
        return await response.data; // Serverdan kelgan javobni qaytarish
    } catch (error) {
        // Xatolikni tekshirish va foydalanuvchiga tushunarli xabar qaytarish
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail || "Fakultetni yangilashda xatolik yuz berdi");
    }
};


export const GetUserApplications = async () => {
    const application = await axiosInstance.get(`${API_URL}/user/application/get_all`)
    return application.data
}
export const GetTotalApplications = async () => {
    const total = await axiosInstance.get(`${API_URL}/admin/count/count_by_specialty`)
    // console.log(total.data.total_applications)

    return {
        all: total.data.total_applications,
        high: total.data.gpa_fit_applications,
        low: total.data.gpa_not_fit_applications,
    };
}

export const downloadApplicationPdf = async (applicationId) => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/user/application/download/${applicationId}`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_${applicationId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};
export const downloadApplicationResponsePdf = async (applicationId) => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/user/application/download/response/${applicationId}`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_${applicationId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};

export const downloadApplicationAdminPdf = async (applicationId) => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/admin/applications/download/${applicationId}`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_${applicationId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};


