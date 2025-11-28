import axios,{AxiosResponse} from "axios";
import { routes } from "./routes";

export const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true // importante para que acepte cookies del backend bebe ceniza
});

type ApiResponse<T> = Promise<AxiosResponse<T>>;

type response<user> = string | boolean | user 

export const service = {
//USER

    registerUser: async (username:string, mail:string, password:string, token:number):ApiResponse<response<object>> => await api.post(routes.REGISTER_USER, {username, mail, password, token}),
    loginUser: async (mail:string, password:string):ApiResponse<any> => await api.post(routes.LOGIN_USER, {mail, password}),
    findUser: async (mail:string):ApiResponse<any> => await api.post(routes.FIND_USER, {mail}),
    logout_user: async():ApiResponse<any> => await api.post(routes.LOGOUT_USER),
    getAuthMe: async () => await api.get(routes.GET_USER),
//-----------------------------------------------------------------------------------------------------------------

//CONSULTOR
    registerConsultant: async (formData : string) => await api.post(routes.REGISTER_CONSULTANT, formData, {
        withCredentials: true,
    }),
    loginConsultant: async (mail : string, password : string) => await api.post(routes.LOGIN_CONSULTANT, {mail, password}),
    findConsultant: async (mail : string) => await api.post(routes.FIND_CONSULTANT, {mail}),
    logout_consultant: async() => await api.post(routes.LOGOUT_CONSULTANT),
    getConsultantImage: async (id : number) => await api.get(`/consultor/${id}/image`, {responseType: 'blob'}),
    getAuthConsultant: async () => await api.get(routes.GET_CONSULTANT),
//-----------------------------------------------------------------------------------------------------------------

//ROOM     
    createRoom: async () => await api.post(routes.CREATE_ROOM),
    getWaitingRoomUsers: async () => await api.get(routes.GET_WAITINGROOM_USERS),
    getWaitingRoomListUsers: async () => await api.get(routes.GET_WAITINGROOM_LIST_USERS),
//-----------------------------------------------------------------------------------------------------------------

//DASHBOARD
    getDashboard: async (userId: string) => await api.get(`${routes.GET_DASHBOARD}/${userId}/user`),
//-----------------------------------------------------------------------------------------------------------------

//DONATION
    registerDonation: async (unitPrice: number) => await api.post(routes.REGISTER_DONATION, {unitPrice}),
//-----------------------------------------------------------------------------------------------------------------

//DIARY
    uploadDiary: async (formData : any) => await api.post(routes.UPLOAD_DIARY, formData, {headers: {'Content-Type': 'multipart/form-data'}}),
//-----------------------------------------------------------------------------------------------------------------
    
//EMOTION
    changeEmotion: async (userId : number, emotionName : string) => await api.post(routes.CHANGE_EMOTION, {userId,emotionName}),
    uploadEmotionalImage: async (formData : File) => await api.post(routes.UPLOAD_IMAGE, formData, {headers: {'Content-Type': 'multipart/form-data'}}),
    getEmotionalExercises: async (emotion : string) => await api.get(`${routes.GET_EXERCISES}/${emotion}`),
//-----------------------------------------------------------------------------------------------------------------
}
