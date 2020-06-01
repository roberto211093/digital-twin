import {BASE_PATH, USER, DEVICE_LIST} from "./config";

export const signInApi = (email, password) => {
    const url = `${BASE_PATH}/login`;
    const payload = {
        email,
        password
    }
    const params = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params).then(response => {
        return response.json();
    })
        .then(result => {
            localStorage.setItem(USER, JSON.stringify(result));
            return result
        })
        .catch(err => {
            return err;
        })
}

export const logout = () => {
    localStorage.removeItem(USER);
}

export const checkUser = () => {
    return !!(localStorage.getItem(USER));
}

export const deviceListApi = () => {
    const url = `${BASE_PATH}/device/list`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params).then(response => {
        return response.json();
    })
        .then(result => {
            localStorage.setItem(DEVICE_LIST, JSON.stringify(result));
            return result
        })
        .catch(err => {
            return err;
        })
}
export const devicePerformanceApi = () => {
    const url = `${BASE_PATH}/device/performance`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params).then(response => {
        return response.json();
    })
        .then(result => {
            return result
        })
        .catch(err => {
            return err;
        })
}
