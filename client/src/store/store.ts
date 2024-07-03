import {makeAutoObservable} from 'mobx'
import { IRespons } from "../models/response/ResponsRepository";
import RepositoryService from '../services/GetRepository';



export default class Store {
    res  = [{} as IRespons]

    resErr = ''

    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setRepository(res: IRespons[]) {
        this.res = res;
    }

    setRepositoryErr(resErr: string) {
        this.resErr = resErr;
    }
    
    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async getRes(email: string, number?: string) {
        this.setLoading(true)
        try {
            this.setRepository([])
            this.setRepositoryErr('')
            const res = await RepositoryService.getUsers(email, number)
            this.setRepository(res.data)
            console.log(res.data)
            console.log(this.res[0].email)
        } catch (e: any) {
            const err = e.response.data.message
            this.setRepositoryErr(err)
            console.log(this.resErr)
            return err
        } finally {
            this.setLoading(false)
        }
    }

}