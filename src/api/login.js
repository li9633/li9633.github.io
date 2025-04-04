import request from "@/api/request";

export async function userLoginServices(username, password) {
    if (!username || !password)
        return Promise.reject({
            code: 400,
            message: "用户名或密码不能为空"
        });
    return await request.post("/user/login", {
        username,
        password
    });
}

export async function userRegisterServices(username, password) {
    if (!username || !password)
        return Promise.reject({
            code: 400,
            message: "用户名或密码不能为空"
        });
    return await request.post("/user/register", {
        username,
        password
    });
}
