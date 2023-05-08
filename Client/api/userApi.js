import apiManager from "./apiManager";

export const userLogin = async data => {
    try{
        const result = await apiManager ('/user/login',{
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            data: data
        })
        return result;
    }catch(err){
        return err.response.data
    }
}