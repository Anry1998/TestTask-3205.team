import $api from "../http";
import {AxiosResponse} from 'axios'
import { IRespons } from "../models/response/ResponsRepository";

export default class RepositoryService {
    static async getUsers(email: string, number?: string): Promise<AxiosResponse<IRespons[]>> {
        return $api.post<IRespons[]>('/getusers', {email, number})
       
    }
}